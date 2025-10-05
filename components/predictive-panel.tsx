"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react"
import { useMemo } from "react"

interface PredictivePanelProps {
  materialProcessed: number
  carbonProcessed: number
}

export function PredictivePanel({ materialProcessed, carbonProcessed }: PredictivePanelProps) {
  const productionForecast = useMemo(() => {
    // Optimal thresholds: materialProcessed >= 1500, carbonProcessed >= 70
    const materialRatio = materialProcessed / 1500
    const carbonRatio = carbonProcessed / 70

    // Calculate average performance ratio
    const avgRatio = (materialRatio + carbonRatio) / 2

    // Convert to percentage change from baseline (0% = baseline)
    const forecastPercent = Math.round((avgRatio - 1) * 100)

    return {
      percent: forecastPercent,
      isPositive: forecastPercent >= 0,
    }
  }, [materialProcessed, carbonProcessed])

  const earlyWarnings = useMemo(() => {
    const warnings: Array<{ id: string; message: string; severity: "warning" | "good" }> = []

    if (materialProcessed < 1000) {
      warnings.push({
        id: "material-critical",
        message: "Critical: Material processing rate severely below target",
        severity: "warning",
      })
    } else if (materialProcessed < 1500) {
      warnings.push({
        id: "material-low",
        message: "Material processing rate below optimal threshold",
        severity: "warning",
      })
    }

    if (carbonProcessed < 50) {
      warnings.push({
        id: "carbon-critical",
        message: "Critical: Carbon processing efficiency severely low",
        severity: "warning",
      })
    } else if (carbonProcessed < 70) {
      warnings.push({
        id: "carbon-low",
        message: "Carbon processing efficiency below optimal level",
        severity: "warning",
      })
    }

    // If both are at good levels, show positive message
    if (materialProcessed >= 1500 && carbonProcessed >= 70) {
      warnings.push({
        id: "all-good",
        message: "All systems operating at optimal levels",
        severity: "good",
      })
    }

    return warnings
  }, [materialProcessed, carbonProcessed])

  return (
    <Card className="tech-border tech-corner bg-card p-4">
      <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">Predictive Panel</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-2 font-mono text-xs text-muted-foreground">O₂ PRODUCTION FORECAST (≤48H):</div>
          <div className="flex items-baseline gap-2">
            {productionForecast.isPositive ? (
              <TrendingUp className="h-6 w-6 text-chart-2" />
            ) : (
              <TrendingDown className="h-6 w-6 text-destructive" />
            )}
            <span
              className={`font-mono text-3xl font-bold ${productionForecast.isPositive ? "text-chart-2" : "text-destructive"}`}
            >
              {productionForecast.isPositive ? "+" : ""}
              {productionForecast.percent}
            </span>
            <span
              className={`font-mono text-xl ${productionForecast.isPositive ? "text-chart-2" : "text-destructive"}`}
            >
              %
            </span>
          </div>
        </div>

        <div className="space-y-2 border-t border-border pt-3">
          <div className="font-mono text-xs font-semibold text-foreground">EARLY WARNINGS:</div>

          {earlyWarnings.length === 0 ? (
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-chart-2" />
              <div className="font-mono text-[10px] leading-relaxed text-muted-foreground">
                No warnings - All systems nominal
              </div>
            </div>
          ) : (
            earlyWarnings.map((warning) => (
              <div key={warning.id} className="flex items-start gap-2">
                {warning.severity === "good" ? (
                  <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-chart-2" />
                ) : (
                  <AlertCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-chart-3" />
                )}
                <div
                  className={`font-mono text-[10px] leading-relaxed ${warning.severity === "good" ? "text-chart-2" : "text-muted-foreground"}`}
                >
                  {warning.message}
                </div>
              </div>
            ))
          )}

          {earlyWarnings.some((w) => w.severity === "warning") && (
            <div className="mt-3 rounded-sm bg-primary/10 p-2 tech-border">
              <div className="font-mono text-[10px] font-semibold text-primary">⚠ PREVENTIVE RECOMMENDATION NOW</div>
            </div>
          )}

          {earlyWarnings.every((w) => w.severity === "good") && (
            <div className="mt-3 rounded-sm bg-chart-2/10 p-2 tech-border">
              <div className="font-mono text-[10px] font-semibold text-chart-2">✓ OPTIMAL PERFORMANCE</div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
