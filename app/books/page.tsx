import type { Metadata } from 'next'
import { getBooks } from '@/lib/cosmic'
import BookCard from '@/components/BookCard'

export const metadata: Metadata = {
  title: 'Books | Picture Book Studio',
  description: 'Browse our collection of whimsical picture books for young readers.',
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal sm:text-5xl">Our Books</h1>
        <p className="mt-4 text-lg text-charcoal/70">A shelf full of stories waiting to be discovered.</p>
      </div>

      {books.length === 0 ? (
        <p className="mt-12 text-center text-charcoal/60">No books available yet. Check back soon!</p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}