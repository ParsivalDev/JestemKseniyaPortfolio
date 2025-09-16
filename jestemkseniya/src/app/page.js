// =========================
// FILE: src/app/page.js
// =========================
import Hero from '@/components/Hero'
import Section from '@/components/Section'

export default function Page() {
  return (
    <main className="relative">
      <Section id="hero">
        <Hero />
      </Section>
    </main>
  )
}
