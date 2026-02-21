import Link from "next/link"
import { ArrowRight, MapPinned, Waves } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="hero-grid glass-surface relative overflow-hidden p-6 sm:p-10">
        <div className="absolute -left-14 top-8 size-40 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="absolute -right-14 bottom-0 size-44 rounded-full bg-primary/20 blur-2xl" />

        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Waves className="size-3.5 text-primary" />
            Remote-first lifestyle platform
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Work where you thrive, not just where you happen to live.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-lg">
            Discover destination intelligence for digital nomads, remote teams, and independent professionals.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/destinations">
                Explore destinations
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-border/80 bg-background/70 px-6">
              <Link href="/blog">Read the journal</Link>
            </Button>
          </div>

          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Destinations</p>
              <p className="mt-1 text-xl font-semibold">150+</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg Setup Time</p>
              <p className="mt-1 text-xl font-semibold">2 weeks</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Countries</p>
              <p className="mt-1 text-xl font-semibold">20+</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="glass-surface p-5 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight">Plan smarter</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Compare internet, budget, and lifestyle signals across cities so you pick places that support deep work.
          </p>
        </article>
        <article className="glass-surface p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <MapPinned className="size-4 text-primary" />
            Move with confidence
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Learn from practical guides and first-hand remote work playbooks from our editorial team and community.
          </p>
        </article>
      </section>
    </div>
  )
}
