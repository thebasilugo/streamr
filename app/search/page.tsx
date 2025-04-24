"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import MovieCard from "@/components/movie-card"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Mock data - in a real app, this would come from the OMDB API based on the search query
  const searchResults = [
    {
      id: "tt1375666",
      title: "Inception",
      posterPath: "/placeholder.svg?height=450&width=300",
      rating: 8.8,
      year: "2010",
    },
    {
      id: "tt0816692",
      title: "Interstellar",
      posterPath: "/placeholder.svg?height=450&width=300",
      rating: 8.6,
      year: "2014",
    },
    {
      id: "tt6723592",
      title: "Tenet",
      posterPath: "/placeholder.svg?height=450&width=300",
      rating: 7.4,
      year: "2020",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    // In a real app, this would fetch from OMDB API
    // For now, we'll just simulate a search
    setTimeout(() => {
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search Movies</h1>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative max-w-2xl w-full">
            <Input
              type="search"
              placeholder="Search for movies, actors, directors..."
              className="bg-zinc-900 border-zinc-800 rounded-lg pr-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-400 h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Search Results</h2>
          {isSearching ? (
            <div className="text-center py-12">
              <p>Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.posterPath}
                  rating={movie.rating}
                  year={movie.year}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

