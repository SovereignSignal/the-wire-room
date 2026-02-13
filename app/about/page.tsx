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
    "How The Wire Room works: the methodology, source tiers, verification process, and house style.",
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

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <h4 className="font-mono text-sm font-semibold text-foreground">
                    Submit a Tip on X
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    DM{" "}
                    <a href="https://x.com/CryptoGrantWire" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@CryptoGrantWire</a>,{" "}
                    <a href="https://x.com/AIGrantWire" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@AIGrantWire</a>, or{" "}
                    <a href="https://x.com/OSSGrantWire" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@OSSGrantWire</a>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <Send className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <h4 className="font-mono text-sm font-semibold text-foreground">
                    Telegram Channels
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a href="https://t.me/cryptograntwire" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Crypto</a>,{" "}
                    <a href="https://t.me/aigrantwire" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AI</a>,{" "}
                    <a href="https://t.me/ossgrantwire" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OSS</a>
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
