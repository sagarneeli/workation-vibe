"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { getProviders, signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Compass, Loader2, ShieldCheck, Sparkles, Wifi } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type ProviderMap = Awaited<ReturnType<typeof getProviders>>

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Email or password is incorrect.",
  OAuthSignin: "Could not start social sign in. Try again.",
  OAuthCallback: "Social login failed to complete.",
  AccessDenied: "Access was denied. Use a different account.",
  Verification: "This sign in link is invalid or expired.",
  Configuration: "Auth configuration is incomplete.",
}

export function SignInView() {
  const searchParams = useSearchParams()
  const [providers, setProviders] = useState<ProviderMap>(null)
  const [email, setEmail] = useState("demo@workation.vibe")
  const [password, setPassword] = useState("demo1234")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const callbackUrl = searchParams.get("callbackUrl") ?? "/"
  const error = searchParams.get("error")

  useEffect(() => {
    getProviders().then((loadedProviders) => setProviders(loadedProviders))
  }, [])

  const providerList = useMemo(() => Object.values(providers ?? {}), [providers])
  const credentialsProvider = providerList.find((provider) => provider.id === "credentials")
  const externalProviders = providerList.filter((provider) => provider.id !== "credentials")

  const errorMessage = error ? errorMessages[error] ?? "Sign in failed. Please try again." : null
  const isDevelopment = process.env.NODE_ENV !== "production"

  async function handleCredentialsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!credentialsProvider) return

    setIsSubmitting(true)
    await signIn("credentials", { email, password, callbackUrl })
    setIsSubmitting(false)
  }

  async function handleProviderSignIn(providerId: string, type: string) {
    setIsSubmitting(true)
    if (type === "email") {
      await signIn(providerId, { email, callbackUrl })
    } else {
      await signIn(providerId, { callbackUrl })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hero-grid glass-surface relative hidden overflow-hidden p-8 lg:block">
        <div className="absolute -left-14 top-8 size-40 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="absolute -right-12 bottom-0 size-44 rounded-full bg-primary/20 blur-2xl" />

        <div className="relative flex h-full flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/75 px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Sparkles className="size-3.5 text-primary" />
              Welcome back
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Sign in to continue your next workation plan</h1>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              Access destination insights, shortlist cities, and keep your remote setup organized in one place.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-xl border border-border/70 bg-background/75 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Trusted Data</p>
              <p className="mt-1 text-base font-medium">Verified internet + cost benchmarks</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/75 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Remote Ready</p>
              <p className="mt-1 text-base font-medium">Cities designed for focus and lifestyle</p>
            </div>
          </div>
        </div>
      </section>

      <Card className="glass-surface border-border/70 py-0">
        <CardHeader className="space-y-3 p-6 pb-4 sm:p-8">
          <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
            <Compass className="size-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Sign In</h2>
            <p className="text-sm text-muted-foreground">Continue to Workation Vibe dashboard and saved destinations.</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-6 pt-0 sm:p-8 sm:pt-0">
          {errorMessage && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          {credentialsProvider && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  required
                  className="h-10 rounded-xl border-border/80 bg-background/70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-10 rounded-xl border-border/80 bg-background/70"
                />
              </div>
              <Button type="submit" className="h-10 w-full rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
                Sign in securely
              </Button>
            </form>
          )}

          {externalProviders.length > 0 && (
            <>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
                <Separator className="flex-1" />
                or continue with
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2">
                {externalProviders.map((provider) => (
                  <Button
                    key={provider.id}
                    type="button"
                    variant="outline"
                    className="h-10 w-full justify-between rounded-xl border-border/80 bg-background/60"
                    onClick={() => handleProviderSignIn(provider.id, provider.type)}
                    disabled={isSubmitting}
                  >
                    <span>
                      {provider.type === "email"
                        ? `Send sign-in link with ${provider.name}`
                        : `Continue with ${provider.name}`}
                    </span>
                    <ArrowRight className="size-4" />
                  </Button>
                ))}
              </div>
            </>
          )}

          {!credentialsProvider && externalProviders.length === 0 && (
            <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
              No sign-in providers are configured. Set auth environment variables and retry.
            </p>
          )}

          {isDevelopment && credentialsProvider && (
            <div className="rounded-xl border border-border/70 bg-secondary/35 px-3 py-2 text-xs text-muted-foreground">
              <p className="inline-flex items-center gap-1">
                <Wifi className="size-3.5" />
                Demo login in development:
                <strong className="ml-1 text-foreground">demo@workation.vibe / demo1234</strong>
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our terms and privacy policy. Need help? <Link href="/about" className="font-medium text-foreground hover:text-primary">Learn more</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
