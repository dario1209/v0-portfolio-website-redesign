"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

const navLinks = [
  { name: "about", href: "/about" },
  { name: "work", href: "/work" },
  { name: "library", href: "/library" },
  { name: "connect", href: "/connect" },
]

export default function PortfolioPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
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
    <div className="relative min-h-screen transition-colors">
      <AnimatedBackground />

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-end px-5 py-5">
          <div ref={menuRef} className="relative flex flex-col items-center">
            {/* Animated hamburger / X */}
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

            {/* Nav links */}
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

      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 text-sm border border-border rounded-md bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors text-foreground"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  )
}
