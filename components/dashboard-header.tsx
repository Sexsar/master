import { Activity, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/20 tech-border">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground">MONITORING SYSTEM</h1>{" "}
          {/* Translated heading */}
          <p className="font-mono text-sm text-muted-foreground">Recycling Plant - Industrial Sector A</p>{" "}
          {/* Translated subtitle */}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="tech-border">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="tech-border">
          <Settings className="h-4 w-4" />
        </Button>
        <div className="ml-2 flex items-center gap-2 rounded-sm bg-card px-3 py-2 tech-border">
          <div className="h-2 w-2 animate-pulse rounded-full bg-chart-2" />
          <span className="font-mono text-xs text-muted-foreground">SYSTEM ACTIVE</span> {/* Translated text */}
        </div>
      </div>
    </header>
  )
}
