'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Zap, Clock, AlertTriangle, CheckCircle, XCircle, BarChart3, Monitor, Cpu, HardDrive, Wifi, Eye, EyeOff } from 'lucide-react'
import { useFPSMonitor } from '@/hooks/use-fps-monitor'
import { usePerformanceMetrics } from '@/hooks/use-performance-metrics'

interface PerformanceDashboardProps {
  isVisible?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export function PerformanceDashboard({ 
  isVisible = false, 
  position = 'top-right' 
}: PerformanceDashboardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { metrics: fpsMetrics, resetMetrics } = useFPSMonitor()
  const { metrics: perfMetrics, isLoading } = usePerformanceMetrics()

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left': return 'top-4 left-4'
      case 'top-right': return 'top-4 right-4'
      case 'bottom-left': return 'bottom-4 left-4'
      case 'bottom-right': return 'bottom-4 right-4'
      default: return 'top-4 right-4'
    }
  }

  const getPerformanceColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'good': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      case 'fair': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'poor': return 'text-red-400 bg-red-400/10 border-red-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-blue-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const formatTime = (time: number | null) => {
    if (time === null) return 'N/A'
    return time < 1000 ? `${Math.round(time)}ms` : `${(time / 1000).toFixed(1)}s`
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  if (!isVisible) return null

  return (
    <motion.div
      className={`fixed ${getPositionClasses()} z-50 font-mono text-sm`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <Card className="bg-gray-900/95 border-gray-700 backdrop-blur-md min-w-[280px]">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-400" />
              Performance Monitor
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="h-6 w-6 p-0"
              >
                {showDetails ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6 p-0"
              >
                <BarChart3 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* FPS Metrics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">FPS</span>
              <div className="flex items-center gap-2">
                <Badge className={getPerformanceColor(fpsMetrics.performanceLevel)}>
                  {fpsMetrics.currentFPS}
                </Badge>
                <span className="text-xs text-gray-500">
                  avg: {fpsMetrics.averageFPS}
                </span>
              </div>
            </div>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-gray-400 space-y-1"
              >
                <div className="flex justify-between">
                  <span>Min/Max:</span>
                  <span>{fpsMetrics.minFPS}/{fpsMetrics.maxFPS}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frame Drops:</span>
                  <span className={fpsMetrics.frameDrops > 10 ? 'text-red-400' : 'text-green-400'}>
                    {fpsMetrics.frameDrops}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Performance Score */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Score</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${getScoreColor(perfMetrics.performanceScore)}`}>
                  {Math.round(perfMetrics.performanceScore)}
                </span>
                {perfMetrics.performanceScore >= 90 ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : perfMetrics.performanceScore >= 70 ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          {!isLoading && (
            <div className="space-y-2">
              <div className="text-xs text-gray-500 font-semibold">Core Web Vitals</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">LCP:</span>
                  <span className={perfMetrics.lcp && perfMetrics.lcp > 2500 ? 'text-red-400' : 'text-green-400'}>
                    {formatTime(perfMetrics.lcp)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">FCP:</span>
                  <span className={perfMetrics.fcp && perfMetrics.fcp > 1800 ? 'text-red-400' : 'text-green-400'}>
                    {formatTime(perfMetrics.fcp)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">FID:</span>
                  <span className={perfMetrics.fid && perfMetrics.fid > 100 ? 'text-red-400' : 'text-green-400'}>
                    {formatTime(perfMetrics.fid)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CLS:</span>
                  <span className={perfMetrics.cls && perfMetrics.cls > 0.1 ? 'text-red-400' : 'text-green-400'}>
                    {perfMetrics.cls?.toFixed(3) || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Memory Usage */}
          {perfMetrics.memoryUsage && showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                <HardDrive className="h-3 w-3" />
                Memory Usage
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Used:</span>
                  <span>{perfMetrics.memoryUsage.used} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total:</span>
                  <span>{perfMetrics.memoryUsage.total} MB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                    style={{
                      width: `${(perfMetrics.memoryUsage.used / perfMetrics.memoryUsage.total) * 100}%`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Expanded Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 border-t border-gray-700 pt-3"
              >
                {/* Load Times */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Load Times
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">TTFB:</span>
                      <span>{formatTime(perfMetrics.ttfb)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">DOM Ready:</span>
                      <span>{formatTime(perfMetrics.domContentLoaded)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Window Load:</span>
                      <span>{formatTime(perfMetrics.windowLoaded)}</span>
                    </div>
                  </div>
                </div>

                {/* Slow Resources */}
                {perfMetrics.slowResources.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      <Wifi className="h-3 w-3" />
                      Slow Resources ({perfMetrics.slowResources.length})
                    </div>
                    <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                      {perfMetrics.slowResources.slice(0, 3).map((resource, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-400 truncate max-w-[120px]">
                            {resource.name}
                          </span>
                          <span className="text-red-400">
                            {formatTime(resource.duration)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {perfMetrics.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Recommendations
                    </div>
                    <div className="text-xs space-y-1 max-h-16 overflow-y-auto">
                      {perfMetrics.recommendations.slice(0, 2).map((rec, index) => (
                        <div key={index} className="text-yellow-400 text-xs">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-gray-700">
            <Button
              variant="outline"
              size="sm"
              onClick={resetMetrics}
              className="text-xs h-6 px-2"
            >
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-xs h-6 px-2"
            >
              Reload
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
