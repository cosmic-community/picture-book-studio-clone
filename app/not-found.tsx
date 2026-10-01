import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-7xl">🧭</span>
      <h1 className="text-3xl font-bold text-charcoal">Page not found</h1>
      <p className="text-charcoal/60">This page must have wandered off into another story.</p>
      <Link
        href="/"
        className="rounded-full bg-coral px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-coral-dark"
      >
        Back to Home
      </Link>
    </div>
  )
}