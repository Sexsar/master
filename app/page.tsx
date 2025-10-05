"use client"

import { useState, useMemo, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewStats } from "@/components/overview-stats"
import { StationMap } from "@/components/station-map"
import { CriticalAlerts } from "@/components/critical-alerts"
import { PredictivePanel } from "@/components/predictive-panel"
import { ControlPanel } from "@/components/control-panel"

export type StationStatus = "active" | "warning" | "critical"

export interface Station {
  id: number
  name: string
  subtitle: string
  status: StationStatus
  x: number
  y: number
  efficiency: number
  temperature: number
  energyConsumption: number
}

export interface Alert {
  id: string
  type: "critical" | "warning"
  title: string
  message: string
  icon: string
  timestamp: Date
}

export default function RecyclingDashboard() {
  const [totalEfficiency, setTotalEfficiency] = useState(92)
  const [materialProcessed, setMaterialProcessed] = useState(1500)
  const [carbonProcessed, setCarbonProcessed] = useState(78)
  const [carbonStored, setCarbonStored] = useState(22)

  const [stations, setStations] = useState<Station[]>([
    {
      id: 1,
      name: "STATION A",
      subtitle: "",
      status: "active",
      x: 30,
      y: 30,
      efficiency: 95,
      temperature: 45,
      energyConsumption: 300,
    },
    {
      id: 2,
      name: "STATION B",
      subtitle: "",
      status: "active",
      x: 70,
      y: 30,
      efficiency: 92,
      temperature: 42,
      energyConsumption: 280,
    },
    {
      id: 3,
      name: "STATION C",
      subtitle: "",
      status: "active",
      x: 50,
      y: 70,
      efficiency: 88,
      temperature: 48,
      energyConsumption: 320,
    },
  ])

  const currentAlerts = useMemo(() => {
    const alerts: Alert[] = []

    // Check each station for threshold violations
    stations.forEach((station) => {
      if (station.temperature > 70) {
        alerts.push({
          id: `temp-${station.id}`,
          type: "critical",
          title: `Critical Temperature - ${station.name}`,
          message: `Temperature: ${station.temperature}°C`,
          icon: "thermometer",
          timestamp: new Date(),
        })
      }

      if (station.efficiency < 70) {
        alerts.push({
          id: `eff-${station.id}`,
          type: "critical",
          title: `Critical Efficiency - ${station.name}`,
          message: `Efficiency: ${station.efficiency}%`,
          icon: "wrench",
          timestamp: new Date(),
        })
      }
    })

    // Check material processed threshold
    if (materialProcessed < 1000) {
      alerts.push({
        id: "material-low",
        type: "critical",
        title: "Slow process",
        message: `Material Processed: ${materialProcessed} kg/day`,
        icon: "alert",
        timestamp: new Date(),
      })
    }

    // Check carbon processed threshold
    if (carbonProcessed < 50) {
      alerts.push({
        id: "carbon-low",
        type: "critical",
        title: "Precaution - Material processed low",
        message: `Carbon Processed: ${carbonProcessed}%`,
        icon: "alert",
        timestamp: new Date(),
      })
    }

    return alerts
  }, [stations, materialProcessed, carbonProcessed])

  useEffect(() => {
    // Normalize material processed to percentage (baseline: 2000 kg/day = 100%)
    const materialEfficiency = Math.min(100, Math.round((materialProcessed / 2000) * 100))

    // Average of the three metrics
    const overallEfficiency = Math.round((materialEfficiency + carbonProcessed + carbonStored) / 3)

    setTotalEfficiency(overallEfficiency)
  }, [materialProcessed, carbonProcessed, carbonStored])

  const updateStation = (stationId: number, updates: Partial<Station>) => {
    setStations((prev) => {
      const newStations = prev.map((station) => {
        if (station.id === stationId) {
          const updatedStation = { ...station, ...updates }

          let newStatus: StationStatus = "active"
          if (updatedStation.efficiency < 70 || updatedStation.temperature > 70) {
            newStatus = "critical"
          } else if (updatedStation.efficiency < 80 || updatedStation.temperature > 55) {
            newStatus = "warning"
          }

          updatedStation.status = newStatus
          return updatedStation
        }
        return station
      })

      return newStations
    })
  }

  const updateMaterialProcessed = (value: number) => {
    setMaterialProcessed(value)
  }

  const updateCarbonProcessed = (value: number) => {
    setCarbonProcessed(value)
  }

  const updateCarbonStored = (value: number) => {
    setCarbonStored(value)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1800px]">
        <DashboardHeader />

        <div className="mt-6">
          <ControlPanel
            stations={stations}
            onUpdateStation={updateStation}
            totalEfficiency={totalEfficiency}
            onUpdateTotalEfficiency={setTotalEfficiency}
            materialProcessed={materialProcessed}
            onUpdateMaterialProcessed={updateMaterialProcessed}
            carbonProcessed={carbonProcessed}
            onUpdateCarbonProcessed={updateCarbonProcessed}
            carbonStored={carbonStored}
            onUpdateCarbonStored={updateCarbonStored}
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          {/* Left Panel - Stats & Alerts */}
          <div className="space-y-4 lg:col-span-3">
            <OverviewStats
              totalEfficiency={totalEfficiency}
              materialProcessed={materialProcessed}
              carbonProcessed={carbonProcessed}
              carbonStored={carbonStored}
            />
            <CriticalAlerts alerts={currentAlerts} />
          </div>

          {/* Center Panel - Station Map */}
          <div className="lg:col-span-6">
            <StationMap stations={stations} />
          </div>

          {/* Right Panel - Predictions */}
          <div className="space-y-4 lg:col-span-3">
            <PredictivePanel materialProcessed={materialProcessed} carbonProcessed={carbonProcessed} />
          </div>
        </div>
      </div>
    </div>
  )
}
