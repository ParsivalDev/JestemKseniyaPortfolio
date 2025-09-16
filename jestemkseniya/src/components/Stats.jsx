// =========================
// FILE: src/components/Stats.jsx
// =========================
import { Users, Eye, TrendingUp, Trophy, Heart, Zap } from 'lucide-react'
function Icon({ children }) { return <div className="icon-bubble scale-90 md:scale-100">{children}</div> }
function Card({ children }) { return <div className="stat-card flex flex-col items-center gap-2 text-center">{children}</div> }

export default function Stats() {
  const base = process.env.NEXT_PUBLIC_ZENCAL_URL || 'https://zencal.io/twoj-username'
  const key = process.env.NEXT_PUBLIC_ZENCAL_API_KEY || 'eb1681c4-40a6-4eb6-8d24-654e04b806e5'
  const zencalHref = `${base}${base.includes('?') ? '&' : '?'}apikey=${encodeURIComponent(key)}`
  return (
    <div className="stats-compact flex flex-col items-center gap-4 md:gap-6">
      {/* Header */}
      <div className="header-card max-w-3xl text-center">
        <h2 className="text-lg md:text-2xl font-extrabold mb-1 md:mb-1.5 text-gradient">Dlaczego Kseniya Agency?</h2>
        <p className="opacity-70 text-[11px] md:text-sm">Liczby mówią same za siebie — sprawdzone wyniki dla marek na całym świecie</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 w-full max-w-5xl">
        <Card>
          <Icon><Users className="w-5 h-5" /></Icon>
          <div className="text-lg md:text-2xl stat-number">500+</div>
          <div className="opacity-70 text-[10px] md:text-xs">Zadowoleni klienci</div>
        </Card>
        <Card>
          <Icon><Eye className="w-5 h-5" /></Icon>
          <div className="text-lg md:text-2xl stat-number">2.5M+</div>
          <div className="opacity-70 text-[10px] md:text-xs">Łączne wyświetlenia</div>
        </Card>
        <Card>
          <Icon><TrendingUp className="w-5 h-5" /></Icon>
          <div className="text-lg md:text-2xl stat-number">150+</div>
          <div className="opacity-70 text-[10px] md:text-xs">Kampanie</div>
        </Card>
        <Card>
          <Icon><Trophy className="w-5 h-5" /></Icon>
          <div className="text-lg md:text-2xl stat-number">98%</div>
          <div className="opacity-70 text-[10px] md:text-xs">Skuteczność</div>
        </Card>
        <Card>
          <Icon><Heart className="w-5 h-5" /></Icon>
          <div className="text-lg md:text-2xl stat-number">1M+</div>
          <div className="opacity-70 text-[10px] md:text-xs">Zaangażowanie</div>
        </Card>
        <Card>
          <Icon><Zap className="w-5 h-5" /></Icon>
          <div className="text-lg md:text-2xl stat-number">24h</div>
          <div className="opacity-70 text-[10px] md:text-xs">Śr. czas odpowiedzi</div>
        </Card>
      </div>

      {/* CTA */}
      <div className="cta-card max-w-2xl w-full text-center hidden xl:block">
        <h3 className="text-sm md:text-lg font-semibold mb-2">Chcesz wynieść swoją markę wyżej?</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="mailto:hello@jestemkseniya.com" className="btn-gradient">Napisz do mnie</a>
          <a href={zencalHref} target="_blank" rel="noreferrer" className="btn-outline">Umówmy się! (ZA DARMO)</a>
        </div>
      </div>
    </div>
  )
}
