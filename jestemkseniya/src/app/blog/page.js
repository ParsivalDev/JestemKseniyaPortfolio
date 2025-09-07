import { getPostList } from '@/lib/posts'
import Link from 'next/link'

export const metadata = { title: 'Blog – JestemKseniya' }

export default async function BlogList() {
  const posts = await getPostList()
  return (
    <main className="p-6 min-h-dvh">
      <div className="glass-strong max-w-5xl mx-auto rounded-3xl p-8">
        <h1 className="text-4xl font-semibold mb-6">Blog</h1>
        {posts.length === 0 && (
          <p className="opacity-80">Brak wpisów. Dodaj pliki .mdx do <code>src/content/posts</code>.</p>
        )}
        <ul className="grid gap-4">
          {posts.map(p => (
            <li key={p.slug} className="glass rounded-3xl p-5">
              <Link href={p.url} className="text-xl font-medium underline">{p.title}</Link>
              {p.date && <div className="text-sm opacity-70">{new Date(p.date).toLocaleDateString('pl-PL')}</div>}
              {p.summary && <p className="mt-2 opacity-80">{p.summary}</p>}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
