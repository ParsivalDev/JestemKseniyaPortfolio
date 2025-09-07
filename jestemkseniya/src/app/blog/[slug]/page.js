import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import Prose from '@/components/Prose'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function PostPage({ params }) {
  try {
    const { slug } = params
    const { Content, meta } = await getPostBySlug(slug)
    return (
      <main className="p-6 min-h-dvh">
        <div className="max-w-5xl mx-auto mb-6">
          <a href="/blog" className="underline">← Wróć na blog</a>
        </div>
        <Prose>
          <h1>{meta.title}</h1>
          {meta.date && <p className="opacity-60 text-sm">{new Date(meta.date).toLocaleDateString('pl-PL')}</p>}
          <Content />
        </Prose>
      </main>
    )
  } catch {
    return notFound()
  }
}
