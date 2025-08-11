'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UseCasesModal } from './use-cases-section'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showUseCases, setShowUseCases] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient simplificado */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        
        {/* Solo dos elementos de fondo sutiles */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Icono simplificado */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
            </motion.div>
            
            {/* Título simplificado */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="block mb-2 text-white">
                Automatizando el futuro,
              </div>
              <div className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                una integración a la vez
              </div>
            </motion.h1>
            
            {/* Descripción simplificada */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Creamos automatizaciones personalizadas que transforman procesos manuales en sistemas inteligentes usando n8n
            </motion.p>
            
            {/* Botones con el mismo estilo */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium transition-colors duration-200"
              >
                Contáctanos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                onClick={() => setShowUseCases(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-medium transition-all duration-200"
              >
                Ver casos de uso
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll simplificado */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-blue-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Modal de Casos de Uso */}
      <UseCasesModal 
        isOpen={showUseCases} 
        onClose={() => setShowUseCases(false)} 
      />
    </>
  )
}
