import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

interface PageProps {
    params: {
        slug: string
    }
}

// Dummy data
const getArticle = (slug: string) => {
    const content = `
# Introduction

Working remotely in Bali is a dream for many. The island offers a unique blend of culture, nature, and modern infrastructure.

## Where to work?

### 1. Dojo Bali
Located in Canggu, this is the OG coworking space. Great community.

### 2. Tropical Nomad
Offers a more relaxed vibe with excellent internet.

## Tips for Productivity
- Start your day early
- Use noise-cancelling headphones
- Join community events

> "Bali is not just a destination, it's a state of mind."

## Conclusion
Pack your bags and go!
  `

    if (slug === "top-5-coworking-spaces-bali") {
        return {
            title: "Top 5 Coworking Spaces in Bali",
            date: "Feb 12, 2026",
            author: "Sarah Jen",
            content: content,
            imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=1200",
        }
    }
    return null
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticle(slug)

    if (!article) {
        return (
            <div className="container py-10">
                <h1 className="text-4xl font-bold">Article not found</h1>
            </div>
        )
    }

    return (
        <div className="container max-w-3xl py-10">
            <div className="mb-8 text-center">
                <div className="text-sm text-muted-foreground mb-2">{article.date} • {article.author}</div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{article.title}</h1>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            <article className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown>{article.content}</ReactMarkdown>
            </article>
        </div>
    )
}
