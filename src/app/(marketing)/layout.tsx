import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container flex-1 py-8 sm:py-10">{children}</main>
      <SiteFooter />
    </div>
  )
}
