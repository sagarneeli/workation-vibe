import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
        imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "2",
        slug: "digital-nomad-visa-guide-2026",
        title: "Complete Guide to Digital Nomad Visas (2026)",
        excerpt: "Everything you need to know about navigating legal requirements.",
        tags: ["Visa", "Legal"],
        author: "Mike Ross",
        date: "Jan 28, 2026",
        imageUrl: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "3",
        slug: "productivity-hacks-remote-work",
        title: "Productivity Hacks for Remote Workers",
        excerpt: "How to stay focused when the beach is calling.",
        tags: ["Productivity", "Lifestyle"],
        author: "Jessica Day",
        date: "Feb 15, 2026",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
    }
]

export default function BlogPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight">The Nomad Journal</h1>
                <p className="text-xl text-muted-foreground">
                    Guides, tips, and stories from the community.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <Link key={article.id} href={`/blog/${article.slug}`}>
                        <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-sidebar-primary/50">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="object-cover w-full h-full transition-transform hover:scale-105"
                                />
                            </div>
                            <CardHeader className="p-4">
                                <div className="flex gap-2 mb-2">
                                    {article.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                    ))}
                                </div>
                                <h3 className="font-bold text-xl leading-tight">{article.title}</h3>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
                                <span>{article.author}</span>
                                <span>{article.date}</span>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
