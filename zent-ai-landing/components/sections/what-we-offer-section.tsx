import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, FileText, MessageSquare, Database, Target, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export function WhatWeOfferSection() {
  const offerings = [
    {
      icon: Users,
      title: 'Onboarding de Clientes',
      description: 'Automatiza el proceso completo de incorporación de nuevos clientes con flujos personalizados.',
      tools: ['n8n', 'Google Sheets', 'Email'],
      benefits: ['Reducción 80% tiempo', 'Experiencia consistente']
    },
    {
      icon: FileText,
      title: 'Generación de Reportes',
      description: 'Reportes automáticos con datos en tiempo real desde múltiples fuentes.',
      tools: ['PostgreSQL', 'Google Sheets', 'APIs'],
      benefits: ['Reportes 24/7', 'Datos actualizados']
    },
    {
      icon: MessageSquare,
      title: 'Bots de WhatsApp',
      description: 'Chatbots inteligentes para atención al cliente y ventas automatizadas.',
      tools: ['WhatsApp API', 'OpenAI', 'n8n'],
      benefits: ['Atención 24/7', 'Respuestas instantáneas']
    },
    {
      icon: Database,
      title: 'Sincronización de Datos',
      description: 'Mantén todos tus sistemas sincronizados en tiempo real sin intervención manual.',
      tools: ['APIs', 'PostgreSQL', 'Make'],
      benefits: ['Datos consistentes', 'Sin errores manuales']
    },
    {
      icon: Target,
      title: 'Captura de Leads',
      description: 'Automatiza la captura, calificación y seguimiento de leads potenciales.',
      tools: ['CRM', 'Google Forms', 'Email'],
      benefits: ['Mayor conversión', 'Seguimiento automático']
    },
    {
      icon: Clock,
      title: 'Automatización 24/7',
      description: 'Sistemas que trabajan continuamente, optimizando procesos mientras duermes.',
      tools: ['n8n', 'Webhooks', 'Cron Jobs'],
      benefits: ['Operación continua', 'Escalabilidad infinita']
    }
  ]

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Lo Que Ofrecemos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones específicas para cada necesidad de tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 group h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <offering.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">
                      {offering.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    {offering.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Herramientas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {offering.tools.map((tool, toolIndex) => (
                        <Badge 
                          key={toolIndex} 
                          variant="secondary" 
                          className="bg-gray-700/50 text-gray-300"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Beneficios:</h4>
                    <ul className="space-y-1">
                      {offering.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-green-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
