import { Metadata } from "next"
import { DestinationCard } from "@/components/features/destination-card"
import { DestinationFilters } from "@/components/features/destination-filters"

export const metadata: Metadata = {
    title: "Destinations - Workation Vibe",
    description: "Find your next workation spot.",
}

// Dummy data for initial view
const destinations = [
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
        imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800",
        wifiSpeed: 85,
        costOfLiving: 2100,
        weather: "Temperate",
    },
    {
        id: "3",
        slug: "chiang-mai-thailand",
        name: "Chiang Mai, Thailand",
        country: "Thailand",
        imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&q=80&w=800",
        wifiSpeed: 50,
        costOfLiving: 900,
        weather: "Tropical",
    },
    {
        id: "4",
        slug: "medellin-colombia",
        name: "Medellín, Colombia",
        country: "Colombia",
        imageUrl: "https://images.unsplash.com/photo-1619546952812-520e98064a52?auto=format&fit=crop&q=80&w=800",
        wifiSpeed: 60,
        costOfLiving: 1100,
        weather: "Temperate",
    },
    {
        id: "5",
        slug: "canggu-bali",
        name: "Canggu, Bali",
        country: "Indonesia",
        imageUrl: "https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&q=80&w=800",
        wifiSpeed: 55,
        costOfLiving: 1500,
        weather: "Tropical",
    },
    {
        id: "6",
        slug: "mexico-city",
        name: "Mexico City, Mexico",
        country: "Mexico",
        imageUrl: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&q=80&w=800",
        wifiSpeed: 70,
        costOfLiving: 1800,
        weather: "Temperate",
    },
]

export default function DestinationsPage() {
    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
                    <div className="sticky top-24 rounded-xl border bg-card p-5 shadow-sm">
                        <DestinationFilters />
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Explore Destinations</h1>
                        <p className="text-muted-foreground mt-2">
                            Found {destinations.length} places for your next adventure.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {destinations.map((dest) => (
                            <DestinationCard key={dest.id} destination={dest} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
