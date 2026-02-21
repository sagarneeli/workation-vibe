import { MainNav, MobileNav } from "@/components/shared/main-nav"
import { UserNav } from "@/components/shared/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { Compass } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="container flex h-16 items-center gap-3">
        <div className="md:hidden">
          <MobileNav />
        </div>

        <Link href="/" className="inline-flex items-center gap-2 md:hidden">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Compass className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-[0.08em] uppercase">Workation</span>
        </Link>

        <MainNav />

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
