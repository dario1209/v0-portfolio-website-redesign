import { PageHeader } from "@/components/page-header"

const bioLines = [
  "KingDario, AKA Sophia Spirlock.",
  "Born in Europe, grew up in the US.",
  "Started piano at four, violin at seven. Called a prodigy, gave her first professional recital at ten, with her mom as manager.",
  "Competed internationally, several first and second prizes. Masterclasses with world-renowned pianists throughout her teens.",
  "Principal pianist at SONA Orchestra. 2nd violin at UoA Symphony Orchestra. Hosted \"Music Matters\" on NPR 91.3 KUAF.",
  "BSc Physics, M.M in Instrumental Performance (Piano), M.M in Film Composition & Soundtrack.",
  "Burned out. Needed a reset.",
  "Data Viz Analyst at Global People Analytics, Walmart.",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader section="about" />
      <main className="pt-28 px-8 max-w-2xl">
        <ul className="flex flex-col gap-4">
          {bioLines.map((line, i) => (
            <li
              key={i}
              className="text-lg leading-relaxed text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {line}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
