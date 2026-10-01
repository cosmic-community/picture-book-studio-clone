export default function BooksLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto h-10 w-48 animate-pulse rounded-full bg-lavender-light" />
      <div className="mx-auto mt-3 h-5 w-72 animate-pulse rounded-full bg-lavender-light" />
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-96 animate-pulse rounded-blob bg-lavender-light" />
        ))}
      </div>
    </div>
  )
}