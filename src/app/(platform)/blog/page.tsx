import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BookOpenText, Clock3, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Blog - Workation Vibe",
  description: "Insights for the remote worker.",
}

const articles = [
  {
    id: "1",
    slug: "top-5-coworking-spaces-bali",
    title: "Top 5 Coworking Spaces in Bali",
    excerpt: "Discover the most productive spots in the Island of Gods.",
    tags: ["Productivity", "Bali"],
    author: "Sarah Jen",
    date: "Feb 12, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "2",
    slug: "digital-nomad-visa-guide-2026",
    title: "Complete Guide to Digital Nomad Visas (2026)",
    excerpt: "Everything you need to know about navigating legal requirements.",
    tags: ["Visa", "Legal"],
    author: "Mike Ross",
    date: "Jan 28, 2026",
    readTime: "9 min read",
    imageUrl: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "3",
    slug: "productivity-hacks-remote-work",
    title: "Productivity Hacks for Remote Workers",
    excerpt: "How to stay focused when the beach is calling.",
    tags: ["Productivity", "Lifestyle"],
    author: "Jessica Day",
    date: "Feb 15, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200",
  },
]

export default function BlogPage() {
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
              {articles.length} featured stories
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1">
              <Clock3 className="size-3.5" />
              Fresh updates weekly
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
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
    </div>
  )
}
