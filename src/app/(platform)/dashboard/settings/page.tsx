import { Metadata } from "next"

import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings.",
}

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex flex-col gap-2 px-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl border border-border/70 bg-secondary/45 p-1">
          <TabsTrigger value="profile" className="rounded-lg text-base">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-lg text-base">
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-3">
          <Card className="glass-surface border-border/70 py-0">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your profile details. Profile persistence endpoint coming next.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={session?.user?.name ?? ""} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={session?.user?.email ?? ""} disabled className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell other nomads about your work style and travel goals."
                  className="min-h-28 rounded-xl"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6">
              <Button disabled className="h-11 min-w-36 rounded-xl">
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-3">
          <Card className="glass-surface border-border/70 py-0">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Password management is available via your auth provider.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" disabled className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" disabled className="h-11 rounded-xl" />
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-6">
              <Button disabled className="h-11 min-w-36 rounded-xl">
                Save password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
