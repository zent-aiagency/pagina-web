'use client'

import { useState, useEffect, useCallback } from 'react'
import { useFPSMonitor } from './use-fps-monitor'
import { usePerformanceSettings } from './use-performance-settings'

interface AdaptiveSettings {
  animationComplexity: 'high' | 'medium' | 'low' | 'minimal'
  particleCount: number
  staggerDelay: number
  animationDuration: number
  enableBlur: boolean
  enableShadows: boolean
  enableGradients: boolean
  maxConcurrentAnimations: number
  shouldReduceMotion: boolean
}

export function useAdaptivePerformance() {
  const { metrics } = useFPSMonitor()
  const { shouldUseSimpleAnimations, isMobile } = usePerformanceSettings()
  
  const [adaptiveSettings, setAdaptiveSettings] = useState<AdaptiveSettings>({
    animationComplexity: 'high',
    particleCount: 20,
    staggerDelay: 0.1,
    animationDuration: 1,
    enableBlur: true,
    enableShadows: true,
    enableGradients: true,
    maxConcurrentAnimations: 10,
    shouldReduceMotion: false
  })

  const [performanceHistory, setPerformanceHistory] = useState<number[]>([])
  const [alertShown, setAlertShown] = useState(false)

  const adjustSettings = useCallback(() => {
    const { averageFPS, performanceLevel, frameDrops } = metrics
    
    // Mantener historial de performance
    setPerformanceHistory(prev => {
      const newHistory = [...prev, averageFPS].slice(-30) // Últimos 30 frames
      return newHistory
    })

    let newSettings: AdaptiveSettings = { ...adaptiveSettings }

    // Ajustar basado en el nivel de performance
    switch (performanceLevel) {
      case 'excellent':
        newSettings = {
          animationComplexity: 'high',
          particleCount: isMobile ? 10 : 20,
          staggerDelay: 0.1,
          animationDuration: 1,
          enableBlur: true,
          enableShadows: true,
          enableGradients: true,
          maxConcurrentAnimations: isMobile ? 5 : 10,
          shouldReduceMotion: false
        }
        break

      case 'good':
        newSettings = {
          animationComplexity: 'medium',
          particleCount: isMobile ? 5 : 15,
          staggerDelay: 0.08,
          animationDuration: 0.8,
          enableBlur: !isMobile,
          enableShadows: true,
          enableGradients: true,
          maxConcurrentAnimations: isMobile ? 3 : 8,
          shouldReduceMotion: false
        }
        break

      case 'fair':
        newSettings = {
          animationComplexity: 'low',
          particleCount: isMobile ? 3 : 10,
          staggerDelay: 0.05,
          animationDuration: 0.6,
          enableBlur: false,
          enableShadows: !isMobile,
          enableGradients: !isMobile,
          maxConcurrentAnimations: isMobile ? 2 : 5,
          shouldReduceMotion: false
        }
        break

      case 'poor':
        newSettings = {
          animationComplexity: 'minimal',
          particleCount: 0,
          staggerDelay: 0.02,
          animationDuration: 0.3,
          enableBlur: false,
          enableShadows: false,
          enableGradients: false,
          maxConcurrentAnimations: 1,
          shouldReduceMotion: true
        }
        break
    }

    // Ajustes adicionales por frame drops
    if (frameDrops > 20) {
      newSettings.particleCount = Math.max(0, newSettings.particleCount - 5)
      newSettings.maxConcurrentAnimations = Math.max(1, newSettings.maxConcurrentAnimations - 2)
      newSettings.enableBlur = false
    }

    // Aplicar configuraciones de dispositivo
    if (shouldUseSimpleAnimations) {
      newSettings.animationComplexity = 'minimal'
      newSettings.shouldReduceMotion = true
    }

    setAdaptiveSettings(newSettings)

    // Mostrar alerta si la performance es muy baja
    if (averageFPS < 20 && !alertShown) {
      console.warn('🚨 Low performance detected. Reducing animation complexity.')
      setAlertShown(true)
    }

    // Reset alert si la performance mejora
    if (averageFPS > 40 && alertShown) {
      setAlertShown(false)
    }

  }, [metrics, shouldUseSimpleAnimations, isMobile, adaptiveSettings, alertShown])

  useEffect(() => {
    adjustSettings()
  }, [metrics.averageFPS, metrics.performanceLevel, metrics.frameDrops])

  const getOptimizedProps = useCallback((animationType: 'text' | 'card' | 'background' | 'particle') => {
    const baseProps = {
      duration: adaptiveSettings.animationDuration,
      staggerDelay: adaptiveSettings.staggerDelay,
      shouldAnimate: !adaptiveSettings.shouldReduceMotion
    }

    switch (animationType) {
      case 'text':
        return {
          ...baseProps,
          complexity: adaptiveSettings.animationComplexity,
          enableSplit: adaptiveSettings.animationComplexity !== 'minimal'
        }

      case 'card':
        return {
          ...baseProps,
          enableHover: adaptiveSettings.animationComplexity !== 'minimal',
          enableShadow: adaptiveSettings.enableShadows,
          enable3D: adaptiveSettings.animationComplexity === 'high'
        }

      case 'background':
        return {
          ...baseProps,
          enableBlur: adaptiveSettings.enableBlur,
          enableGradients: adaptiveSettings.enableGradients,
          particleCount: adaptiveSettings.particleCount
        }

      case 'particle':
        return {
          ...baseProps,
          count: adaptiveSettings.particleCount,
          enabled: adaptiveSettings.particleCount > 0
        }

      default:
        return baseProps
    }
  }, [adaptiveSettings])

  const getPerformanceReport = useCallback(() => {
    const avgPerformance = performanceHistory.length > 0 
      ? performanceHistory.reduce((a, b) => a + b, 0) / performanceHistory.length 
      : 0

    return {
      currentFPS: metrics.currentFPS,
      averageFPS: Math.round(avgPerformance),
      performanceLevel: metrics.performanceLevel,
      frameDrops: metrics.frameDrops,
      adaptiveSettings,
      recommendations: [
        ...(metrics.frameDrops > 10 ? ['Consider reducing animation complexity'] : []),
        ...(adaptiveSettings.particleCount === 0 ? ['Particles disabled for better performance'] : []),
        ...(adaptiveSettings.shouldReduceMotion ? ['Motion reduced due to low performance'] : [])
      ]
    }
  }, [metrics, adaptiveSettings, performanceHistory])

  return {
    adaptiveSettings,
    getOptimizedProps,
    getPerformanceReport,
    isPerformanceGood: metrics.isPerformanceGood,
    performanceLevel: metrics.performanceLevel
  }
}
