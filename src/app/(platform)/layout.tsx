import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"

interface PlatformLayoutProps {
    children: React.ReactNode
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container py-6">{children}</main>
            <SiteFooter />
        </div>
    )
}
