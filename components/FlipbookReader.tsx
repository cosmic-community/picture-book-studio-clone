'use client'

import { useState } from 'react'
import type { StoryPage } from '@/types'
import { getMetafieldValue } from '@/lib/utils'

interface FlipbookReaderProps {
  storyPages: StoryPage[]
}

export default function FlipbookReader({ storyPages }: FlipbookReaderProps) {
  const [index, setIndex] = useState(0)

  if (!storyPages || storyPages.length === 0) {
    return null
  }

  const currentPage = storyPages[index]

  if (!currentPage) {
    return null
  }

  const layout = getMetafieldValue(currentPage.metadata?.layout) || 'Text + Illustration'
  const storyText = getMetafieldValue(currentPage.metadata?.story_text)
  const illustration = currentPage.metadata?.illustration
  const illustrationNotes = getMetafieldValue(currentPage.metadata?.illustration_notes)
  const pageNumber = currentPage.metadata?.page_number ?? index + 1

  const goPrev = () => setIndex((i) => Math.max(0, i - 1))
  const goNext = () => setIndex((i) => Math.min(storyPages.length - 1, i + 1))

  return (
    <div className="overflow-hidden rounded-blob bg-white shadow-soft">
      <div className="min-h-[400px] p-6 sm:p-10">
        {layout === 'Full Illustration' && illustration?.imgix_url && (
          <div className="flex justify-center">
            <img
              src={`${illustration.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
              alt={illustrationNotes || `Page ${pageNumber} illustration`}
              width={600}
              height={450}
              className="max-h-[500px] w-full rounded-3xl object-cover"
            />
          </div>
        )}

        {layout === 'Text Only' && (
          <div className="flex min-h-[350px] items-center justify-center">
            <p className="max-w-xl text-center text-2xl font-medium leading-relaxed text-charcoal">
              {storyText || 'Once upon a time...'}
            </p>
          </div>
        )}

        {layout !== 'Full Illustration' && layout !== 'Text Only' && (
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {illustration?.imgix_url && (
              <img
                src={`${illustration.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={illustrationNotes || `Page ${pageNumber} illustration`}
                width={400}
                height={400}
                className="w-full rounded-3xl object-cover"
              />
            )}
            <p className="text-xl leading-relaxed text-charcoal">{storyText}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-lavender-light bg-lavender-light/40 px-6 py-4">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-charcoal shadow-soft disabled:opacity-40"
        >
          ← Prev
        </button>
        <div className="flex items-center gap-2">
          {storyPages.map((page, i) => (
            <span
              key={page.id}
              className={`h-2 w-2 rounded-full ${i === index ? 'bg-coral' : 'bg-lavender'}`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-charcoal/60">Page {pageNumber}</span>
        <button
          onClick={goNext}
          disabled={index === storyPages.length - 1}
          className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white shadow-soft disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}