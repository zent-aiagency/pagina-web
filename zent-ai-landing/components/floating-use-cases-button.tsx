'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { UseCasesModal } from './sections/use-cases-section'

export function FloatingUseCasesButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showUseCases, setShowUseCases] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar después de hacer scroll hacia abajo
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              onClick={() => setShowUseCases(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 py-3"
              size="lg"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Ver Casos de Uso</span>
              <span className="sm:hidden">Casos</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <UseCasesModal 
        isOpen={showUseCases} 
        onClose={() => setShowUseCases(false)} 
      />
    </>
  )
}
