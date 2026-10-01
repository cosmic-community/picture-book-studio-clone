import Link from 'next/link'
import { getBooks, getCharacters } from '@/lib/cosmic'
import BookCard from '@/components/BookCard'
import CharacterCard from '@/components/CharacterCard'

export default async function HomePage() {
  const [books, characters] = await Promise.all([getBooks(), getCharacters()])
  const latestBooks = books.slice(0, 3)
  const featuredCharacters = characters.slice(0, 4)
  const heroBook = books[0]
  const heroCover = heroBook?.metadata?.cover_image

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-light via-cream to-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-block rounded-full bg-sunshine-light px-4 py-1 text-sm font-bold text-sunshine-dark">
              ✨ Picture Book Studio
            </span>
            <h1 className="mt-4 text-4xl font-bold text-charcoal sm:text-5xl lg:text-6xl">
              Storybooks bursting with <span className="text-coral">wonder</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-charcoal/70">
              Whimsical picture books for curious little readers, filled with lovable characters
              and heartwarming adventures.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/books"
                className="rounded-full bg-coral px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-coral-dark"
              >
                Explore Books
              </Link>
              <Link
                href="/characters"
                className="rounded-full bg-white px-6 py-3 font-semibold text-charcoal shadow-soft transition hover:bg-teal-light"
              >
                Meet the Characters
              </Link>
            </div>
          </div>
          {heroCover?.imgix_url && heroBook && (
            <div className="flex justify-center">
              <img
                src={`${heroCover.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
                alt={heroBook.title}
                width={400}
                height={500}
                className="w-full max-w-xs -rotate-3 rounded-blob shadow-soft transition hover:rotate-0"
              />
            </div>
          )}
        </div>
      </section>

      {latestBooks.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-charcoal">Latest Books</h2>
            <Link href="/books" className="font-semibold text-teal-dark hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {featuredCharacters.length > 0 && (
        <section className="bg-teal-light/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold text-charcoal">Featured Characters</h2>
              <Link href="/characters" className="font-semibold text-teal-dark hover:underline">
                View all →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {featuredCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        </section>
      )}

      {latestBooks.length === 0 && featuredCharacters.length === 0 && (
        <section className="mx-auto max-w-3xl px-4 py-24 text-center">
          <span className="text-6xl">📖</span>
          <h2 className="mt-4 text-2xl font-bold text-charcoal">Stories coming soon!</h2>
          <p className="mt-2 text-charcoal/60">
            Add books and characters in Cosmic to see them appear here.
          </p>
        </section>
      )}
    </div>
  )
}