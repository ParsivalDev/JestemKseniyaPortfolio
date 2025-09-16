// =========================
// FILE: src/app/stats/page.js
// =========================
import Stats from '@/components/Stats'
import Section from '@/components/Section'

export const metadata = { title: 'Statystyki – JestemKseniya' }

export default function StatsPage() {
  return (
    <main className="relative">
      <Section id="stats">
        <Stats />
      </Section>
    </main>
  )
}

