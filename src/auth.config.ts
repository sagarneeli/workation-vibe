import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import Credentials from "next-auth/providers/credentials"

const providers: NextAuthConfig["providers"] = []

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push(Google)
}

if (process.env.AUTH_RESEND_KEY) {
    providers.push(
        Resend({
            from: process.env.AUTH_RESEND_FROM ?? "onboarding@resend.dev",
        })
    )
}

if (process.env.NODE_ENV !== "production") {
    providers.push(
        Credentials({
            name: "Demo Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "demo@workation.vibe" },
                password: { label: "Password", type: "password" },
            },
            authorize(credentials) {
                const expectedEmail = process.env.DEMO_USER_EMAIL ?? "demo@workation.vibe"
                const expectedPassword = process.env.DEMO_USER_PASSWORD ?? "demo1234"

                if (
                    credentials?.email === expectedEmail &&
                    credentials?.password === expectedPassword
                ) {
                    return {
                        id: "demo-user",
                        name: "Demo User",
                        email: expectedEmail,
                    }
                }

                return null
            },
        })
    )
}

export const authConfig = {
    providers,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }
            return true
        },
    },
} satisfies NextAuthConfig
