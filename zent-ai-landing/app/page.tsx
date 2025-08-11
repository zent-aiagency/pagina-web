import { HeroSection } from "@/components/sections/hero-section"
import { WhatWeDoSection } from "@/components/sections/what-we-do-section"
import { WhatWeOfferSection } from "@/components/sections/what-we-offer-section"
import { WhoWeHelpSection } from "@/components/sections/who-we-help-section"
import { AboutUsSection } from "@/components/sections/about-us-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ToolsSection } from "@/components/sections/tools-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PerformanceProvider } from "@/components/performance-provider"
import { PerformanceMonitor } from "@/components/performance/performance-monitor"
import { FloatingUseCasesButton } from "@/components/floating-use-cases-button"

export default function Home() {
  return (
    <PerformanceProvider>
      <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
        <Navigation />
        <main>
          <HeroSection />
          <WhatWeDoSection />
          <WhatWeOfferSection />
          <WhoWeHelpSection />
          <AboutUsSection />
          <TestimonialsSection />
          <ToolsSection />
          <ContactSection />
        </main>

        <Footer />

        {/* Floating Use Cases Button */}
        <FloatingUseCasesButton />

        {/* Performance Monitor - solo visible en desarrollo */}
        <PerformanceMonitor enableInProduction={false} showByDefault={false} />
      </div>
    </PerformanceProvider>
  )
}
