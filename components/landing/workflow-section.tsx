import { Search, ShieldCheck, PenTool, Send, ArrowDown } from "lucide-react"

const STEPS = [
  {
    icon: Search,
    role: "Stringer",
    action: "Finds",
    description:
      "Scouts surface grants, fellowships, and hackathons from across the ecosystem. They're the eyes and ears on the ground.",
  },
  {
    icon: ShieldCheck,
    role: "Fact Checker",
    action: "Verifies",
    description:
      "Every tip gets verified against primary sources. We check amounts, deadlines, eligibility, and legitimacy before anything hits the wire.",
  },
  {
    icon: PenTool,
    role: "Staff Writer",
    action: "Shapes",
    description:
      "Raw intel becomes a clear, actionable wire brief. Our house style keeps every post scannable and useful.",
  },
  {
    icon: Send,
    role: "Press Operator",
    action: "Publishes",
    description:
      "The final wire goes out across X, Telegram, and the feed. Timed for maximum reach and relevance.",
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
            Every wire passes through our editorial pipeline. No rumor, no
            noise, no spam -- just verified, actionable intelligence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.role} className="relative">
                <div className="flex flex-col items-start">
                  {/* Step number */}
                  <span className="mb-3 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {step.role}
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
