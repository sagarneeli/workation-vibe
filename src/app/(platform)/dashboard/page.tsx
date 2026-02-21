import { Metadata } from "next"
import Link from "next/link"

import { auth } from "@/auth"
import { DestinationCard } from "@/components/features/destination-card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { toDestinationCardData } from "@/lib/content"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your workation plans.",
}

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id

  const [savedDestinations, publishedGuides] = await Promise.all([
    userId
      ? prisma.favorite.findMany({
          where: { userId },
          include: { destination: true },
          orderBy: [{ createdAt: "desc" }],
          take: 12,
        })
      : Promise.resolve([]),
    prisma.article.count({ where: { published: true } }),
  ])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your workation command center.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/destinations">Explore New Places</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 pb-2">
            <h3 className="text-sm font-semibold leading-none tracking-tight text-muted-foreground">Saved Places</h3>
          </div>
          <div className="text-2xl font-bold">{savedDestinations.length}</div>
        </div>
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 pb-2">
            <h3 className="text-sm font-semibold leading-none tracking-tight text-muted-foreground">Published Guides</h3>
          </div>
          <div className="text-2xl font-bold">{publishedGuides}</div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Saved Destinations</h2>
        {savedDestinations.length === 0 ? (
          <div className="glass-surface rounded-2xl p-6 text-muted-foreground">
            No saved destinations yet. Start by exploring destinations and adding favorites.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedDestinations.map((favorite) => (
              <DestinationCard key={favorite.id} destination={toDestinationCardData(favorite.destination)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
