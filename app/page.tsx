"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
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

  // Close menu when clicking outside
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
        <div className="flex items-center justify-end px-4 py-4">
          <div ref={menuRef} className="relative flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="hover:bg-transparent"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isMenuOpen && (
              <nav className="absolute top-full mt-2 flex flex-col items-center gap-4 py-5 px-8 bg-background/90 backdrop-blur-sm rounded-md border border-border/40">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl text-foreground hover:text-muted-foreground transition-colors whitespace-nowrap"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </header>

      <div className="fixed bottom-6 left-6 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors"
        >
          {theme === "light" ? "Dark" : "Light"}
        </Button>
      </div>
    </div>
  )
}
