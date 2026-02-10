import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/landing/hero"
import { BeatsSection } from "@/components/landing/beats-section"
import { WorkflowSection } from "@/components/landing/workflow-section"
import { LatestWires } from "@/components/landing/latest-wires"
import { NewsletterSection } from "@/components/landing/newsletter-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <BeatsSection />
        <WorkflowSection />
        <LatestWires />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  )
}
