export default function CharactersLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto h-10 w-64 animate-pulse rounded-full bg-lavender-light" />
      <div className="mx-auto mt-3 h-5 w-80 animate-pulse rounded-full bg-lavender-light" />
      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-blob bg-lavender-light" />
        ))}
      </div>
    </div>
  )
}