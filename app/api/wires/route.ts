import { NextResponse } from "next/server"
import { Pool } from "pg"

// Serverless-friendly pool with DATABASE_URL guard
function createPool() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.warn("DATABASE_URL not set - /api/wires will return empty results")
    return null
  }
  return new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
    ssl: connectionString.includes('railway') ? { rejectUnauthorized: false } : false,
  })
}

const pool = createPool()

pool?.on("error", (err) => {
  console.error("Unexpected database error:", err)
})

// Cache table existence check across warm invocations
let tableExistsCache: boolean | null = null

export async function GET(request: Request) {
  if (!pool) {
    return NextResponse.json({ wires: [], total: 0, count: 0 })
  }

  const { searchParams } = new URL(request.url)
  const beat = searchParams.get("beat") // crypto, ai, oss
  const rawLimit = Number(searchParams.get("limit"))
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(Math.floor(rawLimit), 1), 100) : 20
  const rawOffset = Number(searchParams.get("offset"))
  const offset = Number.isFinite(rawOffset) && rawOffset >= 0 ? Math.floor(rawOffset) : 0

  try {
    // Check if scan_entries table exists (cached after first successful check)
    if (tableExistsCache === null) {
      try {
        const tableCheck = await pool.query(`
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'scan_entries' LIMIT 1
        `)
        tableExistsCache = tableCheck.rows.length > 0
      } catch {
        tableExistsCache = false
      }
    }

    if (!tableExistsCache) {
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
      category: detectCategory(row.name, row.description),
      amount: row.amount || undefined,
      deadline: row.deadline || undefined,
      sourceUrl: row.source_url,
      sourceName: extractSourceName(row.source_url, row.name),
      tier: 1 as const, // All approved entries are editorially vetted
      publishedAt: row.created_at,
      qualityScore: row.quality_score ?? undefined,
    }))

    return NextResponse.json(
      { wires, total, count: wires.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    )
  } catch (error) {
    tableExistsCache = null // Reset cache on error so next request re-checks
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch wires" }, { status: 500 })
  }
}

function detectCategory(name: string, description?: string): "grants" | "fellowship" | "hackathon" | "governance" | "incentives" {
  const lower = `${name} ${description || ""}`.toLowerCase()

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

const X_SYSTEM_ROUTES = new Set(["i", "explore", "search", "settings", "home", "compose", "messages"])

function extractSourceName(sourceUrl: string, name: string): string {
  if (!sourceUrl) return fallbackSourceName(name)

  try {
    const url = new URL(sourceUrl)
    const hostname = url.hostname.replace(/^www\./, "")

    if (hostname === "x.com" || hostname === "twitter.com") {
      const pathSegment = url.pathname.split("/")[1]
      if (pathSegment && !X_SYSTEM_ROUTES.has(pathSegment.toLowerCase())) {
        return `@${pathSegment.slice(0, 30)}`
      }
      return "X.com"
    }

    const domainParts = hostname.split(".")
    const baseDomain = domainParts.length >= 2 ? domainParts[domainParts.length - 2] : domainParts[0]
    return baseDomain.charAt(0).toUpperCase() + baseDomain.slice(1)
  } catch {
    return fallbackSourceName(name)
  }
}

function fallbackSourceName(name: string): string {
  const segment = name.split(":")[0].trim()
  return segment.length > 0 && segment.length <= 40 ? segment : "Wire Room"
}
