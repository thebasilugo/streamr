"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function TypeToggle() {
  const [type, setType] = useState("all")

  return (
    <RadioGroup defaultValue="all" value={type} onValueChange={setType}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="all" id="all" />
        <Label htmlFor="all" className="text-sm cursor-pointer">
          All
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="movie" id="movie" />
        <Label htmlFor="movie" className="text-sm cursor-pointer">
          Movies
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="series" id="series" />
        <Label htmlFor="series" className="text-sm cursor-pointer">
          Series
        </Label>
      </div>
    </RadioGroup>
  )
}

