"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
]

export default function GenreFilter() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
      {genres.map((genre) => (
        <div key={genre} className="flex items-center space-x-2">
          <Checkbox
            id={`genre-${genre}`}
            checked={selectedGenres.includes(genre)}
            onCheckedChange={() => handleGenreChange(genre)}
          />
          <Label htmlFor={`genre-${genre}`} className="text-sm cursor-pointer">
            {genre}
          </Label>
        </div>
      ))}
    </div>
  )
}

