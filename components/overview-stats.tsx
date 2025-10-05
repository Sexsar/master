import { Card } from "@/components/ui/card"
import { TrendingUp, Zap } from "lucide-react"

interface OverviewStatsProps {
  totalEfficiency: number
  materialProcessed: number
  carbonProcessed: number
  carbonStored: number
}

export function OverviewStats({
  totalEfficiency,
  materialProcessed,
  carbonProcessed,
  carbonStored,
}: OverviewStatsProps) {
  return (
    <Card className="tech-border tech-corner bg-card p-4">
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">Total Efficiency</h2>{" "}
        {/* Translated heading */}
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-baseline gap-2">
            <span className="font-mono text-4xl font-bold text-primary">{totalEfficiency}</span>
            <span className="font-mono text-xl text-primary">%</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">OVERALL RECYCLING</p> {/* Translated text */}
        </div>

        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">Material Processed</span> {/* Translated label */}
            <span className="font-mono text-sm font-semibold text-foreground">{materialProcessed} kg/day</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">Carbon Processed</span> {/* Translated label */}
            <span className="font-mono text-sm font-semibold text-chart-2">{carbonProcessed}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">Carbon Stored</span> {/* Translated label */}
            <span className="font-mono text-sm font-semibold text-muted-foreground">{carbonStored}%</span>
          </div>
        </div>

        <div className="space-y-2 border-t border-border pt-3">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-3 w-3 text-chart-3" />
            <h3 className="font-mono text-xs font-semibold uppercase text-foreground">Energy Consumed/Module</h3>{" "}
            {/* Translated heading */}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-sm bg-secondary p-2 tech-border">
              <div className="font-mono text-lg font-bold text-chart-3">300</div>
              <div className="font-mono text-[10px] text-muted-foreground">kWh</div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">HABITAT SCIENCE</div>{" "}
              {/* Translated text */}
            </div>
            <div className="rounded-sm bg-secondary p-2 tech-border">
              <div className="font-mono text-lg font-bold text-chart-3">120</div>
              <div className="font-mono text-[10px] text-muted-foreground">kWh</div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">SCIENCE INDUSTRY</div>{" "}
              {/* Translated text */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
