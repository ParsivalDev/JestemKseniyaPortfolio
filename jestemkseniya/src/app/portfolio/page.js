// =========================
// FILE: src/app/portfolio/page.js
// =========================
import PhoneCarousel from '@/components/PhoneCarousel'
import Section from '@/components/Section'

export const metadata = { title: 'Realizacje – JestemKseniya' }

export default function PortfolioPage() {
  return (
    <main className="relative">
      <Section id="portfolio">
        <PhoneCarousel disableWheel />
      </Section>
    </main>
  )
}

