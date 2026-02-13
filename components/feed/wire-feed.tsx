"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  ArrowUpRight,
  Clock,
  DollarSign,
  Calendar,
  Send,
  Filter,
  Loader2,
} from "lucide-react"
import {
  SAMPLE_WIRES,
  BEAT_CONFIG,
  formatRelativeTime,
  type WireItem,
} from "@/lib/data"

type BeatFilter = "all" | "crypto" | "ai" | "oss"
type CategoryFilter = "all" | "grants" | "fellowship" | "hackathon" | "governance" | "incentives"

function FeedItem({ item }: { item: WireItem }) {
  const beat = BEAT_CONFIG[item.beat]

  return (
    <article className="border-b border-border p-5 transition-colors last:border-b-0 hover:bg-secondary/30">
      <div className="flex flex-col gap-4">
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
          <span className="rounded border border-border px-2 py-0.5 font-mono text-xs capitalize text-muted-foreground">
            {item.category}
          </span>
          {item.tier === 1 && (
            <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
              Verified
            </span>
          )}
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(item.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold leading-snug text-foreground md:text-xl">
          {item.title}
        </h3>

        {/* Summary - more prominent */}
        <div className="rounded-md border border-border/50 bg-secondary/30 p-4">
          <p className="text-sm leading-relaxed text-foreground/90">
            {item.summary}
          </p>
        </div>

        {/* Details row */}
        <div className="flex flex-wrap items-center gap-4">
          {item.amount && (
            <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-primary">
              <DollarSign className="h-3.5 w-3.5" />
              {item.amount}
            </span>
          )}
          {item.deadline && (
            <span className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Deadline:{" "}
              {new Date(item.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Links row - separate and more visible */}
        <div className="flex flex-wrap items-center gap-3 border-t border-border/50 pt-3">
          {item.sourceUrl && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              {item.sourceName || "View Source"}
            </a>
          )}
          {item.telegramUrl && (
            <a
              href={item.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function WireFeed() {
  const [beatFilter, setBeatFilter] = useState<BeatFilter>("all")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [wires, setWires] = useState<WireItem[]>(SAMPLE_WIRES) // Start with sample, replace with API
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWires() {
      try {
        const response = await fetch("/api/wires?limit=50")
        if (response.ok) {
          const data = await response.json()
          if (data.wires && data.wires.length > 0) {
            setWires(data.wires)
          }
        }
      } catch (error) {
        console.error("Failed to fetch wires:", error)
        // Keep sample data on error
      } finally {
        setLoading(false)
      }
    }
    fetchWires()
  }, [])

  const filteredWires = useMemo(() => {
    let filtered = wires

    if (beatFilter !== "all") {
      filtered = filtered.filter((w) => w.beat === beatFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((w) => w.category === categoryFilter)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.summary.toLowerCase().includes(q) ||
          w.sourceName.toLowerCase().includes(q)
      )
    }

    return filtered
  }, [wires, beatFilter, categoryFilter, searchQuery])

  const beatFilters: { value: BeatFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "crypto", label: "Crypto" },
    { value: "ai", label: "AI" },
    { value: "oss", label: "OSS" },
  ]

  const categoryFilters: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: "grants", label: "Grants" },
    { value: "fellowship", label: "Fellowships" },
    { value: "hackathon", label: "Hackathons" },
    { value: "governance", label: "Governance" },
    { value: "incentives", label: "Incentives" },
  ]

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Live Feed
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Wire Feed
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            All verified grants, fellowships, and hackathons in one place.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4">
          {/* Search + Filter Toggle */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wires..."
                className="h-11 w-full rounded-md border border-border bg-secondary pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors md:hidden ${
                showFilters
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary text-muted-foreground"
              }`}
              aria-label="Toggle filters"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>

          {/* Beat Filters */}
          <div
            className={`flex flex-col gap-3 ${showFilters ? "block" : "hidden"} md:flex md:flex-row`}
          >
            <div className="flex gap-1 overflow-x-auto rounded-lg bg-secondary p-1">
              {beatFilters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setBeatFilter(f.value)}
                  className={`shrink-0 rounded-md px-4 py-2 font-mono text-xs font-medium transition-colors ${
                    beatFilter === f.value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1 overflow-x-auto rounded-lg bg-secondary p-1">
              {categoryFilters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setCategoryFilter(f.value)}
                  className={`shrink-0 rounded-md px-3 py-2 font-mono text-xs font-medium transition-colors ${
                    categoryFilter === f.value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            {filteredWires.length} wire{filteredWires.length !== 1 ? "s" : ""}
          </span>
          <a
            href="https://x.com/CryptoGrantWire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-2 font-mono text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
          >
            <Send className="h-3 w-3" />
            Submit a Tip
          </a>
        </div>

        {/* Feed */}
        <div className="rounded-lg border border-border bg-card">
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="font-mono text-sm text-muted-foreground">
                Loading wires...
              </p>
            </div>
          ) : filteredWires.length > 0 ? (
            filteredWires.map((item) => (
              <FeedItem key={item.id} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-3 py-16">
              <span className="text-3xl" role="img" aria-label="satellite dish">📡</span>
              <p className="font-mono text-sm text-muted-foreground">
                No wires match your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBeatFilter("all")
                  setCategoryFilter("all")
                  setSearchQuery("")
                }}
                className="text-sm text-primary transition-colors hover:text-primary/80"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
