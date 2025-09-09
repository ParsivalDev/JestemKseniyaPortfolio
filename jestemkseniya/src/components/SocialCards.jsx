import { Instagram, Music2, ExternalLink } from 'lucide-react'

function Card({ href, name, handle, followers, brand }) {
  const Icon = brand === 'brand-ig' ? Instagram : Music2
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between glass p-5 rounded-3xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
    >
      <div className="flex items-center gap-3">
        <div className={`brand-bubble ${brand} text-white shrink-0 transition-transform duration-200 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="leading-snug">
          <div className="font-semibold text-base">{name}</div>
          <div className="text-sm opacity-70">{handle}</div>
          {followers && <div className="text-xs opacity-60">{followers} followers</div>}
        </div>
      </div>
      <ExternalLink className="w-4 h-4 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
    </a>
  )
}

export default function SocialCards() {
  return (
    <div className="grid md:grid-cols-2 gap-4 w-full max-w-5xl">
      <Card
        href="https://instagram.com/jestemkseniya"
        name="Instagram"
        handle="@jestemkseniya"
        followers="125K"
        brand="brand-ig"
      />
      <Card
        href="https://tiktok.com/@jestemkseniya"
        name="TikTok"
        handle="@jestemkseniya"
        followers="89K"
        brand="brand-tt"
      />
    </div>
  )
}
