// =========================
// FILE: src/app/page.js
// =========================
import Hero from '@/components/Hero'
import PhoneCarousel from '@/components/PhoneCarousel'
import Stats from '@/components/Stats'
import SocialCTA from '@/components/SocialCTA'
import Section from '@/components/Section'

export default function Page() {
  return (
    <main className="relative">
      {/* Section 1 */}
      <Section id="hero">
        <Hero />
      </Section>

      {/* Section 2 */}
      <Section id="portfolio">
        <PhoneCarousel />
      </Section>

      {/* Section 3 */}
      <Section id="stats">
        <Stats />
      </Section>

      {/* Section 4 */}
      <Section id="social">
        <SocialCTA />
      </Section>
    </main>
  )
}