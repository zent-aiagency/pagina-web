'use client'

import { useState, useEffect, useCallback } from 'react'

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  fcp: number | null // First Contentful Paint
  ttfb: number | null // Time to First Byte
  
  // Custom metrics
  domContentLoaded: number | null
  windowLoaded: number | null
  navigationStart: number | null
  
  // Resource timing
  totalResources: number
  slowResources: Array<{
    name: string
    duration: number
    size?: number
  }>
  
  // Memory usage (if available)
  memoryUsage: {
    used: number
    total: number
    limit: number
  } | null
  
  // Performance score
  performanceScore: number
  recommendations: string[]
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    domContentLoaded: null,
    windowLoaded: null,
    navigationStart: null,
    totalResources: 0,
    slowResources: [],
    memoryUsage: null,
    performanceScore: 0,
    recommendations: []
  })

  const [isLoading, setIsLoading] = useState(true)

  const calculatePerformanceScore = useCallback((metrics: Partial<PerformanceMetrics>) => {
    let score = 100
    const recommendations: string[] = []

    // LCP scoring
    if (metrics.lcp) {
      if (metrics.lcp > 4000) {
        score -= 30
        recommendations.push('Optimize Largest Contentful Paint (LCP) - currently over 4s')
      } else if (metrics.lcp > 2500) {
        score -= 15
        recommendations.push('Improve Largest Contentful Paint (LCP) - currently over 2.5s')
      }
    }

    // FCP scoring
    if (metrics.fcp) {
      if (metrics.fcp > 3000) {
        score -= 20
        recommendations.push('Optimize First Contentful Paint (FCP) - currently over 3s')
      } else if (metrics.fcp > 1800) {
        score -= 10
        recommendations.push('Improve First Contentful Paint (FCP) - currently over 1.8s')
      }
    }

    // CLS scoring
    if (metrics.cls) {
      if (metrics.cls > 0.25) {
        score -= 25
        recommendations.push('Reduce Cumulative Layout Shift (CLS) - currently over 0.25')
      } else if (metrics.cls > 0.1) {
        score -= 10
        recommendations.push('Improve Cumulative Layout Shift (CLS) - currently over 0.1')
      }
    }

    // FID scoring
    if (metrics.fid) {
      if (metrics.fid > 300) {
        score -= 20
        recommendations.push('Optimize First Input Delay (FID) - currently over 300ms')
      } else if (metrics.fid > 100) {
        score -= 10
        recommendations.push('Improve First Input Delay (FID) - currently over 100ms')
      }
    }

    // Resource loading
    if (metrics.slowResources && metrics.slowResources.length > 0) {
      score -= Math.min(15, metrics.slowResources.length * 3)
      recommendations.push(`Optimize ${metrics.slowResources.length} slow-loading resources`)
    }

    return { score: Math.max(0, score), recommendations }
  }, [])

  const measureCoreWebVitals = useCallback(() => {
    // Measure using Performance Observer API
    if ('PerformanceObserver' in window) {
      // LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // CLS
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            setMetrics(prev => ({ ...prev, cls: clsValue }))
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // FCP
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
          }
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })
    }
  }, [])

  const measureNavigationTiming = useCallback(() => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart
        const windowLoaded = navigation.loadEventEnd - navigation.navigationStart
        
        setMetrics(prev => ({
          ...prev,
          ttfb,
          domContentLoaded,
          windowLoaded,
          navigationStart: navigation.navigationStart
        }))
      }
    }
  }, [])

  const measureResourceTiming = useCallback(() => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      
      const slowResources = resources
        .filter(resource => resource.duration > 1000) // Resources taking more than 1s
        .map(resource => ({
          name: resource.name.split('/').pop() || resource.name,
          duration: Math.round(resource.duration),
          size: resource.transferSize
        }))
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 10) // Top 10 slowest resources

      setMetrics(prev => ({
        ...prev,
        totalResources: resources.length,
        slowResources
      }))
    }
  }, [])

  const measureMemoryUsage = useCallback(() => {
    // @ts-ignore - memory API is experimental
    if ('memory' in performance) {
      // @ts-ignore
      const memory = performance.memory
      setMetrics(prev => ({
        ...prev,
        memoryUsage: {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) // MB
        }
      }))
    }
  }, [])

  useEffect(() => {
    const measureAll = () => {
      measureCoreWebVitals()
      measureNavigationTiming()
      measureResourceTiming()
      measureMemoryUsage()
      setIsLoading(false)
    }

    if (document.readyState === 'complete') {
      measureAll()
    } else {
      window.addEventListener('load', measureAll)
    }

    // Update metrics periodically
    const interval = setInterval(() => {
      measureResourceTiming()
      measureMemoryUsage()
    }, 5000)

    return () => {
      window.removeEventListener('load', measureAll)
      clearInterval(interval)
    }
  }, [measureCoreWebVitals, measureNavigationTiming, measureResourceTiming, measureMemoryUsage])

  // Calculate performance score when metrics change
  useEffect(() => {
    const { score, recommendations } = calculatePerformanceScore(metrics)
    setMetrics(prev => ({
      ...prev,
      performanceScore: score,
      recommendations
    }))
  }, [metrics.lcp, metrics.fcp, metrics.cls, metrics.fid, metrics.slowResources, calculatePerformanceScore])

  return { metrics, isLoading }
}
