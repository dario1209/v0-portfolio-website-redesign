import { PageHeader } from "@/components/page-header"

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
        <div className="flex flex-col md:flex-row gap-20 max-w-6xl">
          {/* Bio left */}
          <div className="flex-1 max-w-xl">
            <ul className="flex flex-col gap-5">
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
          </div>

          {/* Portrait video right */}
          <div className="w-full md:w-72 lg:w-80 shrink-0 md:ml-auto relative md:-mt-8">
            <p
              className="absolute top-4 left-1/2 -translate-x-1/2 text-center text-sm text-white/90 z-10"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Soph + Dario
            </p>
            <video
              src="/portrait.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
