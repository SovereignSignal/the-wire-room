import { Mail, ArrowUpRight } from "lucide-react"

const SUBSTACK_URL = "https://sovereignsignal.substack.com"
const SUBSCRIBE_URL = `${SUBSTACK_URL}/subscribe`

export function NewsletterSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 md:p-12">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-20 right-0 h-60 w-60 bg-[radial-gradient(ellipse,hsl(37,90%,55%,0.08),transparent_70%)]" />

          <div className="relative mx-auto max-w-lg text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary">
              <Mail className="h-5 w-5 text-primary" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              <span className="text-balance">Get the Dispatch</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Weekly wire dispatches, analysis of where funding flows,
              and ideas on technology and innovation. No spam. Just signal.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-8 font-mono text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe on Substack
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Read Sovereign Signal
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <p className="mt-6 font-mono text-xs text-muted-foreground">
              Powered by Substack
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
