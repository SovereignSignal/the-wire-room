"use client"

import Link from "next/link"

const BEATS = [
  {
    title: "Crypto Grant Wire",
    description:
      "DAO treasuries, governance proposals, ecosystem grants, and protocol incentive programs. From on-chain treasury flows to foundation RFPs.",
    color: "hsl(37, 90%, 55%)",
    feedFilter: "crypto",
    xUrl: "https://x.com/CryptoGrantWire",
    telegramUrl: "https://t.me/cryptograntwire",
  },
  {
    title: "AI Grant Wire",
    description:
      "Research grants, fellowships, hackathons, and compute credit programs. From safety research funding to GPU access and open-weight model bounties.",
    color: "hsl(200, 60%, 50%)",
    feedFilter: "ai",
    xUrl: "https://x.com/AIGrantWire",
    telegramUrl: "https://t.me/aigrantwire",
  },
  {
    title: "OSS Grant Wire",
    description:
      "Foundation grants, maintainer support funds, sponsorship matching, and contributor programs. Focused on long-term maintainer sustainability.",
    color: "hsl(145, 55%, 45%)",
    feedFilter: "oss",
    xUrl: "https://x.com/OSSGrantWire",
    telegramUrl: "https://t.me/ossgrantwire",
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
          {BEATS.map((beat) => (
            <div
              key={beat.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div
                className="mb-4 h-0.5 w-10 rounded-full"
                style={{ backgroundColor: beat.color }}
              />
              <h3 className="font-serif text-xl font-bold text-foreground">
                {beat.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {beat.description}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/feed?beat=${beat.feedFilter}`}
                  className="font-mono text-xs text-primary transition-colors hover:underline"
                >
                  Feed →
                </Link>
                <a
                  href={beat.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  X
                </a>
                <a
                  href={beat.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Telegram
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
