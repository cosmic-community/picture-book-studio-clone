import { createBucketClient } from '@cosmicjs/sdk'
import { getCosmic } from '@/lib/cosmic-preview'
import type { Book, StoryPage, Character } from '@/types'
import { getMetafieldValue } from '@/lib/utils'

export { getMetafieldValue }

// Write client kept available for potential mutations (not used for reads).
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

const BOOK_PROPS = ['id', 'slug', 'title', 'metadata', 'type', 'created_at', 'modified_at']
const STORY_PAGE_PROPS = ['id', 'slug', 'title', 'metadata', 'type', 'created_at', 'modified_at']
const CHARACTER_PROPS = ['id', 'slug', 'title', 'metadata', 'type', 'created_at', 'modified_at']

export async function getBooks(): Promise<Book[]> {
  const { cosmic: client, previewToken } = await getCosmic()
  try {
    const query = client.objects.find({ type: 'books' }).props(BOOK_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    const books = response.objects as Book[]
    return [...books].sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime()
      const dateB = new Date(b.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch books')
  }
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const { cosmic: client, previewToken } = await getCosmic()
  try {
    const query = client.objects.findOne({ type: 'books', slug }).props(BOOK_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Book) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch book')
  }
}

export async function getStoryPagesByBook(bookId: string): Promise<StoryPage[]> {
  const { cosmic: client, previewToken } = await getCosmic()
  try {
    const query = client.objects
      .find({ type: 'story-pages', 'metadata.book': bookId })
      .props(STORY_PAGE_PROPS)
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const pages = response.objects as StoryPage[]
    return [...pages].sort((a, b) => {
      const pageA = a.metadata?.page_number ?? 0
      const pageB = b.metadata?.page_number ?? 0
      return pageA - pageB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch story pages')
  }
}

export async function getCharactersByBook(bookId: string): Promise<Character[]> {
  const { cosmic: client, previewToken } = await getCosmic()
  try {
    const query = client.objects
      .find({ type: 'characters', 'metadata.book': bookId })
      .props(CHARACTER_PROPS)
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Character[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharacters(): Promise<Character[]> {
  const { cosmic: client, previewToken } = await getCosmic()
  try {
    const query = client.objects.find({ type: 'characters' }).props(CHARACTER_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Character[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  const { cosmic: client, previewToken } = await getCosmic()
  try {
    const query = client.objects.findOne({ type: 'characters', slug }).props(CHARACTER_PROPS).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Character) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch character')
  }
}