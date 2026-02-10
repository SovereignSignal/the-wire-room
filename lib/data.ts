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
  xPostUrl?: string
  telegramUrl?: string
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

export const SAMPLE_WIRES: WireItem[] = [
  {
    id: "1",
    title: "Ethereum Foundation Launches $50M Ecosystem Grant Program",
    summary:
      "The Ethereum Foundation has announced a new $50 million grant program targeting infrastructure, tooling, and community projects. Applications open March 1st with rolling reviews.",
    beat: "crypto",
    category: "grants",
    amount: "$50,000,000",
    deadline: "2026-06-01",
    sourceUrl: "https://ethereum.org",
    sourceName: "Ethereum Foundation",
    tier: 1,
    publishedAt: "2026-02-08T14:30:00Z",
  },
  {
    id: "2",
    title: "OpenAI Announces Research Fellowship for AI Safety",
    summary:
      "A new two-year fellowship program focused on AI alignment and safety research. Fellows receive $150K annually plus compute credits and mentorship from senior researchers.",
    beat: "ai",
    category: "fellowship",
    amount: "$150,000/yr",
    deadline: "2026-04-15",
    sourceUrl: "https://openai.com",
    sourceName: "OpenAI",
    tier: 1,
    publishedAt: "2026-02-08T10:00:00Z",
  },
  {
    id: "3",
    title: "Linux Foundation Maintainer Support Grants Now Open",
    summary:
      "The Linux Foundation expands its maintainer support program with grants up to $100K for critical open source maintainers. Focus on burnout prevention and sustainable development.",
    beat: "oss",
    category: "grants",
    amount: "Up to $100,000",
    deadline: "2026-03-30",
    sourceUrl: "https://linuxfoundation.org",
    sourceName: "Linux Foundation",
    tier: 1,
    publishedAt: "2026-02-07T16:45:00Z",
  },
  {
    id: "4",
    title: "Uniswap Governance Proposal: $25M Developer Incentives",
    summary:
      "UNI token holders vote on a proposal to allocate $25M from the treasury for developer incentive programs across L2s. Snapshot vote closes February 20th.",
    beat: "crypto",
    category: "governance",
    amount: "$25,000,000",
    deadline: "2026-02-20",
    sourceUrl: "https://uniswap.org",
    sourceName: "Uniswap Governance",
    tier: 1,
    publishedAt: "2026-02-07T12:00:00Z",
  },
  {
    id: "5",
    title: "Google DeepMind Launches AI for Science Hackathon",
    summary:
      "A global virtual hackathon with $500K in prizes for projects applying AI to scientific research. Categories include drug discovery, climate modeling, and materials science.",
    beat: "ai",
    category: "hackathon",
    amount: "$500,000 in prizes",
    deadline: "2026-03-15",
    sourceUrl: "https://deepmind.google",
    sourceName: "Google DeepMind",
    tier: 1,
    publishedAt: "2026-02-06T09:30:00Z",
  },
  {
    id: "6",
    title: "GitHub Sponsors Matching Fund Returns for 2026",
    summary:
      "GitHub reinstates its sponsor matching program, doubling all new sponsorships up to $5K per developer for the first year. Available to qualifying open source maintainers worldwide.",
    beat: "oss",
    category: "incentives",
    amount: "Up to $5,000 match",
    sourceUrl: "https://github.com",
    sourceName: "GitHub",
    tier: 2,
    publishedAt: "2026-02-05T18:00:00Z",
  },
  {
    id: "7",
    title: "Arbitrum DAO Allocates $40M for Gaming Ecosystem",
    summary:
      "Arbitrum DAO passes proposal to fund gaming and entertainment projects building on Arbitrum. Grants range from $10K to $500K with milestone-based disbursement.",
    beat: "crypto",
    category: "grants",
    amount: "$40,000,000",
    deadline: "2026-05-01",
    sourceUrl: "https://arbitrum.io",
    sourceName: "Arbitrum DAO",
    tier: 1,
    publishedAt: "2026-02-05T11:15:00Z",
  },
  {
    id: "8",
    title: "Anthropic Constitutional AI Research Grants",
    summary:
      "Anthropic opens applications for research grants studying constitutional AI methods. Up to $200K per project for 12-month research programs at academic institutions.",
    beat: "ai",
    category: "grants",
    amount: "Up to $200,000",
    deadline: "2026-04-01",
    sourceUrl: "https://anthropic.com",
    sourceName: "Anthropic",
    tier: 1,
    publishedAt: "2026-02-04T14:00:00Z",
  },
  {
    id: "9",
    title: "Apache Software Foundation Community Over Code Grants",
    summary:
      "ASF announces travel and project grants for contributors to Apache projects. Priority given to underrepresented regions and first-time contributors.",
    beat: "oss",
    category: "grants",
    amount: "Up to $10,000",
    sourceUrl: "https://apache.org",
    sourceName: "Apache Software Foundation",
    tier: 2,
    publishedAt: "2026-02-03T08:00:00Z",
  },
  {
    id: "10",
    title: "Solana Foundation Hackathon: Build the Future",
    summary:
      "Solana's largest hackathon yet features $1M in prizes across DeFi, NFT infrastructure, and payments tracks. Builders receive mentorship from core team members.",
    beat: "crypto",
    category: "hackathon",
    amount: "$1,000,000 in prizes",
    deadline: "2026-03-30",
    sourceUrl: "https://solana.com",
    sourceName: "Solana Foundation",
    tier: 1,
    publishedAt: "2026-02-02T17:30:00Z",
  },
]

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return "Just now"
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
