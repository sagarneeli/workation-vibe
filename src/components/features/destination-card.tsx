import Link from "next/link"
import { MapPin, Wifi, DollarSign } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import Image from "next/image"

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
        <Link href={`/destinations/${destination.slug}`}>
            <Card className="h-full overflow-hidden transition-all hover:border-sidebar-primary/50 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={destination.imageUrl}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                            {destination.weather}
                        </Badge>
                    </div>
                </div>
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold tracking-tight text-lg">{destination.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="mr-1 h-3 w-3" />
                                {destination.country}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1.5" title="Internet Speed">
                            <Wifi className="h-4 w-4 text-emerald-500" />
                            <span className="font-medium">{destination.wifiSpeed} Mbps</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Monthly Cost">
                            <DollarSign className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">${destination.costOfLiving}/mo</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
