import { Suspense } from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { WireFeed } from "@/components/feed/wire-feed"

export const metadata: Metadata = {
  title: "Wire Feed | The Wire Room",
  description:
    "Real-time feed of grants, fellowships, and hackathons across Crypto, AI, and Open Source.",
}

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense>
          <WireFeed />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
