import type { Metadata } from 'next'
import { getCharacters } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export const metadata: Metadata = {
  title: 'Characters | Picture Book Studio',
  description: 'Meet the lovable characters from our picture books.',
}

export default async function CharactersPage() {
  const characters = await getCharacters()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal sm:text-5xl">Meet the Characters</h1>
        <p className="mt-4 text-lg text-charcoal/70">
          Say hello to the friends who bring our stories to life.
        </p>
      </div>

      {characters.length === 0 ? (
        <p className="mt-12 text-center text-charcoal/60">No characters available yet. Check back soon!</p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  )
}