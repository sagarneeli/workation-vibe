"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
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

interface DestinationFiltersProps {
  initialBudget: number
  initialClimate: string
  initialLifestyles: string[]
  climates: string[]
  lifestyles: string[]
}

const MAX_BUDGET = 5000
const MIN_BUDGET = 500

export function DestinationFilters({
  initialBudget,
  initialClimate,
  initialLifestyles,
  climates,
  lifestyles,
}: DestinationFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [budget, setBudget] = useState(initialBudget)
  const [climate, setClimate] = useState(initialClimate)
  const [selectedLifestyles, setSelectedLifestyles] = useState<string[]>(initialLifestyles)

  const hasActiveFilters = useMemo(() => {
    return budget < MAX_BUDGET || Boolean(climate) || selectedLifestyles.length > 0
  }, [budget, climate, selectedLifestyles.length])

  function toggleLifestyle(value: string) {
    setSelectedLifestyles((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString())

    if (budget < MAX_BUDGET) {
      params.set("budget", String(budget))
    } else {
      params.delete("budget")
    }

    if (climate) {
      params.set("climate", climate)
    } else {
      params.delete("climate")
    }

    if (selectedLifestyles.length > 0) {
      params.set("lifestyle", selectedLifestyles.join(","))
    } else {
      params.delete("lifestyle")
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  function clearFilters() {
    setBudget(MAX_BUDGET)
    setClimate("")
    setSelectedLifestyles([])
    router.push(pathname)
  }

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
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Monthly Budget</Label>
          <span className="text-xs text-muted-foreground">
            {budget < MAX_BUDGET ? `Up to $${budget}` : "Any"}
          </span>
        </div>
        <Slider value={[budget]} min={MIN_BUDGET} max={MAX_BUDGET} step={100} className="py-2" onValueChange={(value) => setBudget(value[0] ?? MAX_BUDGET)} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${MIN_BUDGET}</span>
          <span>${MAX_BUDGET.toLocaleString()}+</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Lifestyle</Label>
        {lifestyles.length === 0 ? (
          <p className="text-xs text-muted-foreground">No lifestyle tags available yet.</p>
        ) : (
          <div className="space-y-2.5 text-sm">
            {lifestyles.map((value) => (
              <label
                key={value}
                htmlFor={`lifestyle-${value}`}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border/70 px-3 py-2.5 transition-colors hover:bg-secondary/70"
              >
                <Checkbox
                  id={`lifestyle-${value}`}
                  checked={selectedLifestyles.includes(value)}
                  onCheckedChange={() => toggleLifestyle(value)}
                />
                {value.toLowerCase().includes("beach") ? (
                  <Waves className="size-4 text-cyan-500" />
                ) : value.toLowerCase().includes("city") || value.toLowerCase().includes("startup") ? (
                  <SlidersHorizontal className="size-4 text-indigo-500" />
                ) : (
                  <Mountain className="size-4 text-emerald-600" />
                )}
                {value}
              </label>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Climate</Label>
        <Select value={climate || "all"} onValueChange={(value) => setClimate(value === "all" ? "" : value)}>
          <SelectTrigger className="w-full rounded-xl border-border/70 bg-background/65">
            <SelectValue placeholder="Select climate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any climate</SelectItem>
            {climates.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex gap-2">
        <Button className="w-full rounded-xl" onClick={applyFilters}>
          Apply Filters
        </Button>
        {hasActiveFilters ? (
          <Button variant="outline" className="rounded-xl" onClick={clearFilters}>
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  )
}
