// =========================
// FILE: src/app/layout.js
// =========================
import './globals.css'

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
      <body className="min-h-dvh gradient-bg text-slate-900 antialiased">{children}</body>
    </html>
  )
}
