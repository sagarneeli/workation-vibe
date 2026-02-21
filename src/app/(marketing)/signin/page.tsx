import type { Metadata } from "next"

import { SignInView } from "@/components/auth/signin-view"

export const metadata: Metadata = {
  title: "Sign In - Workation Vibe",
  description: "Sign in to access your dashboard and saved destinations.",
}

export default function SignInPage() {
  return (
    <section className="mx-auto w-full max-w-6xl py-2 sm:py-4">
      <SignInView />
    </section>
  )
}
