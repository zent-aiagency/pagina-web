'use client'

import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, useMemo } from 'react'
import { usePerformanceSettings } from '@/hooks/use-performance-settings'

// Split Text optimizado para móviles
interface OptimizedSplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerDelay?: number
}

export function OptimizedSplitText({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.5, 
  staggerDelay = 0.05 
}: OptimizedSplitTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const { shouldUseSimpleAnimations, animationDuration, isMobile } = usePerformanceSettings()
  const prefersReducedMotion = useReducedMotion()

  // En móviles, animar por palabras en lugar de letras para mejor performance
  const animationUnits = useMemo(() => {
    if (shouldUseSimpleAnimations || isMobile) {
      return text.split(' ').map(word => ({ text: word + ' ', isWord: true }))
    }
    return text.split('').map(char => ({ text: char, isWord: false }))
  }, [text, shouldUseSimpleAnimations, isMobile])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Animación simplificada para dispositivos de bajo rendimiento
  if (prefersReducedMotion || shouldUseSimpleAnimations) {
    return (
      <motion.span
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay }}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: isMobile ? staggerDelay * 2 : staggerDelay,
            delayChildren: delay
          }
        }
      }}
    >
      {animationUnits.map((unit, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { 
              opacity: 0, 
              y: isMobile ? 20 : 50,
              rotateX: isMobile ? 0 : -90,
              scale: isMobile ? 1 : 0.8
            },
            visible: { 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              scale: 1,
              transition: {
                duration: duration * animationDuration,
                ease: [0.6, -0.05, 0.01, 0.99]
              }
            }
          }}
          style={{ 
            display: 'inline-block', 
            transformOrigin: 'center bottom',
            willChange: 'transform, opacity'
          }}
        >
          {unit.text === ' ' ? '\u00A0' : unit.text}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Text Morphing optimizado
interface OptimizedMorphingTextProps {
  texts: string[]
  className?: string
  interval?: number
}

export function OptimizedMorphingText({ texts, className = '', interval = 3000 }: OptimizedMorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { shouldUseSimpleAnimations, animationDuration } = usePerformanceSettings()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const timer = setInterval(() => {
      if (!prefersReducedMotion) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length)
          setIsAnimating(false)
        }, shouldUseSimpleAnimations ? 200 : 500)
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval, prefersReducedMotion, shouldUseSimpleAnimations])

  if (prefersReducedMotion) {
    return <span className={className}>{texts[currentIndex]}</span>
  }

  return (
    <motion.span
      className={className}
      animate={shouldUseSimpleAnimations ? {
        opacity: isAnimating ? [1, 0.5, 1] : 1,
      } : {
        scale: isAnimating ? [1, 0.8, 1] : 1,
        opacity: isAnimating ? [1, 0.3, 1] : 1,
      }}
      transition={{ duration: 0.5 * animationDuration, ease: "easeInOut" }}
      style={{ willChange: 'transform, opacity' }}
    >
      {texts[currentIndex]}
    </motion.span>
  )
}

// Glitch Text optimizado
interface OptimizedGlitchTextProps {
  text: string
  className?: string
  intensity?: number
}

export function OptimizedGlitchText({ text, className = '', intensity = 1 }: OptimizedGlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const { shouldUseSimpleAnimations, isMobile } = usePerformanceSettings()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || shouldUseSimpleAnimations) return

    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), isMobile ? 100 : 200)
    }, 4000 + Math.random() * 3000) // Menos frecuente en móviles

    return () => clearInterval(glitchInterval)
  }, [prefersReducedMotion, shouldUseSimpleAnimations, isMobile])

  // Versión simplificada para dispositivos de bajo rendimiento
  if (prefersReducedMotion || shouldUseSimpleAnimations) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      className={`${className} relative inline-block`}
      animate={isGlitching ? {
        x: [0, -1 * intensity, 1 * intensity, 0],
        textShadow: isMobile ? [
          "0 0 0 transparent",
          `${1 * intensity}px 0 0 #ff0000`,
          "0 0 0 transparent"
        ] : [
          "0 0 0 transparent",
          `${2 * intensity}px 0 0 #ff0000, ${-2 * intensity}px 0 0 #00ffff`,
          `${-1 * intensity}px 0 0 #ff0000, ${1 * intensity}px 0 0 #00ffff`,
          "0 0 0 transparent"
        ]
      } : {}}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{ willChange: 'transform' }}
    >
      {text}
      {/* Reducir capas de glitch en móviles */}
      {isGlitching && !isMobile && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-70"
            animate={{ x: [0, 2 * intensity, -1 * intensity, 0] }}
            transition={{ duration: 0.2 }}
            style={{ willChange: 'transform' }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-cyan-500 opacity-70"
            animate={{ x: [0, -2 * intensity, 1 * intensity, 0] }}
            transition={{ duration: 0.2 }}
            style={{ willChange: 'transform' }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.span>
  )
}

// Scramble Text optimizado
interface OptimizedScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
  revealDelay?: number
}

