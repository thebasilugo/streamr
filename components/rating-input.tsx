"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RatingInputProps {
  onRatingSubmit: (rating: number) => void
  currentRating: number | null
}

export default function RatingInput({ onRatingSubmit, currentRating }: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(currentRating || 0)

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const handleClick = (rating: number) => {
    setSelectedRating(rating)
  }

  const handleSubmit = () => {
    if (selectedRating > 0) {
      onRatingSubmit(selectedRating)
    }
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            className="p-1"
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(rating)}
          >
            <Star
              className={`h-8 w-8 ${
                (hoverRating || selectedRating) >= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-500"
              }`}
            />
          </button>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={selectedRating === 0}
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        Submit Rating
      </Button>
    </div>
  )
}

