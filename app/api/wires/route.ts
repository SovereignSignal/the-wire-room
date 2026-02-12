import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const beat = searchParams.get("beat") // crypto, ai, oss
  const limit = parseInt(searchParams.get("limit") || "20")
  const offset = parseInt(searchParams.get("offset") || "0")

  try {
    let query = `
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
    const params: (string | number)[] = []
    let paramIndex = 1

    if (beat && ["crypto", "ai", "oss"].includes(beat)) {
      query += ` AND m.wire = $${paramIndex}`
      params.push(beat)
      paramIndex++
    }

    query += ` ORDER BY m.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(limit, offset)

    const result = await pool.query(query, params)

    // Transform to WireItem format
    const wires = result.rows.map((row) => ({
      id: row.id.toString(),
      title: extractTitle(row.raw_content),
      summary: extractSummary(row.raw_content),
      beat: row.wire as "crypto" | "ai" | "oss",
      category: detectCategory(row.raw_content),
      sourceUrl: row.extracted_urls?.[0] || "",
      sourceName: extractSourceName(row.raw_content),
      tier: 1, // All TeleSum items are verified
      publishedAt: row.created_at,
      telegramUrl: `https://t.me/${row.wire === "crypto" ? "cryptograntwire" : row.wire === "ai" ? "aigrantwire" : "ossgrantwire"}/${row.telegram_id}`,
    }))

    return NextResponse.json({ wires, total: result.rowCount })
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
  if (lower.includes("fellowship")) return "fellowship"
  if (lower.includes("hackathon")) return "hackathon"
  if (lower.includes("governance") || lower.includes("proposal") || lower.includes("vote")) return "governance"
  if (lower.includes("incentive") || lower.includes("rewards")) return "incentives"
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
