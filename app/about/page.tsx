import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader section="about" />
      <main className="pt-24 px-8">
        {/* About content will go here - data visualization bio */}
      </main>
    </div>
  )
}
