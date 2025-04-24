"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

// Mock search results
const mockSearchResults = [
  {
    id: "tt1375666",
    title: "Inception",
    posterPath: "/placeholder.svg?height=100&width=70",
    rating: 8.8,
    year: "2010",
    type: "movie",
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    posterPath: "/placeholder.svg?height=100&width=70",
    rating: 8.6,
    year: "2014",
    type: "movie",
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    posterPath: "/placeholder.svg?height=100&width=70",
    rating: 9.0,
    year: "2008",
    type: "movie",
  },
]

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockSearchResults>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Search when query changes
  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsSearching(true)

    // In a real app, this would call an API
    setTimeout(() => {
      // Filter mock results based on query
      const filtered = mockSearchResults.filter((result) =>
        result.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      )

      setSearchResults(filtered)
      setIsSearching(false)
      setShowResults(true)
    }, 300)
  }, [debouncedSearchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/movies?q=${encodeURIComponent(searchQuery)}`)
      setShowResults(false)
    }
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for movies..."
          className="bg-zinc-900 border-zinc-800 rounded-full pr-10"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.trim() && setShowResults(true)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div>
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/movie/${result.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-zinc-800 transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <div className="relative w-12 h-16 flex-shrink-0">
                    <Image
                      src={result.posterPath || "/placeholder.svg"}
                      alt={result.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-sm truncate">{result.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{result.year}</span>
                      <span>•</span>
                      <span className="capitalize">{result.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs">{result.rating.toFixed(1)}</span>
                  </div>
                </Link>
              ))}
              <div className="p-3 border-t border-zinc-800">
                <Link
                  href={`/movies?q=${encodeURIComponent(searchQuery)}`}
                  className="text-teal-500 text-sm hover:underline block text-center"
                  onClick={() => setShowResults(false)}
                >
                  See all results
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

