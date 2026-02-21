import type { Article, Destination } from "@prisma/client"

export const DEFAULT_DESTINATION_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200"

export const DEFAULT_ARTICLE_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}

export function getReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))
  return `${minutes} min read`
}

export function toDestinationCardData(destination: Destination) {
  return {
    id: destination.id,
    slug: destination.slug,
    name: destination.name,
    country: destination.country,
    imageUrl: destination.imageUrl ?? DEFAULT_DESTINATION_IMAGE,
    wifiSpeed: destination.wifiSpeed ?? 0,
    costOfLiving: destination.costOfLiving ?? 0,
    weather: destination.weather ?? "Unknown",
  }
}

export function toArticleCardData(
  article: Article & {
    author: { name: string | null }
    tags: { name: string }[]
  }
) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? "",
    tags: article.tags.map((tag) => tag.name),
    author: article.author.name ?? "Workation Editorial",
    date: formatDate(article.createdAt),
    readTime: getReadTime(article.content),
    imageUrl: article.coverImage ?? DEFAULT_ARTICLE_IMAGE,
  }
}
