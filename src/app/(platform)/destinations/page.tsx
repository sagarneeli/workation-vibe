import { Metadata } from "next"
import { Globe2, Sparkles, TrendingUp } from "lucide-react"

import { DestinationCard } from "@/components/features/destination-card"
import { DestinationFilters } from "@/components/features/destination-filters"
import { prisma } from "@/lib/prisma"
import { toDestinationCardData } from "@/lib/content"

export const metadata: Metadata = {
  title: "Destinations - Workation Vibe",
  description: "Find your next workation spot.",
}

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: [{ updatedAt: "desc" }],
    take: 24,
  })

  const cardDestinations = destinations.map(toDestinationCardData)
  const destinationsWithWifi = destinations.filter((destination) => destination.wifiSpeed != null)
  const destinationsWithCost = destinations.filter((destination) => destination.costOfLiving != null)

  const avgWifi =
    destinationsWithWifi.length > 0
      ? Math.round(
          destinationsWithWifi.reduce((acc, destination) => acc + (destination.wifiSpeed ?? 0), 0) /
            destinationsWithWifi.length
        )
      : 0

  const avgCost =
    destinationsWithCost.length > 0
      ? Math.round(
          destinationsWithCost.reduce((acc, destination) => acc + (destination.costOfLiving ?? 0), 0) /
            destinationsWithCost.length
        )
      : 0

  const countriesCount = new Set(destinations.map((destination) => destination.country)).size

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="hero-grid glass-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 size-44 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute -bottom-14 left-2 size-40 rounded-full bg-emerald-400/20 blur-2xl" />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/75 px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Curated for Remote Professionals
          </div>
          <h1 className="section-title max-w-3xl">Find the city that matches your work rhythm</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Browse handpicked destinations with internet speed, cost-of-living data, and lifestyle context in one
            view.
          </p>

          <div className="grid gap-3 pt-1 sm:grid-cols-3">
            <div className="rounded-xl border border-border/65 bg-background/65 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Cities</p>
              <p className="mt-1 text-xl font-semibold">{destinations.length}</p>
            </div>
            <div className="rounded-xl border border-border/65 bg-background/65 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg Internet</p>
              <p className="mt-1 text-xl font-semibold">{avgWifi > 0 ? `${avgWifi} Mbps` : "N/A"}</p>
            </div>
            <div className="rounded-xl border border-border/65 bg-background/65 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg Budget</p>
              <p className="mt-1 text-xl font-semibold">{avgCost > 0 ? `$${avgCost}/mo` : "N/A"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full lg:w-80 lg:shrink-0">
          <div className="glass-surface sticky top-24 p-5 sm:p-6">
            <DestinationFilters />
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Top Picks</h2>
              <p className="text-sm text-muted-foreground">Updated weekly based on remote worker trends.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/55 px-3 py-1">
                <Globe2 className="size-3.5" />
                {countriesCount} countries
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/55 px-3 py-1">
                <TrendingUp className="size-3.5" />
                Live from database
              </span>
            </div>
          </div>

          {cardDestinations.length === 0 ? (
            <div className="glass-surface rounded-2xl p-8 text-center text-muted-foreground">
              No destinations found yet. Seed your database to get started.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
              {cardDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
