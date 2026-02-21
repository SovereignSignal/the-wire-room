export interface WireItem {
  id: string
  title: string
  summary: string
  beat: "crypto" | "ai" | "oss"
  category:
    | "grants"
    | "fellowship"
    | "hackathon"
    | "governance"
    | "incentives"
  amount?: string
  deadline?: string
  sourceUrl: string
  sourceName: string
  tier: 1 | 2
  publishedAt: string
  qualityScore?: number
}

export const BEAT_CONFIG = {
  crypto: {
    label: "Crypto",
    color: "hsl(37, 90%, 55%)",
    bgClass: "bg-[hsl(37,90%,55%)]",
    textClass: "text-[hsl(37,90%,55%)]",
    borderClass: "border-[hsl(37,90%,55%)]",
  },
  ai: {
    label: "AI",
    color: "hsl(200, 60%, 50%)",
    bgClass: "bg-[hsl(200,60%,50%)]",
    textClass: "text-[hsl(200,60%,50%)]",
    borderClass: "border-[hsl(200,60%,50%)]",
  },
  oss: {
    label: "OSS",
    color: "hsl(145, 55%, 45%)",
    bgClass: "bg-[hsl(145,55%,45%)]",
    textClass: "text-[hsl(145,55%,45%)]",
    borderClass: "border-[hsl(145,55%,45%)]",
  },
} as const

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  if (diffMs < 0) return "Just now"

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function formatDeadline(deadline: string): string {
  // Try parsing as a date first
  const parsed = new Date(deadline)
  if (!isNaN(parsed.getTime()) && parsed.getFullYear() > 2000) {
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    })
  }
  // Return raw text for non-date values like "Rolling", "TBD", etc.
  return deadline
}

export async function fetchWires(limit: number = 20): Promise<WireItem[]> {
  const response = await fetch(`/api/wires?limit=${limit}`)
  if (!response.ok) return []
  const data = await response.json()
  return Array.isArray(data.wires) ? data.wires : []
}
