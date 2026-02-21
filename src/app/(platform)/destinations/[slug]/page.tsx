import { notFound } from "next/navigation"

interface PageProps {
    params: {
        slug: string
    }
}

// Dummy data lookup (would be DB call)
const getDestination = (slug: string) => {
    if (slug === "bali-indonesia") {
        return {
            id: "1",
            slug: "bali-indonesia",
            name: "Bali, Indonesia",
            description: "The island of gods. Perfect for surfing, yoga, and coding.",
            imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
        }
    }
    return null
}

export default async function DestinationDetailPage({ params }: PageProps) {
    const { slug } = await params; // Next.js 15 requires awaiting params
    const destination = getDestination(slug)

    if (!destination) {
        // In real app, fetch from DB
        // notFound()
        // For scaffold, just show generic
        return (
            <div className="container py-10">
                <h1 className="text-4xl font-bold capitalize">{slug.replace(/-/g, ' ')}</h1>
                <p className="mt-4 text-muted-foreground">Detailed information coming soon.</p>
            </div>
        )
    }

    return (
        <div className="container py-10 space-y-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                {/* Use standard img tag for now if next/image config issues, but we fixed config. */}
                <img
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                    <h1 className="text-4xl font-bold text-white">{destination.name}</h1>
                </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-xl leading-relaxed">{destination.description}</p>
                <hr className="my-8" />
                <h3>Coworking Spaces</h3>
                <p>List of spaces will appear here...</p>
            </div>
        </div>
    )
}
