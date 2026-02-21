import { Metadata } from "next"
import { Compass, Globe2, HeartHandshake, Radar, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Workation Vibe and our mission.",
}

const values = [
  {
    title: "Freedom",
    description: "Work from places that elevate your energy and focus, without sacrificing performance.",
    icon: Compass,
  },
  {
    title: "Community",
    description: "Build meaningful connections with founders, creators, and remote teams worldwide.",
    icon: HeartHandshake,
  },
  {
    title: "Clarity",
    description: "Use practical, verified data to choose the right city for this season of life.",
    icon: Radar,
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="hero-grid glass-surface relative overflow-hidden p-6 sm:p-10">
        <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/20 blur-2xl" />
        <div className="absolute -bottom-16 left-10 size-48 rounded-full bg-emerald-400/20 blur-2xl" />

        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/75 px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Zap className="size-3.5 text-primary" />
            Mission & Team
          </div>

          <h1 className="section-title max-w-3xl">Building the modern map for remote work and better living</h1>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Workation Vibe helps remote professionals discover high-signal cities based on internet quality, cost,
            safety, and real community fit.
          </p>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 text-xs text-muted-foreground">
            <Globe2 className="size-3.5" />
            Trusted by remote workers across 20+ countries
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="glass-surface space-y-3 p-5 sm:p-6">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
              <value.icon className="size-5" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">{value.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{value.description}</p>
          </article>
        ))}
      </section>

      <section className="glass-surface max-w-4xl space-y-4 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Why we started</h2>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          The best work doesn&apos;t happen in one fixed location. We started Workation Vibe to remove guesswork from
          deciding where to live and work next, with practical information instead of influencer noise.
        </p>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          Our roadmap is simple: richer local intelligence, better planning tools, and a tighter feedback loop with the
          global remote community.
        </p>
      </section>
    </div>
  )
}
