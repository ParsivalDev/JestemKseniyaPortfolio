// =========================
// FILE: src/components/Hero.jsx
// =========================
export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div className="relative w-36 h-36 rounded-full overflow-hidden glass ring-1 ring-white/60">
        {/* TODO: Podmień obrazek na /public/images/kseniya.jpg */}
        <img src="/images/kseniya.jpg" alt="Kseniya" className="object-cover w-full h-full"/>
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold">Hej! Jestem Kseniya.</h1>
      <p className="text-lg md:text-xl opacity-80">UGC Creator • Video Editor • Marketing Agency Owner</p>
      <p className="max-w-2xl opacity-80">
        Tworzę autentyczne treści UGC i montuję filmy, które sprzedają. Z Kyusha Agency łączę strategię i produkcję end‑to‑end.
      </p>
      <a href="#portfolio" className="mt-2 inline-block px-5 py-3 rounded-full glass hover:scale-105 transition">
        Zobacz portfolio
      </a>
    </div>
  )
}