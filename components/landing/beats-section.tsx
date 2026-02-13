"use client"

import Link from "next/link"
import { Bitcoin, Brain, Code2 } from "lucide-react"

const BEATS = [
  {
    icon: Bitcoin,
    title: "Crypto Grant Wire",
    description:
      "DAO treasuries, governance proposals, ecosystem grants, and protocol incentive programs. From on-chain treasury flows to foundation RFPs.",
    color: "hsl(37, 90%, 55%)",
    tag: "@CryptoGrantWire",
    xUrl: "https://x.com/CryptoGrantWire",
    feedFilter: "crypto",
  },
  {
    icon: Brain,
    title: "AI Grant Wire",
    description:
      "Research grants, fellowships, hackathons, and compute credit programs. From safety research funding to GPU access and open-weight model bounties.",
    color: "hsl(200, 60%, 50%)",
    tag: "@AIGrantWire",
    xUrl: "https://x.com/AIGrantWire",
    feedFilter: "ai",
  },
  {
    icon: Code2,
    title: "OSS Grant Wire",
    description:
      "Foundation grants, maintainer support funds, sponsorship matching, and contributor programs. Focused on long-term maintainer sustainability.",
    color: "hsl(145, 55%, 45%)",
    tag: "@OSSGrantWire",
    xUrl: "https://x.com/OSSGrantWire",
    feedFilter: "oss",
  },
]

export function BeatsSection() {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">The Three Beats</span>
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Each beat has dedicated coverage, dedicated channels, and a dedicated audience.
            Together they form a complete picture of non-dilutive funding.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {BEATS.map((beat) => {
            const Icon = beat.icon
            return (
              <Link
                key={beat.title}
                href={`/feed?beat=${beat.feedFilter}`}
                className="group relative rounded-lg border border-border bg-card p-6 transition-colors hover:border-border/80 hover:bg-card/80"
              >
                {/* Top accent line */}
                <div
                  className="mb-5 h-0.5 w-10 rounded-full"
                  style={{ backgroundColor: beat.color }}
                />
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: `${beat.color}15`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: beat.color }}
                    />
                  </div>
                  <a
                    href={beat.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs transition-colors hover:underline"
                    style={{ color: beat.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {beat.tag}
                  </a>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {beat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {beat.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
