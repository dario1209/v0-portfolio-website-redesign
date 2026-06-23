"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

const navLinks = [
  { name: "about", href: "/about" },
  { name: "work", href: "/work" },
  { name: "library", href: "/library" },
  { name: "connect", href: "/connect" },
]

export function PageHeader({ section }: { section: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Instrument Serif if not already present
    if (!document.querySelector('link[href*="Instrument+Serif"]')) {
      const link = document.createElement("link")
      link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap"
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-8 py-5">
        {/* Left: KingDario · section */}
        <Link
          href="/"
          className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors font-bold"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span className="text-3xl sm:text-4xl">KingDario</span>
          <span className="text-3xl sm:text-4xl">•</span>
          <span className="text-3xl sm:text-4xl">{section}</span>
        </Link>

        {/* Right: Hamburger */}
        <div ref={menuRef} className="relative flex flex-col items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="relative w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer z-10"
          >
            <span
              className="block absolute w-6 h-[1.5px] bg-foreground transition-all duration-400"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isMenuOpen
                  ? "rotate(45deg) translateY(0)"
                  : "rotate(0) translateY(-4px)",
              }}
            />
            <span
              className="block absolute w-6 h-[1.5px] bg-foreground transition-all duration-400"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block absolute w-6 h-[1.5px] bg-foreground transition-all duration-400"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isMenuOpen
                  ? "rotate(-45deg) translateY(0)"
                  : "rotate(0) translateY(4px)",
              }}
            />
          </button>

          <nav
            className="absolute top-full right-1/2 translate-x-1/2 mt-4 flex flex-col items-center gap-4"
            style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-foreground hover:text-muted-foreground whitespace-nowrap"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(-12px)",
                  transition: isMenuOpen
                    ? `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07 + 0.1}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07 + 0.1}s`
                    : `opacity 0.2s ease ${(navLinks.length - 1 - i) * 0.03}s, transform 0.2s ease ${(navLinks.length - 1 - i) * 0.03}s`,
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
