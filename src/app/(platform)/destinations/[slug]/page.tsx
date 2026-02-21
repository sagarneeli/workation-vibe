import Image from "next/image"
import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { DEFAULT_DESTINATION_IMAGE } from "@/lib/content"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params

  const destination = await prisma.destination.findUnique({
    where: { slug },
    include: {
      listings: {
        orderBy: [{ createdAt: "desc" }],
      },
    },
  })

  if (!destination) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={destination.imageUrl ?? DEFAULT_DESTINATION_IMAGE}
          alt={destination.name}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
          <h1 className="text-4xl font-bold text-white">{destination.name}</h1>
          <p className="mt-2 text-white/80">{destination.country}</p>
        </div>
      </div>

      <section className="glass-surface p-6 sm:p-8">
        <p className="text-lg leading-relaxed text-foreground/90">{destination.description}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Listings</h2>
        {destination.listings.length === 0 ? (
          <div className="glass-surface rounded-2xl p-6 text-muted-foreground">No listings available yet.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {destination.listings.map((listing) => (
              <article key={listing.id} className="glass-surface space-y-2 p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{listing.category}</p>
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                {listing.description ? <p className="text-sm text-muted-foreground">{listing.description}</p> : null}
                <div className="flex items-center justify-between text-sm">
                  <span>{listing.price ? `$${listing.price}` : "Price unavailable"}</span>
                  {listing.url ? (
                    <a href={listing.url} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
                      View
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
