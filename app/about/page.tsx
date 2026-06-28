import { PageHeader } from "@/components/page-header"
import { GlitchPortrait } from "@/components/glitch-portrait"

const bioLines = [
  "KingDario AKA Sophia Spirlock.",
  "Born in Europe, grew up in the US.",
  "Started piano at four, violin at seven. Called a prodigy, gave her first professional recital at ten, with her mom as manager.",
  "Competed internationally, several first and second prizes. Masterclasses with world-renowned pianists throughout her teens.",
  "BSc Physics, M.M in Instrumental Performance (Piano), M.M in Film Composition & Soundtrack.",
  "Principal pianist at SONA Orchestra. 2nd violin at UoA Symphony Orchestra. Hosted \"Music Matters\" on NPR 91.3 KUAF.",
  "Data Viz Analyst at Global People Analytics, Walmart.",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader section="about" />
      <main className="pt-28 px-8 pb-16">
        <div className="flex flex-col md:flex-row gap-16 max-w-5xl">
          {/* Bio left */}
          <div className="flex-1">
            <ul className="flex flex-col gap-5">
              {bioLines.map((line, i) => (
                <li
                  key={i}
                  className={`text-lg leading-relaxed ${
                    line === "Burned out. Needed a reset."
                      ? "text-muted-foreground italic"
                      : "text-foreground"
                  }`}
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Portrait right */}
          <div className="w-full md:w-80 lg:w-96 shrink-0 h-[520px]">
            <GlitchPortrait src="/public/portrait.png" />
          </div>
        </div>
      </main>
    </div>
  )
}
