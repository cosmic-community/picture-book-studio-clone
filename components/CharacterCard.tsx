import Link from 'next/link'
import type { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CharacterCard({ character }: { character: Character }) {
  const role = getMetafieldValue(character.metadata?.role)
  const image = character.metadata?.character_image

  return (
    <Link
      href={`/characters/${character.slug}`}
      className="group flex flex-col items-center rounded-blob bg-white p-4 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-sunshine-light sm:h-28 sm:w-28">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
            alt={character.title}
            width={150}
            height={150}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-4xl">🦊</span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-bold text-charcoal">{character.title}</h3>
      {role && <p className="text-sm text-teal-dark">{role}</p>}
    </Link>
  )
}