export function OptimizedScrambleText({ 
  text, 
  className = '', 
  scrambleSpeed = 50, 
  revealDelay = 2000 
}: OptimizedScrambleTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { shouldUseSimpleAnimations, isMobile } = usePerformanceSettings()
  const prefersReducedMotion = useReducedMotion()

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  useEffect(() => {
    if (!isInView) return

    // Versión simplificada para dispositivos de bajo rendimiento
    if (prefersReducedMotion || shouldUseSimpleAnimations) {
      setDisplayText(text)
      return
    }

    let interval: NodeJS.Timeout

    if (!isRevealed) {
      // Reducir velocidad de scramble en móviles
      const adjustedSpeed = isMobile ? scrambleSpeed * 2 : scrambleSpeed
      const adjustedDelay = isMobile ? revealDelay * 0.5 : revealDelay

      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map(() => characters[Math.floor(Math.random() * characters.length)])
            .join('')
        )
      }, adjustedSpeed)

      setTimeout(() => {
        setIsRevealed(true)
        clearInterval(interval)
        
        // Revelar más rápido en móviles
        let revealIndex = 0
        const revealInterval = setInterval(() => {
          setDisplayText(prev => 
            text
              .split('')
              .map((char, index) => 
                index <= revealIndex ? char : characters[Math.floor(Math.random() * characters.length)]
              )
              .join('')
          )
          
          revealIndex++
          if (revealIndex >= text.length) {
            clearInterval(revealInterval)
          }
        }, isMobile ? 30 : 50)
      }, adjustedDelay)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isInView, text, characters, scrambleSpeed, revealDelay, isRevealed, prefersReducedMotion, shouldUseSimpleAnimations, isMobile])

  return (
    <motion.span
      ref={ref}
      className={`${className} ${shouldUseSimpleAnimations ? '' : 'font-mono'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      style={{ willChange: 'opacity' }}
    >
      {displayText || text}
    </motion.span>
  )
}

// Advanced Typewriter optimizado
interface OptimizedAdvancedTypewriterProps {
  texts: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenTexts?: number
}

export function OptimizedAdvancedTypewriter({ 
  texts, 
  className = '', 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delayBetweenTexts = 2000 
}: OptimizedAdvancedTypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const { shouldUseSimpleAnimations, isMobile } = usePerformanceSettings()
  const prefersReducedMotion = useReducedMotion()

  // Ajustar velocidades para móviles
  const adjustedTypeSpeed = isMobile ? typeSpeed * 1.5 : typeSpeed
  const adjustedDeleteSpeed = isMobile ? deleteSpeed * 1.5 : deleteSpeed

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentText(texts[currentTextIndex])
      return
    }

    const currentFullText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenTexts)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? adjustedDeleteSpeed : adjustedTypeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, adjustedTypeSpeed, adjustedDeleteSpeed, delayBetweenTexts, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return <span className={className}>{texts[currentTextIndex]}</span>
  }

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="text-blue-400"
        style={{ willChange: 'opacity' }}
      >
        |
      </motion.span>
    </span>
  )
}

// Animated Gradient Text optimizado
interface OptimizedAnimatedGradientTextProps {
  text: string
  className?: string
  colors?: string[]
}

export function OptimizedAnimatedGradientText({ 
  text, 
  className = '', 
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B'] 
}: OptimizedAnimatedGradientTextProps) {
  const { shouldUseSimpleAnimations } = usePerformanceSettings()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion || shouldUseSimpleAnimations) {
    return (
      <span
        className={`${className} bg-clip-text text-transparent`}
        style={{
          backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
        }}
      >
        {text}
      </span>
    )
  }

  return (
    <motion.span
      className={`${className} bg-clip-text text-transparent`}
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})`,
        backgroundSize: '300% 300%',
        willChange: 'background-position'
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {text}
    </motion.span>
  )
}

// Reveal Text optimizado
interface OptimizedRevealTextProps {
  text: string
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function OptimizedRevealText({ text, className = '', direction = 'up' }: OptimizedRevealTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { shouldUseSimpleAnimations, animationDuration } = usePerformanceSettings()
  const prefersReducedMotion = useReducedMotion()

  const directionVariants = {
    up: { y: shouldUseSimpleAnimations ? 20 : 100 },
    down: { y: shouldUseSimpleAnimations ? -20 : -100 },
    left: { x: shouldUseSimpleAnimations ? 20 : 100 },
    right: { x: shouldUseSimpleAnimations ? -20 : -100 }
  }

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.span
        className={className}
        initial={directionVariants[direction]}
        animate={isInView ? { x: 0, y: 0 } : directionVariants[direction]}
        transition={{ 
          duration: 0.8 * animationDuration, 
          ease: [0.6, -0.05, 0.01, 0.99],
          delay: 0.2 
        }}
        style={{ 
          display: 'inline-block',
          willChange: 'transform'
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}
