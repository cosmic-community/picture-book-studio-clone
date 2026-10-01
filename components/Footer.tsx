export default function Footer() {
  return (
    <footer className="border-t border-lavender-light bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-charcoal/60">
          © {new Date().getFullYear()} Picture Book Studio. Made with ✨ for curious readers.
        </p>
        <p className="text-sm text-charcoal/60">Independently published on Amazon KDP.</p>
      </div>
    </footer>
  )
}