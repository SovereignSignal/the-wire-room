import { Bitcoin, Brain, Code2 } from "lucide-react"

const BEATS = [
  {
    icon: Bitcoin,
    title: "Crypto Grant Wire",
    description:
      "DAO treasuries, governance proposals, ecosystem grants, and protocol incentive programs. We track every major crypto funding opportunity.",
    color: "hsl(37, 90%, 55%)",
    tag: "@CryptoGrantWire",
  },
  {
    icon: Brain,
    title: "AI Grant Wire",
    description:
      "Research grants, fellowships, hackathons, and compute credit programs. From foundation models to AI safety, we cover the full stack.",
    color: "hsl(200, 60%, 50%)",
    tag: "@AIGrantWire",
  },
  {
    icon: Code2,
    title: "OSS Grant Wire",
    description:
      "Foundation grants, maintainer support funds, sponsorship matching, and contributor programs. Sustaining the open source ecosystem.",
    color: "hsl(145, 55%, 45%)",
    tag: "@OSSGrantWire",
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
            Each beat has its own wire, its own stringers, and its own audience.
            Together they form a complete picture of non-dilutive funding.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {BEATS.map((beat) => {
            const Icon = beat.icon
            return (
              <div
                key={beat.title}
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
                  <span
                    className="font-mono text-xs"
                    style={{ color: beat.color }}
                  >
                    {beat.tag}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {beat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {beat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
