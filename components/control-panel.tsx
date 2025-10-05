"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Settings, Play, RotateCcw } from "lucide-react"
import type { Station } from "@/app/page"

interface ControlPanelProps {
  stations: Station[]
  onUpdateStation: (stationId: number, updates: Partial<Station>) => void
  totalEfficiency: number
  onUpdateTotalEfficiency: (value: number) => void
  materialProcessed: number
  onUpdateMaterialProcessed: (value: number) => void
  carbonProcessed: number
  onUpdateCarbonProcessed: (value: number) => void
}

export function ControlPanel({
  stations,
  onUpdateStation,
  totalEfficiency,
  onUpdateTotalEfficiency,
  materialProcessed,
  onUpdateMaterialProcessed,
  carbonProcessed,
  onUpdateCarbonProcessed,
}: ControlPanelProps) {
  const [selectedStation, setSelectedStation] = useState<number>(1)
  const [isExpanded, setIsExpanded] = useState(true)

  const currentStation = stations.find((s) => s.id === selectedStation)

  const handleEfficiencyChange = (value: number[]) => {
    if (currentStation) {
      onUpdateStation(selectedStation, { efficiency: value[0] })
    }
  }

  const handleTemperatureChange = (value: number[]) => {
    if (currentStation) {
      onUpdateStation(selectedStation, { temperature: value[0] })
    }
  }

  const handleEnergyChange = (value: number[]) => {
    if (currentStation) {
      onUpdateStation(selectedStation, { energyConsumption: value[0] })
    }
  }

  const simulateCriticalFailure = () => {
    if (currentStation) {
      onUpdateStation(selectedStation, {
        efficiency: 45,
        temperature: 85,
        energyConsumption: 500,
      })
    }
  }

  const resetStation = () => {
    if (currentStation) {
      onUpdateStation(selectedStation, {
        efficiency: 92,
        temperature: 45,
        energyConsumption: 300,
      })
    }
  }

  if (!isExpanded) {
    return (
      <Card className="tech-border tech-corner bg-card p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="w-full justify-start gap-2 font-mono text-xs"
        >
          <Settings className="h-4 w-4 text-primary" />
          <span className="uppercase tracking-wider">Show Control Panel</span>
        </Button>
      </Card>
    )
  }

  return (
    <Card className="tech-border tech-corner bg-card p-4">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
            Dynamic Control Panel
          </h2>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
          <span className="font-mono text-xs">Hide</span>
        </Button>
      </div>

      {/* Material and Carbon Processed controls section */}
      <div className="mb-6 rounded-sm border border-primary/30 bg-primary/5 p-4">
        <h3 className="mb-3 font-mono text-xs font-semibold uppercase text-primary">Material & Carbon Controls</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Material Processed Control */}
          <div className="space-y-2">
            <label className="font-mono text-xs font-semibold uppercase text-muted-foreground">
              Material Processed: {materialProcessed} kg/day
            </label>
            <div className="flex items-center gap-2">
              <Slider
                value={[materialProcessed]}
                onValueChange={(value) => onUpdateMaterialProcessed(value[0])}
                min={500}
                max={3000}
                step={50}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>500</span>
              <span className="text-destructive">Alert &lt; 1000</span>
              <span>3000</span>
            </div>
          </div>

          {/* Carbon Processed Control */}
          <div className="space-y-2">
            <label className="font-mono text-xs font-semibold uppercase text-muted-foreground">
              Carbon Processed: {carbonProcessed}%
            </label>
            <div className="flex items-center gap-2">
              <Slider
                value={[carbonProcessed]}
                onValueChange={(value) => onUpdateCarbonProcessed(value[0])}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>0%</span>
              <span className="text-destructive">Alert &lt; 50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Station Selector */}
        <div className="space-y-2">
          <label className="font-mono text-xs font-semibold uppercase text-muted-foreground">Select Station</label>
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(Number(e.target.value))}
            className="w-full rounded-sm border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground tech-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* Efficiency Control */}
        <div className="space-y-2">
          <label className="font-mono text-xs font-semibold uppercase text-muted-foreground">
            Efficiency: {currentStation?.efficiency}%
          </label>
          <div className="flex items-center gap-2">
            <Slider
              value={[currentStation?.efficiency || 0]}
              onValueChange={handleEfficiencyChange}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Temperature Control */}
        <div className="space-y-2">
          <label className="font-mono text-xs font-semibold uppercase text-muted-foreground">
            Temperature: {currentStation?.temperature}°C
          </label>
          <div className="flex items-center gap-2">
            <Slider
              value={[currentStation?.temperature || 0]}
              onValueChange={handleTemperatureChange}
              min={20}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>20°C</span>
            <span>100°C</span>
          </div>
        </div>

        {/* Energy Control */}
        <div className="space-y-2">
          <label className="font-mono text-xs font-semibold uppercase text-muted-foreground">
            Energy: {currentStation?.energyConsumption} kWh
          </label>
          <div className="flex items-center gap-2">
            <Slider
              value={[currentStation?.energyConsumption || 0]}
              onValueChange={handleEnergyChange}
              min={100}
              max={600}
              step={10}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>100</span>
            <span>600</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2 border-t border-border pt-4">
        <Button onClick={simulateCriticalFailure} variant="destructive" size="sm" className="gap-2 font-mono text-xs">
          <Play className="h-3 w-3" />
          Simulate Critical Failure
        </Button>
        <Button onClick={resetStation} variant="outline" size="sm" className="gap-2 font-mono text-xs bg-transparent">
          <RotateCcw className="h-3 w-3" />
          Reset Station
        </Button>
      </div>

      {/* Status Indicator */}
      {currentStation && (
        <div className="mt-4 rounded-sm border-l-4 border-primary bg-secondary/50 p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold uppercase text-foreground">
              Current Status: {currentStation.name}
            </span>
            <span
              className={`rounded-full px-2 py-1 font-mono text-[10px] font-bold uppercase ${
                currentStation.status === "active"
                  ? "bg-chart-2/20 text-chart-2"
                  : currentStation.status === "warning"
                    ? "bg-chart-3/20 text-chart-3"
                    : "bg-destructive/20 text-destructive"
              }`}
            >
              {currentStation.status}
            </span>
          </div>
        </div>
      )}
    </Card>
  )
}
