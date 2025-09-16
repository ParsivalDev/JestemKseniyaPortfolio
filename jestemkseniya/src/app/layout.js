// =========================
// FILE: src/app/layout.js
// =========================
import './globals.css'
import Script from 'next/script'
import CloudIntro from '@/components/CloudIntro'
import RouterEffects from '@/components/RouterEffects'
import ScrollRouteNav from '@/components/ScrollRouteNav'

export const metadata = {
  title: 'JestemKseniya.com – UGC, Wideo, Kseniya Agency',
  description: 'Portfolio one‑page + blog MDX influencerki Kseniya. Twórczyni UGC, montażystka wideo, właścicielka Kseniya Agency.',
  openGraph: {
    title: 'JestemKseniya.com – UGC, Wideo, Kseniya Agency',
    description: 'Portfolio one‑page + blog MDX influencerki Kseniya.',
    url: 'https://jestemkseniya.com',
    images: ['/og.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="min-h-dvh gradient-bg text-slate-900 antialiased">
        <div id="page-root" className="page-root">
          {children}
        </div>
        <RouterEffects />
        <ScrollRouteNav />
        {/* GSAP CDN */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        {/* Clouds intro overlay */}
        <CloudIntro />
      </body>
    </html>
  )
}
