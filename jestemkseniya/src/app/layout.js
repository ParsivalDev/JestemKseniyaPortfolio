// =========================
// FILE: src/app/layout.js
// =========================
import './globals.css'

export const metadata = {
  title: 'JestemKseniya.com – UGC, Video, Kyusha Agency',
  description: 'One‑page portfolio + blog MDX influencerki Kseniya. UGC Creator, Video Editor, właścicielka Kyusha Agency.',
  openGraph: {
    title: 'JestemKseniya.com – UGC, Video, Kyusha Agency',
    description: 'One‑page portfolio + blog MDX influencerki Kseniya.',
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
