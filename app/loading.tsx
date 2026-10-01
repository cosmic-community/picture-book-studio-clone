export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-lavender-light border-t-coral" />
        <p className="font-semibold text-charcoal/60">Turning the pages...</p>
      </div>
    </div>
  )
}