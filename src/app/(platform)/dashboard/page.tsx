import { Metadata } from "next"
import { DestinationCard } from "@/components/features/destination-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Manage your workation plans.",
}

// Dummy data
const savedDestinations = [
    {
        id: "1",
        slug: "bali-indonesia",
        name: "Bali, Indonesia",
        country: "Indonesia",
        imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
        wifiSpeed: 45,
        costOfLiving: 1200,
        weather: "Tropical",
    },
    {
        id: "2",
        slug: "lisbon-portugal",
        name: "Lisbon, Portugal",
        country: "Portugal",
        imageUrl: "https://images.unsplash.com/photo-1590487771765-b1a9fe53d34d?auto=format&fit=crop&q=80&w=800",
        wifiSpeed: 85,
        costOfLiving: 2100,
        weather: "Temperate",
    },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back to your workation command center.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/destinations">Explore New Places</Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-col space-y-1.5 pb-2">
                        <h3 className="font-semibold leading-none tracking-tight text-sm text-muted-foreground">Saved Places</h3>
                    </div>
                    <div className="text-2xl font-bold">
                        {savedDestinations.length}
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-col space-y-1.5 pb-2">
                        <h3 className="font-semibold leading-none tracking-tight text-sm text-muted-foreground">Reading List</h3>
                    </div>
                    <div className="text-2xl font-bold">
                        0
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold tracking-tight mb-4">Saved Destinations</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {savedDestinations.map((dest) => (
                        <DestinationCard key={dest.id} destination={dest} />
                    ))}
                </div>
            </div>
        </div>
    )
}
