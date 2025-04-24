"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export default function RatingFilter() {
  const [rating, setRating] = useState([0])

  return (
    <div className="space-y-4">
      <Slider
        defaultValue={[0]}
        max={10}
        step={0.5}
        value={rating}
        onValueChange={setRating}
        className="[&>span:first-child]:h-1 [&>span:first-child]:bg-zinc-700 [&_[role=slider]]:bg-teal-500 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-teal-500"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>Any</span>
        <span>{rating[0] > 0 ? `${rating[0]}+ stars` : "Any"}</span>
      </div>
    </div>
  )
}

