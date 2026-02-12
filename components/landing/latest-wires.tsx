"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  DollarSign,
  Calendar,
  Loader2,
} from "lucide-react"
import {
  SAMPLE_WIRES,
  BEAT_CONFIG,
  formatRelativeTime,
  type WireItem,
} from "@/lib/data"

type BeatFilter = "all" | "crypto" | "ai" | "oss"

function WireCard({ item }: { item: WireItem }) {
  const beat = BEAT_CONFIG[item.beat]
  return (
    <article className="group border-b border-border py-5 last:border-b-0">
      <div className="flex flex-col gap-3">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-semibold"
            style={{
              backgroundColor: `${beat.color}18`,
              color: beat.color,
            }}
          >
            {beat.label}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(item.publishedAt)}
          </span>
          {item.amount && (
            <span className="flex items-center gap-1 font-mono text-xs text-primary">
              <DollarSign className="h-3 w-3" />
              {item.amount}
            </span>
          )}
          {item.deadline && (
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(item.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold leading-snug text-foreground">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.summary}
        </p>

        {/* Source link */}
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
        >
          {item.sourceName}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  )
}

export function LatestWires() {
  const [filter, setFilter] = useState<BeatFilter>("all")
  const [wires, setWires] = useState<WireItem[]>(SAMPLE_WIRES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWires() {
      try {
        const response = await fetch("/api/wires?limit=20")
        if (response.ok) {
          const data = await response.json()
          if (data.wires && data.wires.length > 0) {
            setWires(data.wires)
          }
        }
      } catch (error) {
        console.error("Failed to fetch wires:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWires()
  }, [])

  const filteredWires =
    filter === "all"
      ? wires.slice(0, 6)
      : wires.filter((w) => w.beat === filter).slice(0, 6)

  const filters: { value: BeatFilter; label: string }[] = [
    { value: "all", label: "All Wires" },
    { value: "crypto", label: "Crypto" },
    { value: "ai", label: "AI" },
    { value: "oss", label: "OSS" },
  ]

  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">Latest from the Wire</span>
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              The freshest opportunities across all three beats.
            </p>
          </div>
          <Link
            href="/feed"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View full feed
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg bg-secondary p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`shrink-0 rounded-md px-4 py-2 font-mono text-xs font-medium transition-colors ${
                filter === f.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Wire list */}
        <div className="rounded-lg border border-border bg-card">
          <div className="px-5">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredWires.length > 0 ? (
              filteredWires.map((item) => (
                <WireCard key={item.id} item={item} />
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  No wires on this beat yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
