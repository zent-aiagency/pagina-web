'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface FPSMetrics {
  currentFPS: number
  averageFPS: number
  minFPS: number
  maxFPS: number
  frameDrops: number
  isPerformanceGood: boolean
  performanceLevel: 'excellent' | 'good' | 'fair' | 'poor'
}

export function useFPSMonitor(sampleSize: number = 60) {
  const [metrics, setMetrics] = useState<FPSMetrics>({
    currentFPS: 60,
    averageFPS: 60,
    minFPS: 60,
    maxFPS: 60,
    frameDrops: 0,
    isPerformanceGood: true,
    performanceLevel: 'excellent'
  })

  const frameTimesRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(performance.now())
  const animationFrameRef = useRef<number>()
  const frameDropsRef = useRef<number>(0)

  const measureFrame = useCallback(() => {
    const now = performance.now()
    const deltaTime = now - lastFrameTimeRef.current
    const fps = 1000 / deltaTime

    // Detectar frame drops (cuando el FPS cae significativamente)
    if (fps < 30) {
      frameDropsRef.current++
    }

    frameTimesRef.current.push(fps)
    
    // Mantener solo las últimas muestras
    if (frameTimesRef.current.length > sampleSize) {
      frameTimesRef.current.shift()
    }

    // Calcular métricas
    const frameTimes = frameTimesRef.current
    const currentFPS = Math.round(fps)
    const averageFPS = Math.round(frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length)
    const minFPS = Math.round(Math.min(...frameTimes))
    const maxFPS = Math.round(Math.max(...frameTimes))
    const frameDrops = frameDropsRef.current

    // Determinar nivel de performance
    let performanceLevel: FPSMetrics['performanceLevel'] = 'excellent'
    if (averageFPS >= 55) performanceLevel = 'excellent'
    else if (averageFPS >= 45) performanceLevel = 'good'
    else if (averageFPS >= 30) performanceLevel = 'fair'
    else performanceLevel = 'poor'

    const isPerformanceGood = averageFPS >= 45

    setMetrics({
      currentFPS,
      averageFPS,
      minFPS,
      maxFPS,
      frameDrops,
      isPerformanceGood,
      performanceLevel
    })

    lastFrameTimeRef.current = now
    animationFrameRef.current = requestAnimationFrame(measureFrame)
  }, [sampleSize])

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(measureFrame)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [measureFrame])

  const resetMetrics = useCallback(() => {
    frameTimesRef.current = []
    frameDropsRef.current = 0
    setMetrics({
      currentFPS: 60,
      averageFPS: 60,
      minFPS: 60,
      maxFPS: 60,
      frameDrops: 0,
      isPerformanceGood: true,
      performanceLevel: 'excellent'
    })
  }, [])

  return { metrics, resetMetrics }
}
