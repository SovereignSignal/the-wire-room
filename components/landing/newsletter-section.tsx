"use client"

import React from "react"

import { useState } from "react"
import { Mail, CheckCircle2 } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

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
              <span className="text-balance">Get the Friday Dispatch</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              A weekly digest of the best grants, fellowships, and hackathons
              across all three beats. No spam. Just signal.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-mono text-sm font-medium">
                  You&apos;re on the wire. First dispatch incoming.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-12 flex-1 rounded-md border border-border bg-secondary px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-md bg-primary px-6 font-mono text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="mt-4 font-mono text-xs text-muted-foreground">
              Delivered every Friday at 09:00 UTC
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
