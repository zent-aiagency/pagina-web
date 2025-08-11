'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Split Text Animation - cada letra se anima individualmente
interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerDelay?: number
}

export function SplitText({ text, className = '', delay = 0, duration = 0.5, staggerDelay = 0.05 }: SplitTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const letters = text.split('')

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
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { 
              opacity: 0, 
              y: 50,
              rotateX: -90,
              scale: 0.8
            },
            visible: { 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              scale: 1,
              transition: {
                duration,
                ease: [0.6, -0.05, 0.01, 0.99]
              }
            }
          }}
          style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Text Morphing - transición suave entre diferentes textos
interface MorphingTextProps {
  texts: string[]
  className?: string
  interval?: number
}

export function MorphingText({ texts, className = '', interval = 3000 }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsAnimating(false)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <motion.span
      className={className}
      animate={{
        scale: isAnimating ? [1, 0.8, 1] : 1,
        opacity: isAnimating ? [1, 0.3, 1] : 1,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {texts[currentIndex]}
    </motion.span>
  )
}

// Glitch Text Effect - efecto futurista de glitch
interface GlitchTextProps {
  text: string
  className?: string
  intensity?: number
}

export function GlitchText({ text, className = '', intensity = 1 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <motion.span
      className={`${className} relative inline-block`}
      animate={isGlitching ? {
        x: [0, -2 * intensity, 2 * intensity, -1 * intensity, 1 * intensity, 0],
        textShadow: [
          "0 0 0 transparent",
          `${2 * intensity}px 0 0 #ff0000, ${-2 * intensity}px 0 0 #00ffff`,
          `${-1 * intensity}px 0 0 #ff0000, ${1 * intensity}px 0 0 #00ffff`,
          "0 0 0 transparent"
        ]
      } : {}}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {text}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-70"
            animate={{ x: [0, 2 * intensity, -1 * intensity, 0] }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-cyan-500 opacity-70"
            animate={{ x: [0, -2 * intensity, 1 * intensity, 0] }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.span>
  )
}

// Scramble Text Effect - texto que se "desencripta"
interface ScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
  revealDelay?: number
}

export function ScrambleText({ text, className = '', scrambleSpeed = 50, revealDelay = 2000 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  useEffect(() => {
    if (!isInView) return

    let interval: NodeJS.Timeout

    if (!isRevealed) {
      // Fase de scramble
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map(() => characters[Math.floor(Math.random() * characters.length)])
            .join('')
        )
      }, scrambleSpeed)

      // Revelar el texto real después del delay
      setTimeout(() => {
        setIsRevealed(true)
        clearInterval(interval)
        
        // Revelar letra por letra
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
        }, 50)
      }, revealDelay)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isInView, text, characters, scrambleSpeed, revealDelay, isRevealed])

  return (
    <motion.span
      ref={ref}
      className={`${className} font-mono`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      {displayText || text}
    </motion.span>
  )
}

// Gradient Text Animation - texto con gradientes animados
interface AnimatedGradientTextProps {
  text: string
  className?: string
  colors?: string[]
}

export function AnimatedGradientText({ 
  text, 
  className = '', 
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B'] 
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={`${className} bg-clip-text text-transparent`}
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})`,
        backgroundSize: '300% 300%',
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

// Reveal Text - texto que se revela con máscara
interface RevealTextProps {
  text: string
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function RevealText({ text, className = '', direction = 'up' }: RevealTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const directionVariants = {
    up: { y: 100 },
    down: { y: -100 },
    left: { x: 100 },
    right: { x: -100 }
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.span
        className={className}
        initial={directionVariants[direction]}
        animate={isInView ? { x: 0, y: 0 } : directionVariants[direction]}
        transition={{ 
          duration: 0.8, 
          ease: [0.6, -0.05, 0.01, 0.99],
          delay: 0.2 
        }}
        style={{ display: 'inline-block' }}
      >
        {text}
      </motion.span>
    </div>
  )
}

// Typewriter Effect Avanzado
interface AdvancedTypewriterProps {
  texts: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenTexts?: number
}

export function AdvancedTypewriter({ 
  texts, 
  className = '', 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delayBetweenTexts = 2000 
}: AdvancedTypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), delayBetweenTexts)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, typeSpeed, deleteSpeed, delayBetweenTexts])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="text-blue-400"
      >
        |
      </motion.span>
    </span>
  )
}
