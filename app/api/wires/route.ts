import { NextResponse } from "next/server"
import { Pool } from "pg"

// Serverless-friendly pool configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // Limit connections in serverless
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
  ssl: process.env.DATABASE_URL?.includes('railway') ? { rejectUnauthorized: false } : false,
})

// Graceful connection handling
pool.on("error", (err) => {
  console.error("Unexpected database error:", err)
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const beat = searchParams.get("beat") // crypto, ai, oss
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20") || 20, 1), 100)
  const offset = Math.max(parseInt(searchParams.get("offset") || "0") || 0, 0)

  try {
    // Check if scan_entries table exists
    let hasScanEntries = false
    try {
      const tableCheck = await pool.query(`
        SELECT column_name FROM information_schema.columns
        WHERE table_name = 'scan_entries' LIMIT 1
      `)
      hasScanEntries = tableCheck.rows.length > 0
    } catch {
      hasScanEntries = false
    }

    if (!hasScanEntries) {
      return NextResponse.json({ wires: [], total: 0, count: 0 })
    }

    const conditions: string[] = [`status = 'approved'`]
    const params: (string | number)[] = []
    let paramIndex = 1

    if (beat && ["crypto", "ai", "oss"].includes(beat)) {
      conditions.push(`wire = $${paramIndex}`)
      params.push(beat)
      paramIndex++
    }

    const whereClause = `WHERE ${conditions.join(" AND ")}`

    // Run data + count queries in parallel
    const dataQuery = `
      SELECT
        id, name, description, source_url, amount, deadline,
        wire, quality_score, scan_source, created_at
      FROM scan_entries
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `
    const countQuery = `
      SELECT COUNT(*)::int AS total
      FROM scan_entries
      ${whereClause}
    `

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, [...params, limit, offset]),
      pool.query(countQuery, params),
    ])

    const total = countResult.rows[0].total

    const wires = dataResult.rows.map((row) => ({
      id: row.id.toString(),
      title: row.name,
      summary: row.description || "",
      beat: (["crypto", "ai", "oss"].includes(row.wire) ? row.wire : "crypto") as "crypto" | "ai" | "oss",
      category: detectCategory(row.name + " " + (row.description || "")),
      amount: row.amount || undefined,
      deadline: row.deadline || undefined,
      sourceUrl: row.source_url,
      sourceName: extractSourceName(row.source_url, row.name),
      tier: 1 as const, // All approved entries are editorially vetted
      publishedAt: row.created_at,
      qualityScore: row.quality_score ?? undefined,
    }))

    return NextResponse.json({ wires, total, count: wires.length })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch wires" }, { status: 500 })
  }
}

function detectCategory(content: string): "grants" | "fellowship" | "hackathon" | "governance" | "incentives" {
  const lower = content.toLowerCase()

  // Hackathon detection (check before grants since hackathons may also mention "prizes")
  if (
    lower.includes("hackathon") ||
    lower.includes("hack week") ||
    lower.includes("buildathon") ||
    lower.includes("code jam") ||
    (lower.includes("competition") && lower.includes("prize"))
  ) return "hackathon"

  // Fellowship detection
  if (
    lower.includes("fellowship") ||
    lower.includes("residency") ||
    lower.includes("scholar")
  ) return "fellowship"

  // Governance detection
  if (
    lower.includes("governance") ||
    lower.includes("treasury") ||
    (lower.includes("proposal") && (lower.includes("dao") || lower.includes("vote"))) ||
    lower.includes("snapshot") ||
    lower.includes("tally")
  ) return "governance"

  // Incentives detection
  if (
    lower.includes("incentive") ||
    lower.includes("rewards program") ||
    lower.includes("bounty") ||
    lower.includes("bounties") ||
    lower.includes("airdrop") ||
    lower.includes("testnet reward") ||
    lower.includes("incentivized testnet") ||
    lower.includes("builders program") ||
    lower.includes("sponsorship")
  ) return "incentives"

  // Default: grants (covers grant, funding, RFP, etc.)
  return "grants"
}

function extractSourceName(sourceUrl: string, name: string): string {
  if (!sourceUrl) return name.split(":")[0].trim() || "Wire Room"

  try {
    const url = new URL(sourceUrl)
    const hostname = url.hostname.replace(/^www\./, "")

    // X.com / Twitter — extract @handle from URL path
    if (hostname === "x.com" || hostname === "twitter.com") {
      const handle = url.pathname.split("/")[1]
      if (handle) return `@${handle}`
    }

    // Clean domain → display name (e.g. "gitcoin.co" → "Gitcoin")
    const domainParts = hostname.split(".")
    const baseDomain = domainParts.length >= 2 ? domainParts[domainParts.length - 2] : domainParts[0]
    return baseDomain.charAt(0).toUpperCase() + baseDomain.slice(1)
  } catch {
    // Fallback: first word of name before ":"
    return name.split(":")[0].trim() || "Wire Room"
  }
}
