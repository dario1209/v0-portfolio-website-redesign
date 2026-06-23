import { PageHeader } from "@/components/page-header"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader section="library" />
      <main className="pt-24 px-8">
        {/* Library content will go here - curated readings */}
      </main>
    </div>
  )
}
