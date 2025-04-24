"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Play, Star, Share2, Copy, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RatingInput from "@/components/rating-input"
import { useAuth } from "@/lib/auth-context"
import LoginPrompt from "@/components/login-prompt"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface MovieDetails {
  id: string
  title: string
  posterPath: string
  backdropPath: string
  overview: string
  rating: number
  year: string
  director: string
  cast: string[]
  duration: string
  genres: string[]
  type: "movie" | "series"
  language: string
  country: string
  awards?: string
  boxOffice?: string
  production?: string
  writer?: string
  plot?: string
}

export default function MoviePage({ params }: { params: { id: string } }) {
  const [showPlayer, setShowPlayer] = useState(false)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would fetch from OMDB API using the API key
    // For now, we'll use mock data
    const fetchMovie = async () => {
      setLoading(true)

      // Mock data - in a real app, this would come from the OMDB API
      const mockMovie: MovieDetails = {
        id: params.id,
        title: params.id === "tt1375666" ? "Inception" : "Interstellar",
        posterPath: "/placeholder.svg?height=600&width=400",
        backdropPath: "/placeholder.svg?height=1080&width=1920",
        overview:
          "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        plot: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.",
        rating: 8.8,
        year: "2010",
        director: "Christopher Nolan",
        writer: "Christopher Nolan",
        cast: [
          "Leonardo DiCaprio",
          "Joseph Gordon-Levitt",
          "Elliot Page",
          "Tom Hardy",
          "Ken Watanabe",
          "Dileep Rao",
          "Cillian Murphy",
          "Tom Berenger",
          "Marion Cotillard",
          "Michael Caine",
        ],
        duration: "2h 28m",
        genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
        type: "movie",
        language: "English, Japanese, French",
        country: "USA, UK",
        awards: "Won 4 Oscars. 157 wins & 220 nominations total",
        boxOffice: "$292,587,330",
        production: "Warner Bros., Legendary Entertainment, Syncopy",
      }

      setMovie(mockMovie)
      setLoading(false)
    }

    fetchMovie()
  }, [params.id])

  const handleRatingSubmit = (rating: number) => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    setUserRating(rating)
    // In a real app, you would send this to your API
  }

  const handleDownload = () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    // Handle download logic here
    toast({
      title: "Download started",
      description: `${movie?.title} is being downloaded.`,
    })
  }

  const handleWatchNow = () => {
    setShowPlayer(true)
  }

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "Movie link copied to clipboard",
    })
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(`Check out ${movie?.title} on StreamR`)

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p>Loading movie details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="relative">
        {/* Backdrop image with overlay */}
        <div className="relative h-[50vh] w-full">
          <Image
            src={movie.backdropPath || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-black/70">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Share button */}
        <div className="absolute top-6 right-6 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-black/70">
                <Share2 className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
              <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
                <Facebook className="mr-2 h-4 w-4" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
                <Twitter className="mr-2 h-4 w-4" />
                <span>Twitter</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
                <Linkedin className="mr-2 h-4 w-4" />
                <span>LinkedIn</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Movie info */}
        <div className="container mx-auto px-4 relative -mt-40 z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
                <Image src={movie.posterPath || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                {movie.type === "series" && (
                  <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">Series</div>
                )}
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{movie.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-zinc-800 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 mb-8">{movie.plot || movie.overview}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white" size="lg" onClick={handleWatchNow}>
                  <Play className="mr-2 h-5 w-5" /> Watch Now
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                  size="lg"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-5 w-5" /> Download
                </Button>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Rate this movie</h3>
                <RatingInput onRatingSubmit={handleRatingSubmit} currentRating={userRating} />
                {userRating && <p className="mt-2 text-teal-500">Thanks for rating!</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="details">
          <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Movie Info</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-gray-400">Director</span>
                    <span>{movie.director}</span>
                  </div>
                  {movie.writer && (
                    <div className="flex">
                      <span className="w-32 text-gray-400">Writer</span>
                      <span>{movie.writer}</span>
                    </div>
                  )}
                  <div className="flex">
                    <span className="w-32 text-gray-400">Release Date</span>
                    <span>July 16, 2010</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-400">Runtime</span>
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-400">Language</span>
                    <span>{movie.language}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-gray-400">Country</span>
                    <span>{movie.country}</span>
                  </div>
                  {movie.awards && (
                    <div className="flex">
                      <span className="w-32 text-gray-400">Awards</span>
                      <span>{movie.awards}</span>
                    </div>
                  )}
                  {movie.boxOffice && (
                    <div className="flex">
                      <span className="w-32 text-gray-400">Box Office</span>
                      <span>{movie.boxOffice}</span>
                    </div>
                  )}
                  {movie.production && (
                    <div className="flex">
                      <span className="w-32 text-gray-400">Production</span>
                      <span>{movie.production}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Ratings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">IMDb</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{(movie.rating - 0.2).toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Rotten Tomatoes</span>
                    <div className="flex items-center gap-1">
                      <span className="text-red-500 font-medium">{Math.round(movie.rating * 10)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Metacritic</span>
                    <div className="flex items-center gap-1">
                      <span className="text-green-500 font-medium">{Math.round(movie.rating * 8)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">StreamR Users</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{(movie.rating + 0.1).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="cast" className="py-6">
            <h3 className="text-xl font-semibold mb-6">Cast & Crew</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.cast.map((actor) => (
                <div key={actor} className="text-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden mb-2 mx-auto">
                    <Image src="/placeholder.svg?height=200&width=200" alt={actor} fill className="object-cover" />
                  </div>
                  <h4 className="font-medium">{actor}</h4>
                  <p className="text-sm text-gray-400">Character Name</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">User Reviews</h3>
              {user ? (
                <Button className="bg-teal-600 hover:bg-teal-700">Write a Review</Button>
              ) : (
                <Button onClick={() => setShowLoginPrompt(true)} className="bg-teal-600 hover:bg-teal-700">
                  Write a Review
                </Button>
              )}
            </div>
            <div className="space-y-6">
              <div className="bg-zinc-900 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40" alt="User" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <Star className="h-3 w-3 text-gray-500" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">2 days ago</span>
                </div>
                <p className="text-gray-300">
                  A mind-bending thriller that keeps you on the edge of your seat. Christopher Nolan has done it again
                  with this masterpiece of cinema.
                </p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src="/placeholder.svg?height=40&width=40" alt="User" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium">Jane Smith</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <Star className="h-3 w-3 text-gray-500" />
                      <Star className="h-3 w-3 text-gray-500" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">1 week ago</span>
                </div>
                <p className="text-gray-300">
                  The concept is interesting but the execution is confusing. I found myself lost in the plot multiple
                  times.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Player Modal */}
      {showPlayer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full"
              onClick={() => setShowPlayer(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <video
              controls
              autoPlay
              className="w-full h-full"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      <LoginPrompt
        open={showLoginPrompt}
        onOpenChange={setShowLoginPrompt}
        message="You need to be logged in to perform this action."
      />
    </div>
  )
}

