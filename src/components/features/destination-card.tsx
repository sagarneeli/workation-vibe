import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, DollarSign, MapPin, Wifi } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface DestinationCardProps {
  destination: {
    id: string
    slug: string
    name: string
    country: string
    imageUrl: string
    wifiSpeed: number
    costOfLiving: number
    weather: string
  }
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block h-full">
      <Card className="glass-surface h-full overflow-hidden border-border/70 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-28px_rgba(16,46,80,0.7)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

          <Badge className="absolute left-3 top-3 rounded-full bg-background/75 px-2.5 py-1 text-[11px] text-foreground/90 backdrop-blur">
            {destination.weather}
          </Badge>

          <div className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-background/70 text-foreground/80 backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        <CardHeader className="gap-3 p-5 pb-1">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight">{destination.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {destination.country}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex items-center gap-4 p-5 pt-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
            <Wifi className="size-3.5" />
            {destination.wifiSpeed} Mbps
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-200">
            <DollarSign className="size-3.5" />
            ${destination.costOfLiving}/mo
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
