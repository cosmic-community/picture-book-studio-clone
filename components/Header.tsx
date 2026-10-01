'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/characters', label: 'Characters' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-lavender-light bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-charcoal">
          <span className="text-2xl">📖</span>
          Picture Book Studio
        </Link>

        <nav className="hidden gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-charcoal/70 transition hover:text-coral"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft sm:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <nav className="flex flex-col gap-2 border-t border-lavender-light bg-cream px-4 py-4 sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-3 py-2 font-semibold text-charcoal/80 hover:bg-lavender-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}