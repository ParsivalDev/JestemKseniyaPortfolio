// =========================
// FILE: src/components/Stats.jsx
// =========================
function Stat({ value, label }) {
  return (
    <div className="glass rounded-3xl p-6 text-center">
      <div className="text-3xl md:text-4xl font-semibold">{value}</div>
      <div className="opacity-70 mt-1">{label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <div className="grid gap-8">
      <h2 className="text-3xl md:text-4xl font-semibold text-center">Dlaczego warto stawiać na Kyusha Agency?</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat value="50+" label="zrealizowanych UGC" />
        <Stat value="20+" label="obsłużonych marek" />
        <Stat value="<48h" label="średni czas montażu" />
        <Stat value="4.9/5" label="satysfakcja klientów" />
      </div>

      <ul className="grid md:grid-cols-3 gap-4 text-center">
        <li className="glass rounded-3xl p-5">Strategia + produkcja + montaż end‑to‑end</li>
        <li className="glass rounded-3xl p-5">Autentyczne materiały UGC, które sprzedają</li>
        <li className="glass rounded-3xl p-5">Transparentna komunikacja i szybkie terminy</li>
      </ul>
    </div>
  )
}