'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-6xl">📚</span>
      <h2 className="text-2xl font-bold text-charcoal">Oops, a page got stuck!</h2>
      <p className="text-charcoal/60">Something went wrong while loading this story.</p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-coral px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-coral-dark"
      >
        Try Again
      </button>
    </div>
  )
}