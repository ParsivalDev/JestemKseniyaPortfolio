// =========================
// FILE: src/components/Hero.jsx
// =========================
export default function Hero() {
  return (
    <div className="flex flex-col items-center">
      <div className="glass max-w-3xl w-full mx-auto px-6 md:px-8 py-8 md:py-12 text-center">
        <div className="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-3 md:ring-4 ring-pink-300 shadow-xl -mt-10 md:-mt-16 mb-4">
          <img src="/images/kseniya.jpg" alt="Kseniya" className="w-full h-full object-cover"/>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-3"><span className="text-gradient">Hej, jestem Kseniya! Współpracujemy?</span></h1>
        <p className="text-sm md:text-lg opacity-80">Twórczyni UGC • Montażystka wideo • Właścicielka agencji</p>
        <div className="mt-4 md:mt-5 flex items-center justify-center gap-2">
          <a href="https://tiktok.com/@jestemkseniya" target="_blank" rel="noreferrer" className="badge-pill badge-purple" aria-label="TikTok">
            <span className="inline-block align-middle">🎵</span>
            <span>TikTok</span>
          </a>
          <a href="https://instagram.com/jestemkseniya" target="_blank" rel="noreferrer" className="badge-pill badge-blue" aria-label="Instagram">
            <span className="inline-block align-middle">📸</span>
            <span>Instagram</span>
          </a>
        </div>
        <p className="mt-5 md:mt-6 max-w-2xl mx-auto opacity-80 text-sm md:text-base">
          Pomagam markom rosnąć dzięki autentycznym treściom i przemyślanym strategiom wideo. Stwórzmy razem coś wyjątkowego.
        </p>
      </div>
    </div>
  )
}
