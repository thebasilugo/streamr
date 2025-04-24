"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MovieCardProps {
  id: string
  title: string
  posterPath: string
  rating: number
  year: string
  type?: "movie" | "series"
  overview?: string
}

export default function MovieCard({ id, title, posterPath, rating, year, type = "movie", overview }: MovieCardProps) {
  const [showRatings, setShowRatings] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden transition-colors hover:bg-zinc-800 group">
      <div className="relative aspect-[2/3] cursor-pointer" onClick={() => (overview ? setShowPreview(true) : null)}>
        <Link href={`/movie/${id}`}>
          <Image src={posterPath || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </Link>
        {type === "series" && (
          <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">Series</div>
        )}
        {overview && (
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
            <div className="text-xs text-white line-clamp-6">{overview}</div>
          </div>
        )}
      </div>
      <div className="p-3">
        <Link href={`/movie/${id}`}>
          <h3 className="font-medium text-sm line-clamp-1 hover:text-teal-500 transition-colors">{title}</h3>
        </Link>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-400 text-xs">{year}</span>
          <button
            onClick={() => setShowRatings(true)}
            className="flex items-center gap-1 bg-zinc-800 px-1.5 py-0.5 rounded hover:bg-zinc-700"
          >
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-xs">{rating.toFixed(1)}</span>
          </button>
        </div>
      </div>

      <Dialog open={showRatings} onOpenChange={setShowRatings}>
        <DialogContent className="bg-zinc-900 text-white border-zinc-800">
          <DialogHeader>
            <DialogTitle>{title} Ratings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">IMDb</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{(rating - 0.2).toFixed(1)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Rotten Tomatoes</span>
              <div className="flex items-center gap-1">
                <span className="text-red-500 font-medium">{Math.round(rating * 10)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Metacritic</span>
              <div className="flex items-center gap-1">
                <span className="text-green-500 font-medium">{Math.round(rating * 8)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">StreamR Users</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{(rating + 0.1).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {overview && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="bg-zinc-900 text-white border-zinc-800">
            <DialogHeader>
              <DialogTitle>
                {title} ({year})
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative aspect-[2/3] md:col-span-1">
                <Image src={posterPath || "/placeholder.svg"} alt={title} fill className="object-cover rounded-md" />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{type === "series" ? "Series" : "Movie"}</span>
                </div>
                <p className="text-sm text-gray-300 mb-4">{overview}</p>
                <Link
                  href={`/movie/${id}`}
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

