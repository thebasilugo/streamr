import Link from "next/link"
import MovieCard from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import GenreFilter from "@/components/genre-filter"
import TypeToggle from "@/components/type-toggle"
import RatingFilter from "@/components/rating-filter"
import SearchBar from "@/components/search-bar"

// Mock movie data with overviews
const featuredMovies = [
  {
    id: "tt1375666",
    title: "Inception",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.8,
    year: "2010",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.6,
    year: "2014",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "tt6723592",
    title: "Tenet",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 7.4,
    year: "2020",
    overview:
      "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
  },
  {
    id: "tt1345836",
    title: "The Dark Knight Rises",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.4,
    year: "2012",
    overview:
      "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.",
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.0,
    year: "2008",
    overview:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: "tt0110912",
    title: "Pulp Fiction",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.9,
    year: "1994",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: "tt0137523",
    title: "Fight Club",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.8,
    year: "1999",
    overview:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
  },
  {
    id: "tt0109830",
    title: "Forrest Gump",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.8,
    year: "1994",
    overview:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
  },
]

const recommendedMovies = [
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.3,
    year: "1994",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: "tt0068646",
    title: "The Godfather",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.2,
    year: "1972",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: "tt0071562",
    title: "The Godfather: Part II",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.0,
    year: "1974",
    overview:
      "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
  },
  {
    id: "tt0050083",
    title: "12 Angry Men",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.0,
    year: "1957",
    overview:
      "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
  },
  {
    id: "tt0108052",
    title: "Schindler's List",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.0,
    year: "1993",
    overview:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
  },
  {
    id: "tt0167260",
    title: "The Lord of the Rings: The Return of the King",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.0,
    year: "2003",
    overview:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
  },
  {
    id: "tt0120737",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.8,
    year: "2001",
    overview:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    id: "tt0133093",
    title: "The Matrix",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.7,
    year: "1999",
    overview:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
]

const topSeries = [
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
    id: "tt0455275",
    title: "Prison Break",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.3,
    year: "2005-2017",
    type: "series",
    overview:
      "Due to a political conspiracy, an innocent man is sent to death row and his only hope is his brother, who makes it his mission to deliberately get himself sent to the same prison in order to break the both of them out.",
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
  {
    id: "tt0386676",
    title: "The Office",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.0,
    year: "2005-2013",
    type: "series",
    overview:
      "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
  },
  {
    id: "tt2442560",
    title: "Peaky Blinders",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 8.8,
    year: "2013-2022",
    type: "series",
    overview:
      "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
  },
  {
    id: "tt0141842",
    title: "The Sopranos",
    posterPath: "/placeholder.svg?height=450&width=300",
    rating: 9.2,
    year: "1999-2007",
    type: "series",
    overview:
      "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state, leading him to seek professional psychiatric counseling.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-teal-500">
            StreamR
          </Link>
          <div className="relative max-w-md w-full hidden md:block">
            <SearchBar />
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-teal-500 text-white hover:bg-teal-500/20">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="md:hidden mb-6">
          <SearchBar />
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/4 lg:w-1/5">
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

              <Link href="/movies">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Browse All</Button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-3/4 lg:w-4/5">
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Movies</h2>
                <Link href="/movies" className="text-teal-500 text-sm hover:underline">
                  See more
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {featuredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.posterPath}
                    rating={movie.rating}
                    year={movie.year}
                    overview={movie.overview}
                  />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Recommended For You</h2>
                <Link href="/recommended" className="text-teal-500 text-sm hover:underline">
                  See more
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {recommendedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.posterPath}
                    rating={movie.rating}
                    year={movie.year}
                    overview={movie.overview}
                  />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Top Rated Series</h2>
                <Link href="/series" className="text-teal-500 text-sm hover:underline">
                  See more
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {topSeries.map((series) => (
                  <MovieCard
                    key={series.id}
                    id={series.id}
                    title={series.title}
                    posterPath={series.posterPath}
                    rating={series.rating}
                    year={series.year}
                    type="series"
                    overview={series.overview}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-zinc-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-4">© 2025 StreamR. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

