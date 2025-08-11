'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Settings, Download, Upload, RotateCcw } from 'lucide-react'
import { useAdaptivePerformance } from '@/hooks/use-adaptive-performance'

interface PerformanceControlsProps {
  isVisible: boolean
  onToggle: () => void
}

export function PerformanceControls({ isVisible, onToggle }: PerformanceControlsProps) {
  const { adaptiveSettings, getPerformanceReport, performanceLevel } = useAdaptivePerformance()
  const [manualOverride, setManualOverride] = useState(false)
  const [customSettings, setCustomSettings] = useState(adaptiveSettings)

  const performanceReport = getPerformanceReport()

  const exportSettings = () => {
    const data = {
      timestamp: new Date().toISOString(),
      performanceReport,
      customSettings: manualOverride ? customSettings : null
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `performance-report-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.customSettings) {
          setCustomSettings(data.customSettings)
          setManualOverride(true)
        }
      } catch (error) {
        console.error('Error importing settings:', error)
      }
    }
    reader.readAsText(file)
  }

  const resetToDefaults = () => {
    setManualOverride(false)
    setCustomSettings(adaptiveSettings)
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50 w-80"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <Card className="bg-gray-900/95 border-gray-700 backdrop-blur-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="h-4 w-4 text-purple-400" />
              Performance Controls
            </CardTitle>
            <Badge className={
              performanceLevel === 'excellent' ? 'bg-green-400/10 text-green-400' :
              performanceLevel === 'good' ? 'bg-blue-400/10 text-blue-400' :
              performanceLevel === 'fair' ? 'bg-yellow-400/10 text-yellow-400' :
              'bg-red-400/10 text-red-400'
            }>
              {performanceLevel}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Performance Summary */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Current FPS</div>
              <div className="font-bold text-lg">{performanceReport.currentFPS}</div>
            </div>
            <div>
              <div className="text-gray-400">Frame Drops</div>
              <div className={`font-bold text-lg ${performanceReport.frameDrops > 10 ? 'text-red-400' : 'text-green-400'}`}>
                {performanceReport.frameDrops}
              </div>
            </div>
          </div>

          {/* Manual Override */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Manual Override</span>
            <Switch
              checked={manualOverride}
              onCheckedChange={setManualOverride}
            />
          </div>

          {/* Custom Settings */}
          {manualOverride && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 border-t border-gray-700 pt-4"
            >
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Particle Count: {customSettings.particleCount}
                </label>
                <Slider
                  value={[customSettings.particleCount]}
                  onValueChange={([value]) => 
                    setCustomSettings(prev => ({ ...prev, particleCount: value }))
                  }
                  max={50}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Animation Duration: {customSettings.animationDuration}s
                </label>
                <Slider
                  value={[customSettings.animationDuration]}
                  onValueChange={([value]) => 
                    setCustomSettings(prev => ({ ...prev, animationDuration: value }))
                  }
                  max={2}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Max Concurrent Animations: {customSettings.maxConcurrentAnimations}
                </label>
                <Slider
                  value={[customSettings.maxConcurrentAnimations]}
                  onValueChange={([value]) => 
                    setCustomSettings(prev => ({ ...prev, maxConcurrentAnimations: value }))
                  }
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Enable Blur</span>
                  <Switch
                    checked={customSettings.enableBlur}
                    onCheckedChange={(checked) => 
                      setCustomSettings(prev => ({ ...prev, enableBlur: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Enable Shadows</span>
                  <Switch
                    checked={customSettings.enableShadows}
                    onCheckedChange={(checked) => 
                      setCustomSettings(prev => ({ ...prev, enableShadows: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Enable Gradients</span>
                  <Switch
                    checked={customSettings.enableGradients}
                    onCheckedChange={(checked) => 
                      setCustomSettings(prev => ({ ...prev, enableGradients: checked }))
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Recommendations */}
          {performanceReport.recommendations.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm text-gray-400 font-semibold">Recommendations</div>
              <div className="space-y-1">
                {performanceReport.recommendations.map((rec, index) => (
                  <div key={index} className="text-xs text-yellow-400">
                    • {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-gray-700">
            <Button
              variant="outline"
              size="sm"
              onClick={exportSettings}
              className="text-xs h-7 px-2 flex items-center gap-1"
            >
              <Download className="h-3 w-3" />
              Export
            </Button>
            
            <label className="cursor-pointer">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 px-2 flex items-center gap-1"
                asChild
              >
                <span>
                  <Upload className="h-3 w-3" />
                  Import
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
              />
            </label>

            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefaults}
              className="text-xs h-7 px-2 flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
