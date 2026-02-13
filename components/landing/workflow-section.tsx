import { Radar, Filter, FileText, Send, ArrowDown } from "lucide-react"

const STEPS = [
  {
    icon: Radar,
    step: "Scan",
    action: "Monitor",
    description:
      "AI-assisted monitoring of grant announcements across all three ecosystems using action language search methodology.",
  },
  {
    icon: Filter,
    step: "Filter",
    action: "Verify",
    description:
      "Every result passes through a 5-point verification filter: named program, on beat, actionable details, primary source, and deadline clarity.",
  },
  {
    icon: FileText,
    step: "Write",
    action: "Format",
    description:
      "Verified opportunities formatted into clear, scannable wire briefs following house style guidelines.",
  },
  {
    icon: Send,
    step: "Publish",
    action: "Distribute",
    description:
      "Wires distributed across Telegram channels, X accounts, and the live feed. Timed for maximum reach.",
  },
]

export function WorkflowSection() {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">How the Wire Works</span>
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            Every wire passes through a four-stage pipeline. No rumor, no
            noise, no spam — just verified, actionable intelligence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="relative">
                <div className="flex flex-col items-start">
                  {/* Step number */}
                  <span className="mb-3 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {step.step}
                  </h3>
                  <span className="mt-0.5 font-mono text-xs uppercase tracking-wider text-primary">
                    {step.action}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (hidden on mobile, visible between cards) */}
                {i < STEPS.length - 1 && (
                  <>
                    <div className="mt-4 flex items-center justify-center md:hidden">
                      <ArrowDown className="h-4 w-4 text-border" />
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
