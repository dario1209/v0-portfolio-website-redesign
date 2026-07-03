import { PageHeader } from "@/components/page-header"
import { Flame } from "@/components/AerialAccents"
import { ScrollAccent } from "@/components/ScrollAccent"
import styles from "@/components/accents.module.css"

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader section="work" />
      <main className="relative pt-24 px-8">
        <ScrollAccent className={`${styles.accent} ${styles.flame}`}>
          <Flame />
        </ScrollAccent>
        {/* Work content will go here - projects with photo texture */}
      </main>
    </div>
  )
}
