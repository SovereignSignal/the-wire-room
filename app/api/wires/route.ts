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
  const limit = parseInt(searchParams.get("limit") || "20")
  const offset = parseInt(searchParams.get("offset") || "0")

  try {
    // First, check if summaries table exists and get its structure
    let hasSummaries = false
    try {
      const tableCheck = await pool.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = 'summaries' LIMIT 1
      `)
      hasSummaries = tableCheck.rows.length > 0
    } catch {
      hasSummaries = false
    }

    let query: string
    const params: (string | number)[] = []
    let paramIndex = 1

    if (hasSummaries) {
      query = `
        SELECT 
          m.id,
          m.telegram_id,
          m.wire,
          m.raw_content,
          m.extracted_urls,
          m.created_at,
          m.timestamp,
          s.title as summary_title,
          s.summary as summary_text
        FROM messages m
        LEFT JOIN summaries s ON m.id = s.message_id
        WHERE m.wire IS NOT NULL
      `
    } else {
      query = `
        SELECT 
          m.id,
          m.telegram_id,
          m.wire,
          m.raw_content,
          m.extracted_urls,
          m.created_at,
          m.timestamp
        FROM messages m
        WHERE m.wire IS NOT NULL
      `
    }

    if (beat && ["crypto", "ai", "oss"].includes(beat)) {
      query += ` AND m.wire = $${paramIndex}`
      params.push(beat)
      paramIndex++
    }

    query += ` ORDER BY m.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const result = await pool.query(query, params)

    // Transform to WireItem format - prefer summary table data when available
    const wires = result.rows.map((row) => ({
      id: row.id.toString(),
      title: row.summary_title || extractTitle(row.raw_content || ""),
      summary: row.summary_text || extractSummary(row.raw_content || ""),
      beat: row.wire as "crypto" | "ai" | "oss",
      category: detectCategory(
        (row.summary_title || "") + " " + (row.summary_text || "") + " " + (row.raw_content || "")
      ),
      amount: extractAmount(row.raw_content || ""),
      deadline: extractDeadline(row.raw_content || ""),
      sourceUrl: row.extracted_urls?.[0] || "",
      sourceName: extractSourceName(row.raw_content || ""),
      tier: row.summary_title ? 1 : 2, // Tier 1 if has AI summary, Tier 2 otherwise
      publishedAt: row.created_at,
      telegramUrl: `https://t.me/${row.wire === "crypto" ? "cryptograntwire" : row.wire === "ai" ? "aigrantwire" : "ossgrantwire"}/${row.telegram_id}`,
    }))

    return NextResponse.json({ wires, total: result.rowCount, hasSummaries })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch wires" }, { status: 500 })
  }
}

function extractTitle(content: string): string {
  // First line or first sentence as title
  const lines = content.split("\n").filter((l) => l.trim())
  if (lines.length > 0) {
    // Remove emojis and clean up for title
    return lines[0].replace(/^[^\w\s]+\s*/, "").slice(0, 100)
  }
  return "Untitled"
}

function extractSummary(content: string): string {
  // Everything after the first line, cleaned up
  const lines = content.split("\n").filter((l) => l.trim())
  if (lines.length > 1) {
    return lines.slice(1).join(" ").replace(/https?:\/\/\S+/g, "").trim().slice(0, 300)
  }
  return content.slice(0, 300)
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

function extractSourceName(content: string): string {
  // Try to extract organization name from content
  const patterns = [
    /from\s+@?(\w+)/i,
    /by\s+@?(\w+)/i,
    /(\w+)\s+(?:Foundation|Labs|Protocol|DAO)/i,
  ]
  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match) return match[1]
  }
  return "Wire Room"
}

function extractAmount(content: string): string | undefined {
  // Look for dollar amounts
  const patterns = [
    /\$[\d,]+(?:\.\d+)?(?:\s*[KMB])?(?:\s*(?:million|billion))?/i,
    /(\d+(?:,\d+)*)\s*(?:USD|USDC|DAI)/i,
    /up\s+to\s+\$[\d,]+/i,
  ]
  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match) return match[0]
  }
  return undefined
}

function extractDeadline(content: string): string | undefined {
  // Look for deadline dates
  const patterns = [
    /deadline[:\s]+([A-Za-z]+\s+\d{1,2}(?:,?\s+\d{4})?)/i,
    /(?:by|before|due)[:\s]+([A-Za-z]+\s+\d{1,2}(?:,?\s+\d{4})?)/i,
    /(\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+\d{4})/i,
    /([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i,
  ]
  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match) {
      // Try to parse the date
      const parsed = new Date(match[1])
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split("T")[0]
      }
      return match[1]
    }
  }
  return undefined
}
