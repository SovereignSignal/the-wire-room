"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { BEAT_CONFIG } from "@/lib/data"

function useCurrentTimestamp() {
  const [timestamp, setTimestamp] = useState("")
  useEffect(() => {
    const fmt = () => {
      const now = new Date()
      const month = now.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase()
      const day = String(now.getUTCDate()).padStart(2, "0")
      const year = now.getUTCFullYear()
      const hours = String(now.getUTCHours()).padStart(2, "0")
      const mins = String(now.getUTCMinutes()).padStart(2, "0")
      return `${month} ${day} ${year} -- ${hours}:${mins} UTC`
    }
    setTimestamp(fmt())
    const id = setInterval(() => setTimestamp(fmt()), 60_000)
    return () => clearInterval(id)
  }, [])
  return timestamp
}

export function Hero() {
  const timestamp = useCurrentTimestamp()
  const [latestWire, setLatestWire] = useState<{
    title: string
    beat: "crypto" | "ai" | "oss"
  } | null>(null)

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch("/api/wires?limit=1")
        if (res.ok) {
          const data = await res.json()
          if (data.wires && data.wires.length > 0) {
            setLatestWire({
              title: data.wires[0].title,
              beat: data.wires[0].beat,
            })
          }
        }
      } catch {
        // Silently fail — hero still renders fine without it
      }
    }
    fetchLatest()
  }, [])

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
          Three beats. Real-time grants intelligence.
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
            How It Works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Latest wire ticker */}
        <div className="mt-16 border-t border-border pt-6">
          <Link
            href="/feed"
            className="group flex items-center gap-4 overflow-hidden"
          >
            <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Latest Wire
            </span>
            {latestWire ? (
              <>
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase"
                  style={{
                    backgroundColor: `${BEAT_CONFIG[latestWire.beat].color}18`,
                    color: BEAT_CONFIG[latestWire.beat].color,
                  }}
                >
                  {BEAT_CONFIG[latestWire.beat].label}
                </span>
                <span className="truncate text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {latestWire.title}
                </span>
              </>
            ) : (
              <div className="h-px flex-1 bg-border" />
            )}
            <span className="shrink-0 font-mono text-xs text-primary">
              {timestamp || "LIVE"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
