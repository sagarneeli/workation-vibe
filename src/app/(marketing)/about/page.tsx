import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about Workation Vibe and our mission.",
}

export default function AboutPage() {
    return (
        <div className="container py-10">
            <div className="mx-auto max-w-3xl space-y-6">
                <h1 className="text-4xl font-bold tracking-tight">About Workation Vibe</h1>
                <p className="text-xl text-muted-foreground">
                    We are on a mission to help remote workers discover the best places to live and work around the world.
                </p>
                <div className="prose dark:prose-invert">
                    <p>
                        Workation Vibe was born from a simple idea: work shouldn't be confined to a dull office.
                        The world is full of inspiring places where productivity meets adventure.
                    </p>
                    <p>
                        Our platform curates the best destinations for digital nomads, verified for internet speed,
                        cost of living, and community vibe. Whether you're looking for a bustling metropolis or a
                        quiet beach town, we've got you covered.
                    </p>
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Freedom:</strong> Work from anywhere, anytime.</li>
                        <li><strong>Community:</strong> Connect with like-minded individuals.</li>
                        <li><strong>Balance:</strong> prioritizing well-being alongside productivity.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
