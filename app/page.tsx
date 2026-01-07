"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu, X } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

const projects = [
  {
    title: "Project Alpha",
    date: "December 2024",
    role: "Design & Dev",
    href: "#",
  },
  {
    title: "Project Beta",
    date: "November 2024",
    role: "Dev",
    collaborator: "Designer Name",
    href: "#",
  },
  {
    title: "Project Gamma",
    date: "October 2024",
    role: "Design & Dev",
    href: "#",
  },
  {
    title: "Project Delta",
    date: "September 2024",
    role: "Dev",
    collaborator: "Designer Name",
    href: "#",
  },
  {
    title: "Project Epsilon",
    date: "August 2024",
    role: "Design & Dev",
    href: "#",
  },
  {
    title: "Project Zeta",
    date: "July 2024",
    role: "Design & Dev",
    href: "#",
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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
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
            <nav className="flex flex-col gap-12">
              <div>
                <h2 className="text-sm font-medium mb-6 text-muted-foreground uppercase tracking-wider">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <Card
                      key={index}
                      className="group border-0 border-t border-border rounded-none p-6 transition-all hover:bg-muted/30 bg-transparent"
                    >
                      <Link href={project.href} className="block">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                          <h3 className="text-xl font-medium group-hover:translate-x-2 transition-transform">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span>{project.date}</span>
                            <span>/</span>
                            <span>{project.role}</span>
                            {project.collaborator && (
                              <>
                                <span>/</span>
                                <span>Design: {project.collaborator}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium mb-6 text-muted-foreground uppercase tracking-wider">Connect</h2>
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
