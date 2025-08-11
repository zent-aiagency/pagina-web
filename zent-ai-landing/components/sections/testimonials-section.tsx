'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/animations/motion-components'
import { OptimizedGlitchText, OptimizedRevealText } from '@/components/animations/optimized-animated-text'

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      text: "Zent AI revolucionó nuestros procesos internos. Lo que antes nos tomaba días, ahora se hace automáticamente en minutos.",
      author: "María González",
      company: "TechStart Solutions",
      role: "CEO"
    },
    {
      text: "Ahorramos más de 40 horas mensuales gracias a sus automatizaciones. El ROI fue inmediato y espectacular.",
      author: "Carlos Mendoza",
      company: "LogiFlow",
      role: "Director de Operaciones"
    },
    {
      text: "Por fin un partner de automatización que habla nuestro idioma. Entendieron perfectamente nuestras necesidades.",
      author: "Ana Rodríguez",
      company: "Digital Marketing Pro",
      role: "Fundadora"
    },
    {
      text: "La integración con nuestro CRM y WhatsApp cambió completamente cómo atendemos a nuestros clientes. Increíble trabajo.",
      author: "Roberto Silva",
      company: "VentasMax",
      role: "Gerente General"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
            Testimonios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lo que dicen nuestros clientes sobre nuestro trabajo
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-gray-700 min-h-[300px] flex items-center">
            <CardContent className="p-8 md:p-12 text-center w-full">
              <Quote className="h-12 w-12 text-green-400 mx-auto mb-6 opacity-50" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-green-400 font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-gray-400">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Indicadores simplificados */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-green-400' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
