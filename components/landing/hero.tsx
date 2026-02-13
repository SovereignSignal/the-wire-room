import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Ambient glow effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(37,90%,55%,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 md:pb-24 md:pt-32">
        {/* Wire status indicator */}
        <div className="mb-8 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Wire Active
          </span>
        </div>

        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <span className="text-balance">The Wire Room</span>
        </h1>

        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted-foreground md:text-base">
          Three beats. One team. Non-stop coverage.
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Tracking grants, fellowships, and hackathons across Crypto, AI, and
          Open Source. Every opportunity verified, every deadline tracked.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/feed"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <span role="img" aria-label="satellite dish">📡</span>
            Read the Wires
          </Link>
          <Link
            href="/about"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-secondary px-6 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            Join the Room
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Decorative wire element */}
        <div className="mt-16 border-t border-border pt-6">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Latest Wire
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="shrink-0 font-mono text-xs text-primary">
              LIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
