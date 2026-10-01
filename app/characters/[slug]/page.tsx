// app/characters/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCharacterBySlug, getMetafieldValue } from '@/lib/cosmic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const character = await getCharacterBySlug(slug)
  if (!character) {
    return { title: 'Character Not Found | Picture Book Studio' }
  }
  return {
    title: `${character.title} | Picture Book Studio`,
    description: getMetafieldValue(character.metadata?.description) || character.title,
  }
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const character = await getCharacterBySlug(slug)

  if (!character) {
    notFound()
  }

  const role = getMetafieldValue(character.metadata?.role)
  const description = getMetafieldValue(character.metadata?.description)
  const image = character.metadata?.character_image
  const book = character.metadata?.book

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full bg-sunshine-light shadow-soft">
          {image?.imgix_url ? (
            <img
              src={`${image.imgix_url}?w=500&h=500&fit=crop&auto=format,compress`}
              alt={character.title}
              width={250}
              height={250}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-7xl">🦊</span>
          )}
        </div>
        <h1 className="mt-6 text-4xl font-bold text-charcoal">{character.title}</h1>
        {role && (
          <span className="mt-2 rounded-full bg-teal-light px-4 py-1 text-sm font-semibold text-teal-dark">
            {role}
          </span>
        )}
        {description && (
          <p className="mt-6 text-lg leading-relaxed text-charcoal/80">{description}</p>
        )}

        {book?.slug && (
          <Link
            href={`/books/${book.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-coral-dark"
          >
            📖 Appears in {book.title}
          </Link>
        )}
      </div>
    </div>
  )
}