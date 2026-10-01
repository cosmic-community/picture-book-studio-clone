import Link from 'next/link'
import type { Book } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function BookCard({ book }: { book: Book }) {
  const subtitle = getMetafieldValue(book.metadata?.subtitle)
  const targetAge = getMetafieldValue(book.metadata?.target_age)
  const trimSize = getMetafieldValue(book.metadata?.trim_size)
  const pageCount = book.metadata?.page_count
  const cover = book.metadata?.cover_image

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-blob bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-lavender-light">
        {cover?.imgix_url ? (
          <img
            src={`${cover.imgix_url}?w=600&h=750&fit=crop&auto=format,compress`}
            alt={book.title}
            width={300}
            height={375}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-6xl">📖</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-xl font-bold text-charcoal">{book.title}</h3>
        {subtitle && <p className="text-sm text-charcoal/60">{subtitle}</p>}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {targetAge && (
            <span className="rounded-full bg-sunshine-light px-3 py-1 text-xs font-semibold text-sunshine-dark">
              Ages {targetAge}
            </span>
          )}
          {trimSize && (
            <span className="rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal-dark">
              {trimSize}
            </span>
          )}
          {typeof pageCount === 'number' && pageCount > 0 && (
            <span className="rounded-full bg-coral-light px-3 py-1 text-xs font-semibold text-coral-dark">
              {pageCount}pp
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}