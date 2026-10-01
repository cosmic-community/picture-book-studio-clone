export default function KeywordTag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-lavender-light px-3 py-1 text-xs font-semibold text-lavender-dark">
      #{label}
    </span>
  )
}