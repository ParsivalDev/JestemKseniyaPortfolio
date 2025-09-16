// =========================
// FILE: src/app/experience/page.js
// =========================
import Experience from '@/components/Experience'
import Section from '@/components/Section'

export const metadata = { title: 'Doświadczenie – JestemKseniya' }

export default function ExperiencePage() {
  return (
    <main className="relative">
      <Section id="experience">
        <Experience />
      </Section>
    </main>
  )
}

