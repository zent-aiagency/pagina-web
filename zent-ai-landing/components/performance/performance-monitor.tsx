'use client'

import { useState, useEffect } from 'react'
import { PerformanceDashboard } from './performance-dashboard'
import { PerformanceControls } from './performance-controls'
import { Button } from '@/components/ui/button'
import { Activity, Settings } from 'lucide-react'

interface PerformanceMonitorProps {
  enableInProduction?: boolean
  showByDefault?: boolean
}

export function PerformanceMonitor({ 
  enableInProduction = false, 
  showByDefault = false 
}: PerformanceMonitorProps) {
  const [showDashboard, setShowDashboard] = useState(showByDefault)
  const [showControls, setShowControls] = useState(false)
  const [isDevelopment, setIsDevelopment] = useState(false)

  useEffect(() => {
    setIsDevelopment(process.env.NODE_ENV === 'development')
  }, [])

  // Solo mostrar en desarrollo o si está habilitado en producción
  if (!isDevelopment && !enableInProduction) {
    return null
  }

  return (
    <>
      {/* Toggle Buttons */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDashboard(!showDashboard)}
          className={`h-8 px-3 text-xs ${showDashboard ? 'bg-blue-500/20 border-blue-500' : ''}`}
        >
          <Activity className="h-3 w-3 mr-1" />
          Performance
        </Button>
        
        {isDevelopment && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowControls(!showControls)}
            className={`h-8 px-3 text-xs ${showControls ? 'bg-purple-500/20 border-purple-500' : ''}`}
          >
            <Settings className="h-3 w-3 mr-1" />
            Controls
          </Button>
        )}
      </div>

      {/* Performance Dashboard */}
      <PerformanceDashboard 
        isVisible={showDashboard}
        position="top-right"
      />

      {/* Performance Controls (solo en desarrollo) */}
      {isDevelopment && (
        <PerformanceControls
          isVisible={showControls}
          onToggle={() => setShowControls(!showControls)}
        />
      )}
    </>
  )
}
