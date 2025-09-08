// =========================
// FILE: src/app/page.js
// =========================
import Hero from '@/components/Hero'
import PhoneCarousel from '@/components/PhoneCarousel'
import Stats from '@/components/Stats'
import Experience from '@/components/Experience'
import Section from '@/components/Section'
import SectionStack from '@/components/SectionStack'
import { sectionIds } from '@/components/sections'

export default function Page() {
  return (
    <main className="relative">
      <SectionStack ids={sectionIds}>
        <Section id="hero">
          <Hero />
        </Section>
        <Section id="portfolio">
          <PhoneCarousel disableWheel />
        </Section>
        <Section id="stats">
          <Stats />
        </Section>
        <Section id="experience">
          <Experience />
        </Section>
      </SectionStack>
    </main>
  )
}
