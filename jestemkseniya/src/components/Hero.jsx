// =========================
// FILE: src/components/Hero.jsx
// =========================
import { Music, Camera } from 'lucide-react'
import SocialCards from './SocialCards'

export default function Hero() {
  return (
    <div className="flex flex-col items-cente justify-centerr">
      <div className="glass max-w-3xl w-full mx-auto px-6 md:px-8 py-8 md:py-12 text-center">
        <div className="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-3 md:ring-4 ring-pink-300 shadow-xl -mt-10 md:-mt-16 mb-4">
          <img src="/images/kseniya.jpg" alt="Kseniya" className="w-full h-full object-cover"/>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold"><span className="text-gradient">Hej, jestem Kseniya!</span></h1>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3"><span className="text-gradient">Współpracujemy?</span></h2>
        <p className="text-sm md:text-lg opacity-80">Twórczyni UGC • Montażystka wideo • Właścicielka agencji</p>
        {/* Social badges removed — replaced by SocialCards below */}
        <p className="mt-5 md:mt-6 max-w-2xl mx-auto opacity-80 text-sm md:text-base">
          Pomagam markom rosnąć dzięki autentycznym treściom i przemyślanym strategiom wideo. Stwórzmy razem coś wyjątkowego. PS: jestem wyjątkowo cudowna ;3 dlatego powstała ta strona
        </p>
        <div className="mt-5">
          <SocialCards />
        </div>
      </div>
    </div>
  )
}
