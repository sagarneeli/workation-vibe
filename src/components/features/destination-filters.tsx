"use client"

import { Mountain, SlidersHorizontal, Sparkles, Waves } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function DestinationFilters() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          Smart Filters
        </div>
        <h3 className="text-lg font-semibold tracking-tight">Find your ideal setup</h3>
        <p className="text-sm text-muted-foreground">Balance cost, internet quality, climate, and city vibe.</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Monthly Budget</Label>
        <Slider defaultValue={[2200]} max={5000} step={100} className="py-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$500</span>
          <span>$5,000+</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Lifestyle</Label>
        <div className="space-y-2.5 text-sm">
          <label htmlFor="beach" className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/70 px-3 py-2.5 transition-colors hover:bg-secondary/70">
            <Checkbox id="beach" />
            <Waves className="size-4 text-cyan-500" />
            Beach Life
          </label>
          <label htmlFor="city" className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/70 px-3 py-2.5 transition-colors hover:bg-secondary/70">
            <Checkbox id="city" />
            <SlidersHorizontal className="size-4 text-indigo-500" />
            Fast-Paced City
          </label>
          <label htmlFor="nature" className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/70 px-3 py-2.5 transition-colors hover:bg-secondary/70">
            <Checkbox id="nature" />
            <Mountain className="size-4 text-emerald-600" />
            Nature + Mountains
          </label>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Climate</Label>
        <Select>
          <SelectTrigger className="w-full rounded-xl border-border/70 bg-background/65">
            <SelectValue placeholder="Select climate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tropical">Tropical</SelectItem>
            <SelectItem value="temperate">Temperate</SelectItem>
            <SelectItem value="cold">Cool / Cold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="mt-2 w-full rounded-xl">Apply Filters</Button>
    </div>
  )
}
