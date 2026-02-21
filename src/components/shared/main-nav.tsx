"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block">
                    Workation Vibe
                </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                    href="/destinations"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/destinations")
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    Destinations
                </Link>
                <Link
                    href="/blog"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/blog")
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    Blog
                </Link>
                <Link
                    href="/about"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/about")
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    About
                </Link>
            </nav>
        </div>
    )
}
