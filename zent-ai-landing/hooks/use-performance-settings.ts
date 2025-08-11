'use client'

import { useState, useEffect } from 'react'

interface PerformanceSettings {
  isMobile: boolean
  isLowEnd: boolean
  prefersReducedMotion: boolean
  shouldUseSimpleAnimations: boolean
  maxAnimatedElements: number
  animationDuration: number
}

export function usePerformanceSettings(): PerformanceSettings {
  const [settings, setSettings] = useState<PerformanceSettings>({
    isMobile: false,
    isLowEnd: false,
    prefersReducedMotion: false,
    shouldUseSimpleAnimations: false,
    maxAnimatedElements: 50,
    animationDuration: 1
  })

  useEffect(() => {
    // Detectar dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768

    // Detectar dispositivos de baja gama
    const isLowEnd = (() => {
      // @ts-ignore
      if (navigator.deviceMemory && navigator.deviceMemory < 4) return true
      // @ts-ignore
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true
      if (window.innerWidth < 480) return true
      return false
    })()

    // Detectar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Configurar ajustes basados en el dispositivo
    const shouldUseSimpleAnimations = isMobile || isLowEnd || prefersReducedMotion
    const maxAnimatedElements = isLowEnd ? 10 : isMobile ? 20 : 50
    const animationDuration = prefersReducedMotion ? 0.1 : isLowEnd ? 0.3 : isMobile ? 0.5 : 1

    setSettings({
      isMobile,
      isLowEnd,
      prefersReducedMotion,
      shouldUseSimpleAnimations,
      maxAnimatedElements,
      animationDuration
    })

    // Listener para cambios en preferencias de movimiento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        shouldUseSimpleAnimations: prev.isMobile || prev.isLowEnd || e.matches,
        animationDuration: e.matches ? 0.1 : prev.isLowEnd ? 0.3 : prev.isMobile ? 0.5 : 1
      }))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return settings
}
