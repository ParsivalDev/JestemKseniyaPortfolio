// =========================
// FILE: src/components/SocialCTA.jsx
// =========================
export default function SocialCTA() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold">Złapmy kontakt</h2>
      <p className="opacity-80 max-w-2xl">Współprace, wyceny i szybkie konsultacje. Poniżej moje social media i szybkie przyciski do kontaktu.</p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* TODO: podmień linki */}
        <a className="glass rounded-full px-4 py-2" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a className="glass rounded-full px-4 py-2" href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
        <a className="glass rounded-full px-4 py-2" href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
        <a className="glass rounded-full px-4 py-2" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="glass rounded-full px-4 py-2" href="/blog">Blog</a>
      </div>

      <div className="flex gap-3">
        <a className="glass rounded-full px-5 py-3" href="mailto:hello@jestemkseniya.com">Napisz do mnie</a>
        <a className="glass rounded-full px-5 py-3" href="https://wa.me/48123456789" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </div>
  )
}