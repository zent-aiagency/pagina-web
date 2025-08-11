import { Card, CardContent } from '@/components/ui/card'
import { Bot, Workflow, Zap, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedCard } from '@/components/animations/motion-components'
import { OptimizedRevealText, OptimizedAnimatedGradientText, OptimizedScrambleText } from '@/components/animations/optimized-animated-text'

export function WhatWeDoSection() {
  const services = [
    {
      icon: Workflow,
      title: 'Automatización de flujos con n8n',
      description: 'Diseñamos y desarrollamos flujos de trabajo automatizados que conectan todas tus herramientas y sistemas.'
    },
    {
      icon: Bot,
      title: 'Agentes de IA personalizados',
      description: 'Creamos agentes inteligentes que manejan lógica de negocio compleja y toman decisiones automatizadas.'
    },
    {
      icon: Settings,
      title: 'Optimización de procesos',
      description: 'Analizamos y optimizamos tus operaciones, marketing, CRM y administración para máxima eficiencia.'
    },
    {
      icon: Zap,
      title: 'Integraciones personalizadas',
      description: 'Conectamos Google Workspace, WhatsApp, APIs, bases de datos y cualquier herramienta que uses.'
    }
  ]

  return (
    <section id="servicios" className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Qué Hacemos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transformamos procesos manuales en sistemas automatizados inteligentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:border-blue-400/40 transition-colors">
                      <service.icon className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
