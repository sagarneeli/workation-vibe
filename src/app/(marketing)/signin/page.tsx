import type { Metadata } from "next"
import { Suspense } from "react"

import { SignInView } from "@/components/auth/signin-view"

export const metadata: Metadata = {
  title: "Sign In - Workation Vibe",
  description: "Sign in to access your dashboard and saved destinations.",
}

export default function SignInPage() {
  return (
    <section className="mx-auto w-full max-w-6xl py-2 sm:py-4">
      <Suspense fallback={<div className="glass-surface min-h-[560px] animate-pulse" />}>
        <SignInView />
      </Suspense>
    </section>
  )
}
