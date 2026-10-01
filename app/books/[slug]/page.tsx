// app/books/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBookBySlug, getCharactersByBook, getStoryPagesByBook, getMetafieldValue } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'
import KeywordTag from '@/components/KeywordTag'
import FlipbookReader from '@/components/FlipbookReader'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = await getBookBySlug(slug)
  if (!book) {
    return { title: 'Book Not Found | Picture Book Studio' }
  }
  return {
    title: `${book.title} | Picture Book Studio`,
    description: getMetafieldValue(book.metadata?.description) || book.title,
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) {
    notFound()
  }

  const [characters, storyPages] = await Promise.all([
    getCharactersByBook(book.id),
    getStoryPagesByBook(book.id),
  ])

  const subtitle = getMetafieldValue(book.metadata?.subtitle)
  const author = getMetafieldValue(book.metadata?.author_name)
  const description = getMetafieldValue(book.metadata?.description)
  const trimSize = getMetafieldValue(book.metadata?.trim_size)
  const targetAge = getMetafieldValue(book.metadata?.target_age)
  const isbn = getMetafieldValue(book.metadata?.isbn)
  const pageCount = book.metadata?.page_count
  const keywordsRaw = getMetafieldValue(book.metadata?.keywords)
  const keywords = keywordsRaw
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean)
  const cover = book.metadata?.cover_image

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="flex justify-center">
          {cover?.imgix_url ? (
            <img
              src={`${cover.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
              alt={book.title}
              width={400}
              height={500}
              className="w-full max-w-sm rounded-blob shadow-soft"
            />
          ) : (
            <div className="flex h-96 w-full max-w-sm items-center justify-center rounded-blob bg-lavender-light text-6xl shadow-soft">
              📖
            </div>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-charcoal sm:text-5xl">{book.title}</h1>
          {subtitle && <p className="mt-2 text-xl text-teal-dark">{subtitle}</p>}
          {author && <p className="mt-4 text-lg text-charcoal/70">by {author}</p>}

          <div className="mt-6 flex flex-wrap gap-3">
            {targetAge && (
              <span className="rounded-full bg-sunshine-light px-4 py-1 text-sm font-semibold text-sunshine-dark">
                Ages {targetAge}
              </span>
            )}
            {trimSize && (
              <span className="rounded-full bg-teal-light px-4 py-1 text-sm font-semibold text-teal-dark">
                {trimSize} trim
              </span>
            )}
            {typeof pageCount === 'number' && pageCount > 0 && (
              <span className="rounded-full bg-coral-light px-4 py-1 text-sm font-semibold text-coral-dark">
                {pageCount} pages
              </span>
            )}
          </div>

          {description && (
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">{description}</p>
          )}

          {keywords.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <KeywordTag key={keyword} label={keyword} />
              ))}
            </div>
          )}

          {isbn && <p className="mt-6 text-sm text-charcoal/50">ISBN: {isbn}</p>}
        </div>
      </div>

      {characters.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-charcoal">Meet the Characters</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      )}

      {storyPages.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-charcoal">Read a Preview</h2>
          <p className="mt-2 text-charcoal/60">Flip through a few pages of {book.title}</p>
          <div className="mt-6">
            <FlipbookReader storyPages={storyPages} />
          </div>
        </section>
      )}
    </div>
  )
}