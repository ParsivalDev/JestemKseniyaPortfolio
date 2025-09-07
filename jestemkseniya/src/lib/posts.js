import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

const POSTS_DIR = path.join(process.cwd(), 'src', 'content', 'posts')

export async function getAllPostSlugs() {
  const files = await fs.readdir(POSTS_DIR)
  return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''))
}

export async function getPostList() {
  const files = await fs.readdir(POSTS_DIR)
  const list = []
  for (const f of files) {
    if (!f.endsWith('.mdx')) continue
    const slug = f.replace(/\.mdx$/, '')
    const full = path.join(POSTS_DIR, f)
    const src = await fs.readFile(full, 'utf8')
    const { data } = matter(src)
    list.push({
      slug,
      url: `/blog/${slug}`,
      title: data.title ?? slug,
      date: data.date ?? null,
      summary: data.summary ?? '',
      tags: data.tags ?? [],
      cover: data.cover ?? null,
    })
  }
  list.sort((a,b) => {
    const da = a.date ? new Date(a.date).getTime() : 0
    const db = b.date ? new Date(b.date).getTime() : 0
    return db - da
  })
  return list
}

export async function getPostBySlug(slug) {
  const full = path.join(POSTS_DIR, `${slug}.mdx`)
  const src = await fs.readFile(full, 'utf8')
  const { content, data } = matter(src)
  const { content: MDXContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: 'github-light' }]],
      },
    },
  })
  return {
    slug,
    meta: {
      title: data.title ?? slug,
      date: data.date ?? null,
      summary: data.summary ?? '',
      tags: data.tags ?? [],
      cover: data.cover ?? null,
    },
    Content: MDXContent,
  }
}
