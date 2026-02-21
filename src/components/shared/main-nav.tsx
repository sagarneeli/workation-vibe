"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="hidden items-center gap-8 md:flex">
      <Link href="/" className="group inline-flex items-center gap-2">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary/20">
          <Compass className="size-4" />
        </span>
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/90 uppercase">
          Workation Vibe
        </span>
      </Link>

      <nav className="flex items-center gap-2 rounded-full border border-border/70 bg-background/65 px-2 py-1 backdrop-blur-md">
        {links.map((link) => {
          const isActive = pathname?.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export function MobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-sm" className="rounded-xl border-border/80 bg-card/80 md:hidden">
          <Menu className="size-4" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[84vw] max-w-sm border-r-border/80 bg-background/95 px-0">
        <SheetHeader className="border-b border-border/70 px-6 pb-5">
          <SheetTitle className="flex items-center gap-2 text-base tracking-wide uppercase">
            <Compass className="size-4 text-primary" />
            Workation Vibe
          </SheetTitle>
          <SheetDescription>Discover places where focused work meets better living.</SheetDescription>
        </SheetHeader>

        <nav className="space-y-2 px-4 py-5">
          {links.map((link) => {
            const isActive = pathname?.startsWith(link.href)

            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/75 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </SheetClose>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
