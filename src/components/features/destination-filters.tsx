"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SlidersHorizontal } from "lucide-react"

export function DestinationFilters() {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <div>
                    <h3 className="font-semibold text-base">Filters</h3>
                    <p className="text-xs text-muted-foreground">Refine your search</p>
                </div>
            </div>

            <Separator />

            <div className="space-y-3">
                <Label className="text-sm font-medium">Budget (Monthly)</Label>
                <Slider defaultValue={[2000]} max={5000} step={100} className="py-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$0</span>
                    <span>$5k+</span>
                </div>
            </div>

            <Separator />

            <div className="space-y-3">
                <Label className="text-sm font-medium">Lifestyle</Label>
                <div className="space-y-2.5">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="beach" />
                        <Label htmlFor="beach" className="font-normal cursor-pointer">Beach Life</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="city" />
                        <Label htmlFor="city" className="font-normal cursor-pointer">Metropolis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="nature" />
                        <Label htmlFor="nature" className="font-normal cursor-pointer">Nature & Mountains</Label>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-3">
                <Label className="text-sm font-medium">Climate</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select climate" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tropical">Tropical</SelectItem>
                        <SelectItem value="temperate">Temperate</SelectItem>
                        <SelectItem value="cold">Cool/Cold</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button className="w-full mt-2">Apply Filters</Button>
        </div>
    )
}
