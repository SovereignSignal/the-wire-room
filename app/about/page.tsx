import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Radar,
  Filter,
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mail,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Operating Manual | The Wire Room",
  description:
    "How The Wire Room works: our methodology, source tiers, verification process, and house style.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border py-12 md:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-primary">
              Operating Manual
            </span>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
              <span className="text-balance">
                How the Wire Room Works
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              The Wire Room is a grants intelligence wire service that tracks
              non-dilutive funding across three beats: Crypto, AI, and Open Source.
              Operated by Sovereign Signal, powered by human curation and AI-assisted
              scanning. This manual covers what we do, how we do it, and why it matters.
            </p>
          </div>
        </section>

        {/* What We Cover */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              What We Cover
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We cover non-dilutive funding opportunities — money you receive
              without giving up equity or tokens. This includes grants,
              fellowships, hackathon prizes, governance-funded programs, and
              maintainer support funds.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(145,55%,45%)]" />
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    We Cover
                  </h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li>Ecosystem grants from foundations and DAOs</li>
                  <li>Research fellowships and scholarships</li>
                  <li>Hackathons with meaningful prize pools</li>
                  <li>Governance proposals allocating treasury funds</li>
                  <li>Maintainer support and sponsorship programs</li>
                  <li>Compute credit and infrastructure grants</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    We Don&apos;t Cover
                  </h3>
                </div>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li>Venture capital or equity funding rounds</li>
                  <li>Token sales, ICOs, or IDOs</li>
                  <li>Paid product launches or sponsorships</li>
                  <li>Rumor or unverified speculation</li>
                  <li>Affiliate or referral programs</li>
                  <li>Job postings (unless grant-funded)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Process */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              The Process
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every wire passes through a four-stage pipeline. No rumor, no noise,
              no spam — just verified, actionable intelligence.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {[
                {
                  icon: Radar,
                  step: "Scan",
                  description:
                    "AI-assisted monitoring of grant announcements across all three ecosystems. We use action language search methodology to surface opportunities from governance forums, foundation blogs, social media, and official channels.",
                },
                {
                  icon: Filter,
                  step: "Filter",
                  description:
                    "Every result passes through a 5-point verification filter: named program, on beat, actionable details, primary source quality, and deadline clarity. This eliminates noise and ensures only legitimate opportunities make it through.",
                },
                {
                  icon: FileText,
                  step: "Write",
                  description:
                    "Verified opportunities are formatted into clear, scannable wire briefs following house style guidelines. Each wire includes the key details: amount, deadline, eligibility, and a direct link to apply.",
                },
                {
                  icon: Send,
                  step: "Publish",
                  description:
                    "Final wires are distributed across Telegram channels, X accounts, and the live feed. Timing is optimized for maximum reach across different time zones and audiences.",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.step}
                    className="flex gap-4 rounded-lg border border-border bg-card p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {item.step}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Source Tiers */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Source Tier System
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We classify every source by reliability. This helps readers
              calibrate their expectations and plan accordingly.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                    Tier 1
                  </span>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    Primary Sources
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Official announcements from foundations, DAOs, and
                  organizations. Blog posts, governance proposals, and press
                  releases directly from the source. Highest confidence level.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded border border-border px-2 py-0.5 font-mono text-xs font-bold text-muted-foreground">
                    Tier 2
                  </span>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    Verified Secondary
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Information from reliable secondary sources — reputable
                  journalists, well-known community members, or corroborated
                  social media posts. Verified against at least one additional
                  source.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* House Style */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              House Style
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every wire follows a consistent format to maximize scannability
              and usefulness.
            </p>

            <div className="mt-8 rounded-lg border border-border bg-card p-5">
              <div className="flex flex-col gap-4">
                {[
                  {
                    rule: "Lead with the number",
                    example:
                      "Always put the funding amount in the first sentence when available.",
                  },
                  {
                    rule: "Include the deadline",
                    example:
                      "Every wire with an application deadline includes the date prominently.",
                  },
                  {
                    rule: "Link to primary source",
                    example:
                      "Every wire includes a direct link to the official announcement or application page.",
                  },
                  {
                    rule: "Keep it actionable",
                    example:
                      "Tell readers what the opportunity is, who it's for, and how to apply — in three sentences or fewer.",
                  },
                  {
                    rule: "No editorializing",
                    example:
                      "Report the facts. Save opinions for the Dispatch analysis section.",
                  },
                ].map((item) => (
                  <div
                    key={item.rule}
                    className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-mono text-sm font-semibold text-foreground">
                      {item.rule}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Contact
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Got a tip? Found an error? Want to contribute? Reach out through
              any of these channels.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <h4 className="font-mono text-sm font-semibold text-foreground">
                    Submit a Tip
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    DM @CryptoGrantWire, @AIGrantWire, or @OSSGrantWire on X.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <h4 className="font-mono text-sm font-semibold text-foreground">
                    General Inquiries
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    hello@thewireroom.xyz
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
