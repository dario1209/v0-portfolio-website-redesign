import { PageHeader } from "@/components/page-header"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] })

const bioLines = [
  "KingDario aka Sophia Spirlock.",
  "Born in Europe, grew up in the US.",
  "Started piano at four, violin at seven. Called a prodigy, gave her first professional recital at ten, with her mom as manager.",
  "Competed internationally, several first and second prizes. Masterclasses with world-renowned pianists throughout her teens.",
  "BSc Physics, M.M in Instrumental Performance (Piano), M.M in Film Composition & Soundtrack.",
  "Principal pianist at SONA Orchestra. 2nd violin at UoA Symphony Orchestra. Hosted \"Music Matters\" on NPR 91.3 KUAF.",
  "Data Viz Analyst at Global People Analytics, Walmart.",
  "Traded and researched crypto markets independently, before getting swept into DeFi summer as a glorious crypto degen, building in crypto ever since, full-stack, across prediction markets, AMMs, governance protocols, appchains.",
  "Fun Facts: Natural redhead, movie buff, DJs and produces electronic music, Legend rank in Hearthstone (mains Warlock and Rogue), fav video games over the years include Portal, Quake, Devil May Cry, Elden Ring, and Fallout, mom to two dobermans, Dario and Reign.",
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
          <div className="w-full md:w-72 lg:w-80 shrink-0 md:ml-auto relative md:sticky md:top-28 md:self-start">
            <p
              className={`absolute top-4 left-1/2 -translate-x-1/2 text-center text-lg text-white font-bold z-10 ${playfair.className}`}
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
 
