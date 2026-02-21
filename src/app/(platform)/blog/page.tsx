import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BookOpenText, Clock3, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { toArticleCardData } from "@/lib/content"

export const metadata: Metadata = {
  title: "Blog - Workation Vibe",
  description: "Insights for the remote worker.",
}

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true } },
      tags: { select: { name: true } },
    },
    orderBy: [{ createdAt: "desc" }],
    take: 24,
  })

  const articleCards = articles.map(toArticleCardData)

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="hero-grid glass-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-14 top-8 size-32 rounded-full bg-primary/20 blur-2xl" />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Curated Insights
          </div>

          <h1 className="section-title max-w-3xl">The Nomad Journal</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Actionable playbooks on location strategy, visas, remote team productivity, and better work-life design.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1">
              <BookOpenText className="size-3.5" />
              {articleCards.length} published stories
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1">
              <Clock3 className="size-3.5" />
              Fresh updates weekly
            </span>
          </div>
        </div>
      </section>

      {articleCards.length === 0 ? (
        <div className="glass-surface rounded-2xl p-8 text-center text-muted-foreground">
          No published articles yet. Seed your database or publish content in your admin workflow.
        </div>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {articleCards.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group block h-full">
              <Card className="glass-surface h-full overflow-hidden border-border/70 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_58px_-30px_rgba(16,46,80,0.72)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground/85 backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>

                <CardHeader className="space-y-3 p-5 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full px-2.5 py-1 text-[11px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold leading-snug tracking-tight">{article.title}</h2>
                </CardHeader>

                <CardContent className="p-5 pt-1">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
                </CardContent>

                <CardFooter className="justify-between gap-2 p-5 pt-0 text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                  <span className="rounded-full border border-border/70 px-2 py-0.5">{article.readTime}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </div>
  )
}
