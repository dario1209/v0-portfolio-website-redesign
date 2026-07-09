import { PageHeader } from "@/components/page-header"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] })

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader section="connect" />
      <main className="pt-28 px-8 pb-16">
        <div className="flex flex-col md:flex-row gap-20 max-w-6xl">
          {/* Connect content left */}
          <div className="flex-1 max-w-xl">
            {/* Connect content will go here - social links, contact */}
          </div>

          {/* Portrait video right */}
          <div className="w-full md:w-72 lg:w-80 shrink-0 md:ml-auto relative md:sticky md:top-28 md:self-start">
            <p
              className={`absolute top-4 left-1/2 -translate-x-1/2 text-center text-lg text-white font-bold z-10 ${playfair.className}`}
            >
              Soph + Reign
            </p>
            <video
              src="/portrait1.mp4"
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
