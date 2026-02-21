import Image from "next/image"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

import { DEFAULT_ARTICLE_IMAGE, formatDate } from "@/lib/content"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!article || !article.published) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-4 sm:py-6">
      <header className="space-y-4 text-center">
        <div className="text-sm text-muted-foreground">
          {formatDate(article.createdAt)} • {article.author.name ?? "Workation Editorial"}
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{article.title}</h1>
        {article.tags.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {article.tags.map((tag) => (
              <span key={tag.name} className="rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
                {tag.name}
              </span>
            ))}
          </div>
        ) : null}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
          <Image
            src={article.coverImage ?? DEFAULT_ARTICLE_IMAGE}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>
    </div>
  )
}
