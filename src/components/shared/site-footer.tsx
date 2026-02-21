export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="container flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
        <p>Workation Vibe helps remote professionals choose cities with better focus, value, and lifestyle.</p>
        <p>
          Built by <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">Antigravity</a>.
          Source on <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">GitHub</a>.
        </p>
      </div>
    </footer>
  )
}
