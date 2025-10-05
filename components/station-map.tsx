"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"
import type { Station } from "@/app/page"

interface StationMapProps {
  stations: Station[]
}

export function StationMap({ stations }: StationMapProps) {
  return (
    <Card className="tech-border tech-corner bg-card p-4">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">Station Map</h2>
        <div className="flex gap-3 font-mono text-[10px]">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">ACTIVE</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-chart-3" />
            <span className="text-muted-foreground">WARNING</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground">CRITICAL</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary/30 tech-border">
        {/* Background grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(oklch(0.65 0.15 200 / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.65 0.15 200 / 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        />

        <svg className="absolute inset-0 h-full w-full">
          <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="oklch(0.65 0.15 200 / 0.3)" strokeWidth="2" />
          <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="oklch(0.65 0.15 200 / 0.3)" strokeWidth="2" />
          <line x1="50%" y1="70%" x2="50%" y2="50%" stroke="oklch(0.65 0.15 200 / 0.3)" strokeWidth="2" />
        </svg>

        {/* Central hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary/30 tech-border">
              <div className="h-12 w-12 rounded-full bg-primary/50 tech-border" />
            </div>
          </div>
        </div>

        {stations.map((station) => (
          <div
            key={station.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${station.x}%`, top: `${station.y}%` }}
          >
            <div className="group relative">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full tech-border transition-all ${
                  station.status === "active"
                    ? "bg-chart-2/30"
                    : station.status === "warning"
                      ? "bg-chart-3/30 animate-pulse"
                      : "bg-destructive/30 animate-pulse"
                }`}
              >
                {station.status === "active" && <CheckCircle2 className="h-5 w-5 text-chart-2" />}
                {station.status === "warning" && <AlertCircle className="h-5 w-5 text-chart-3" />}
                {station.status === "critical" && <XCircle className="h-5 w-5 text-destructive" />}
              </div>

              <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-card px-3 py-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 tech-border">
                <div className="font-mono text-xs font-semibold text-foreground">{station.name}</div>
                {station.subtitle && (
                  <div className="font-mono text-[10px] text-muted-foreground">{station.subtitle}</div>
                )}
                <div className="mt-1 space-y-0.5 border-t border-border pt-1">
                  <div className="font-mono text-[10px] text-muted-foreground">
                    Efficiency: <span className="font-semibold text-foreground">{station.efficiency}%</span>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    Temp: <span className="font-semibold text-foreground">{station.temperature}°C</span>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    Energy: <span className="font-semibold text-foreground">{station.energyConsumption} kWh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
