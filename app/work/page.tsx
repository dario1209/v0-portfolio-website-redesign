import { PageHeader } from "@/components/page-header"

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader section="work" />
      <main className="pt-24 px-8">
        {/* Work content will go here - projects with photo texture */}
      </main>
    </div>
  )
}
