import { Card } from "@/components/ui/card"
import { AlertTriangle, Thermometer, Wrench, Droplets } from "lucide-react"
import type { Alert } from "@/app/page"

interface CriticalAlertsProps {
  alerts: Alert[]
}

export function CriticalAlerts({ alerts }: CriticalAlertsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "thermometer":
        return <Thermometer className="h-3 w-3" />
      case "wrench":
        return <Wrench className="h-3 w-3" />
      case "droplets":
        return <Droplets className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  return (
    <Card className="tech-border tech-corner bg-card p-4">
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
        <AlertTriangle className="h-4 w-4 text-chart-3" />
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">Critical Alerts</h2>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="rounded-sm bg-secondary/50 p-4 text-center">
            <p className="font-mono text-xs text-muted-foreground">No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-sm border-l-2 p-3 ${
                alert.type === "critical" ? "border-destructive bg-destructive/10" : "border-chart-3 bg-chart-3/10"
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className={alert.type === "critical" ? "text-destructive" : "text-chart-3"}>
                  {getIcon(alert.icon)}
                </span>
                <span
                  className={`font-mono text-xs font-semibold uppercase ${
                    alert.type === "critical" ? "text-destructive" : "text-chart-3"
                  }`}
                >
                  {alert.title}
                </span>
              </div>
              <p className="font-mono text-xs text-foreground">{alert.message}</p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
