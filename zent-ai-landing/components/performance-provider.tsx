'use client'

import { createContext, useContext, ReactNode } from 'react'
import { usePerformanceSettings } from '@/hooks/use-performance-settings'

interface PerformanceContextType {
  isMobile: boolean
  isLowEnd: boolean
  prefersReducedMotion: boolean
  shouldUseSimpleAnimations: boolean
  maxAnimatedElements: number
  animationDuration: number
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined)

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const settings = usePerformanceSettings()

  return (
    <PerformanceContext.Provider value={settings}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformanceContext() {
  const context = useContext(PerformanceContext)
  if (context === undefined) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider')
  }
  return context
}
