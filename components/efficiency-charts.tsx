"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"

const temporalData = [
  { time: "0", value: 85 },
  { time: "4", value: 87 },
  { time: "8", value: 89 },
  { time: "12", value: 91 },
  { time: "16", value: 88 },
  { time: "20", value: 92 },
  { time: "24", value: 94 },
]

const energyData = [
  { time: "0", value: 320 },
  { time: "4", value: 280 },
  { time: "8", value: 350 },
  { time: "12", value: 380 },
  { time: "16", value: 340 },
  { time: "20", value: 310 },
  { time: "24", value: 290 },
]

const predictiveData = [
  { station: "A", value: 45 },
  { station: "B", value: 62 },
  { station: "C", value: 78 },
  { station: "D", value: 85 },
  { station: "E", value: 92 },
  { station: "F", value: 88 },
  { station: "G", value: 95 },
]

export function EfficiencyCharts() {
  return (
    <div className="space-y-4">
      <Card className="tech-border tech-corner bg-card p-4">
        <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
          <div className="h-2 w-2 rounded-full bg-chart-2" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            Temporal Trends {/* Translated heading */}
          </h3>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temporalData}>
              <XAxis
                dataKey="time"
                stroke="oklch(0.55 0.05 200)"
                style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }}
              />
              <YAxis stroke="oklch(0.55 0.05 200)" style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }} />
              <Line type="monotone" dataKey="value" stroke="oklch(0.75 0.12 160)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 font-mono text-[10px] text-muted-foreground">Efficiency last 24h</div>{" "}
        {/* Translated caption */}
      </Card>

      <Card className="tech-border tech-corner bg-card p-4">
        <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
          <div className="h-2 w-2 rounded-full bg-chart-3" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            Energy: Last Week {/* Translated heading */}
          </h3>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={energyData}>
              <XAxis
                dataKey="time"
                stroke="oklch(0.55 0.05 200)"
                style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }}
              />
              <YAxis stroke="oklch(0.55 0.05 200)" style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }} />
              <Line type="monotone" dataKey="value" stroke="oklch(0.85 0.15 85)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 font-mono text-[10px] text-muted-foreground">Average kWh consumption</div>{" "}
        {/* Translated caption */}
      </Card>

      <Card className="tech-border tech-corner bg-card p-4">
        <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            Predictive Analysis {/* Translated heading */}
          </h3>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={predictiveData}>
              <XAxis
                dataKey="station"
                stroke="oklch(0.55 0.05 200)"
                style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }}
              />
              <YAxis stroke="oklch(0.55 0.05 200)" style={{ fontSize: "10px", fontFamily: "var(--font-mono)" }} />
              <Bar dataKey="value" fill="oklch(0.65 0.15 200)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 font-mono text-[10px] text-muted-foreground">Performance by station</div>{" "}
        {/* Translated caption */}
      </Card>
    </div>
  )
}
