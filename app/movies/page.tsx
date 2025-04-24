"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/movie-card"
import GenreFilter from "@/components/genre-filter"
import TypeToggle from "@/components/type-toggle"
import RatingFilter from "@/components/rating-filter"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock movie data
const mockMovies = [
  {
    id: "tt1375666",
    title: "Inception",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.8,
    year: "2010",
    type: "movie",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.6,
    year: "2014",
    type: "movie",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.0,
    year: "2008",
    type: "movie",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: "tt0110912",
    title: "Pulp Fiction",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.9,
    year: "1994",
    type: "movie",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.3,
    year: "1994",
    type: "movie",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: "tt0068646",
    title: "The Godfather",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.2,
    year: "1972",
    type: "movie",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: "tt0903747",
    title: "Breaking Bad",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.5,
    year: "2008-2013",
    type: "series",
    overview:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
  },
  {
    id: "tt0944947",
    title: "Game of Thrones",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.2,
    year: "2011-2019",
    type: "series",
    overview:
      "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
  },
  {
    id: "tt0108778",
    title: "Friends",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.9,
    year: "1994-2004",
    type: "series",
    overview:
      "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
  },
  {
    id: "tt1475582",
    title: "Sherlock",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.1,
    year: "2010-2017",
    type: "series",
    overview: "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
  },
]

export default function MoviesPage() {
  const searchParams = useSearchParams()
  const [movies, setMovies] = useState(mockMovies)
  const [filteredMovies, setFilteredMovies] = useState(mockMovies)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
  const [isLoading, setIsLoading] = useState(false)

  // Get initial query from URL if present
  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Filter movies based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredMovies(movies)
      return
    }

    const lowerCaseQuery = searchQuery.toLowerCase()
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerCaseQuery) || movie.overview.toLowerCase().includes(lowerCaseQuery),
    )

    setFilteredMovies(filtered)
  }, [searchQuery, movies])

  // Sort movies
  useEffect(() => {
    const sorted = [...filteredMovies]

    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "year":
        sorted.sort((a, b) => {
          // Handle series with year ranges
          const yearA = a.year.split("-")[0]
          const yearB = b.year.split("-")[0]
          return Number.parseInt(yearB) - Number.parseInt(yearA)
        })
        break
      case "popularity":
      default:
        // Keep the default order (mock popularity)
        break
    }

    setFilteredMovies(sorted)
  }, [sortBy])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const applyFilters = (type: string, genres: string[], minRating: number) => {
    setIsLoading(true)

    // In a real app, this would call an API with the filters
    setTimeout(() => {
      let filtered = [...movies]

      // Filter by type
      if (type !== "all") {
        filtered = filtered.filter((movie) => movie.type === type)
      }

      // Filter by minimum rating
      if (minRating > 0) {
        filtered = filtered.filter((movie) => movie.rating >= minRating)
      }

      // Filter by genres (would work with real data)
      if (genres.length > 0) {
        // This is a mock implementation since our mock data doesn't have genre arrays
        // In a real app, this would filter by genres
      }

      setFilteredMovies(filtered)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Movies & TV Shows</h1>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-1/4 lg:w-1/5">
            <div className="bg-zinc-900 rounded-lg p-4 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Type</h4>
                <TypeToggle />
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Genres</h4>
                <GenreFilter />
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Rating</h4>
                <RatingFilter />
              </div>

              <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => applyFilters("all", [], 0)}>
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-zinc-900 text-white border-zinc-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Filters</SheetTitle>
                  <SheetDescription className="text-gray-400">
                    Apply filters to find exactly what you're looking for.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Type</h4>
                    <TypeToggle />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Genres</h4>
                    <GenreFilter />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Rating</h4>
                    <RatingFilter />
                  </div>

                  <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => applyFilters("all", [], 0)}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Input
                  type="search"
                  placeholder="Search movies and TV shows..."
                  className="bg-zinc-900 border-zinc-800 rounded-lg pr-10 py-2"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <div className="w-full sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="year">Release Year</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p>Loading...</p>
              </div>
            ) : filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.posterPath}
                    rating={movie.rating}
                    year={movie.year}
                    type={movie.type as "movie" | "series"}
                    overview={movie.overview}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No results found. Try a different search term or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

