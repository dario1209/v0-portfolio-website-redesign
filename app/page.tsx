"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

const menuSections = [
  {
    title: "about",
    content: "Add your bio and information here.",
  },
  {
    title: "work",
    content: "Add your portfolio projects and work experience here.",
  },
]

const socialLinks = [
  { name: "X (Twitter)", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "GitHub", href: "#" },
]

export default function PortfolioPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title)
  }

  return (
    <div className="relative min-h-screen transition-colors">
      <AnimatedBackground />

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center justify-end px-6 py-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="hover:bg-transparent"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg overflow-y-auto">
          <div className="container mx-auto px-6 pt-24 pb-12 min-h-screen">
            <nav className="flex flex-col gap-6">
              {menuSections.map((section, index) => (
                <div key={index} className="border-b border-border pb-6">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <h2 className="text-4xl font-['Instrument_Serif'] transition-colors group-hover:text-muted-foreground">
                      {section.title}
                    </h2>
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${
                        expandedSection === section.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedSection === section.title && (
                    <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-lg text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="border-b border-border pb-6">
                <button
                  onClick={() => toggleSection("connect")}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h2 className="text-4xl font-['Instrument_Serif'] transition-colors group-hover:text-muted-foreground">
                    connect
                  </h2>
                  <ChevronDown
                    className={`h-6 w-6 transition-transform ${expandedSection === "connect" ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedSection === "connect" && (
                  <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col gap-4">
                      {socialLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="text-xl flex items-center gap-2 text-foreground hover:text-muted-foreground hover:translate-x-2 transition-all w-fit"
                        >
                          {link.name}
                          <span className="text-sm">↗</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

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
