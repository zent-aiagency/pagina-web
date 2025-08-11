'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, FileText, MessageSquare, ShoppingCart, Calendar, BarChart3, Clock, CheckCircle, ArrowRight, X } from 'lucide-react'
import { useEffect } from 'react'

interface UseCasesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UseCasesModal({ isOpen, onClose }: UseCasesModalProps) {
  const useCases = [
    {
      id: 1,
      title: "Automatización de Onboarding de Clientes",
      category: "CRM & Ventas",
      icon: Users,
      description: "Sistema completo que automatiza desde la captura del lead hasta la activación del cliente.",
      problem: "Una agencia digital tardaba 3-4 días en procesar cada nuevo cliente, con múltiples pasos manuales propensos a errores.",
      solution: "Creamos un flujo automatizado que procesa nuevos clientes en menos de 30 minutos.",
      tools: ["n8n", "Google Sheets", "Gmail", "Slack", "Stripe"],
      benefits: [
        "Reducción del 85% en tiempo de onboarding",
        "0% errores en datos de clientes",
        "Experiencia consistente para todos los clientes",
        "Liberación de 20 horas semanales del equipo"
      ],
      metrics: {
        timeSaved: "20 horas/semana",
        errorReduction: "100%",
        efficiency: "85%"
      },
      steps: [
        "Cliente completa formulario web",
        "Datos se validan automáticamente",
        "Se crea carpeta en Google Drive",
        "Se envía email de bienvenida personalizado",
        "Se programa reunión de kickoff",
        "Se notifica al equipo en Slack"
      ]
    },
    {
      id: 2,
      title: "Bot de WhatsApp para E-commerce",
      category: "Atención al Cliente",
      icon: MessageSquare,
      description: "Chatbot inteligente que maneja consultas, procesa pedidos y brinda soporte 24/7.",
      problem: "Una tienda online perdía ventas fuera del horario comercial y el equipo se saturaba con consultas repetitivas.",
      solution: "Implementamos un bot de WhatsApp que atiende consultas y procesa pedidos automáticamente.",
      tools: ["WhatsApp Business API", "OpenAI", "n8n", "WooCommerce", "PostgreSQL"],
      benefits: [
        "Atención 24/7 sin intervención humana",
        "Aumento del 40% en conversiones nocturnas",
        "Reducción del 70% en consultas al equipo",
        "Tiempo de respuesta promedio: 2 segundos"
      ],
      metrics: {
        responseTime: "2 segundos",
        availability: "24/7",
        conversionIncrease: "40%"
      },
      steps: [
        "Cliente envía mensaje a WhatsApp",
        "Bot identifica tipo de consulta",
        "Responde con información del producto",
        "Procesa pedido si el cliente confirma",
        "Genera orden en WooCommerce",
        "Envía confirmación y tracking"
      ]
    },
    {
      id: 3,
      title: "Generación Automática de Reportes",
      category: "Análisis & Reportes",
      icon: BarChart3,
      description: "Sistema que genera reportes ejecutivos automáticos con datos de múltiples fuentes.",
      problem: "El equipo de marketing gastaba 8 horas semanales creando reportes manuales con datos de diferentes plataformas.",
      solution: "Automatizamos la recolección de datos y generación de reportes con insights automáticos.",
      tools: ["Google Analytics", "Facebook Ads", "Google Sheets", "n8n", "OpenAI"],
      benefits: [
        "Reportes generados automáticamente cada lunes",
        "Datos siempre actualizados y precisos",
        "Insights automáticos con IA",
        "Ahorro de 8 horas semanales"
      ],
      metrics: {
        timeSaved: "8 horas/semana",
        accuracy: "100%",
        frequency: "Semanal automático"
      },
      steps: [
        "Extrae datos de Google Analytics",
        "Obtiene métricas de Facebook Ads",
        "Consolida información en Google Sheets",
        "IA genera insights y recomendaciones",
        "Crea reporte visual automático",
        "Envía por email a stakeholders"
      ]
    },
    {
      id: 4,
      title: "Sincronización de Inventario Multi-canal",
      category: "E-commerce & Logística",
      icon: ShoppingCart,
      description: "Mantiene inventario sincronizado entre tienda física, online y marketplaces.",
      problem: "Una empresa vendía en 5 canales diferentes y constantemente tenía problemas de stock desactualizado.",
      solution: "Creamos un sistema que sincroniza inventario en tiempo real entre todos los canales.",
      tools: ["WooCommerce", "MercadoLibre API", "Shopify", "n8n", "PostgreSQL"],
      benefits: [
        "Inventario sincronizado en tiempo real",
        "Eliminación de sobreventa",
        "Visibilidad completa del stock",
        "Reducción del 95% en errores de inventario"
      ],
      metrics: {
        syncTime: "Tiempo real",
        errorReduction: "95%",
        channels: "5 canales"
      },
      steps: [
        "Venta se registra en cualquier canal",
        "Sistema detecta cambio de stock",
        "Actualiza inventario en base de datos",
        "Sincroniza con todos los canales",
        "Notifica si stock está bajo",
        "Genera orden de reposición automática"
      ]
    },
    {
      id: 5,
      title: "Automatización de Facturación Recurrente",
      category: "Finanzas & Administración",
      icon: FileText,
      description: "Sistema que maneja facturación, cobranza y seguimiento de pagos automáticamente.",
      problem: "Una consultora perdía tiempo facturando manualmente y tenía problemas con pagos atrasados.",
      solution: "Automatizamos todo el proceso de facturación y cobranza con seguimiento inteligente.",
      tools: ["Stripe", "Gmail", "Google Sheets", "n8n", "Calendly"],
      benefits: [
        "Facturación automática mensual",
        "Seguimiento de pagos pendientes",
        "Reducción del 80% en pagos atrasados",
        "Ahorro de 12 horas mensuales"
      ],
      metrics: {
        timeSaved: "12 horas/mes",
        paymentImprovement: "80%",
        automation: "100%"
      },
      steps: [
        "Sistema genera factura automáticamente",
        "Envía factura por email al cliente",
        "Programa recordatorios de pago",
        "Procesa pago cuando se recibe",
        "Actualiza estado en sistema",
        "Notifica al equipo de finanzas"
      ]
    },
    {
      id: 6,
      title: "Gestión Automática de Reuniones",
      category: "Productividad",
      icon: Calendar,
      description: "Coordina reuniones, envía recordatorios y gestiona follow-ups automáticamente.",
      problem: "El equipo comercial perdía leads por falta de seguimiento y coordinación manual de reuniones.",
      solution: "Automatizamos la gestión completa de reuniones desde la programación hasta el seguimiento.",
      tools: ["Calendly", "Zoom", "Gmail", "n8n", "CRM"],
      benefits: [
        "Programación automática de reuniones",
        "Recordatorios automáticos",
        "Follow-up garantizado",
        "Aumento del 60% en conversión de leads"
      ],
      metrics: {
        conversionIncrease: "60%",
        followUpRate: "100%",
        timeToMeeting: "24 horas"
      },
      steps: [
        "Lead agenda reunión en Calendly",
        "Se crea evento en calendario",
        "Envía confirmación automática",
        "Recordatorio 24h antes",
        "Recordatorio 1h antes",
        "Follow-up automático post-reunión"
      ]
    }
  ]

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full h-full max-w-7xl mx-auto flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header fijo */}
            <div className="flex-shrink-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700 px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Casos de Uso Reales
                  </h2>
                  <p className="text-lg text-gray-300">
                    Descubre cómo hemos transformado negocios con automatización
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto bg-gray-950/95 backdrop-blur-md">
              <div className="px-4 sm:px-6 lg:px-8 py-8">
                {/* Use Cases Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {useCases.map((useCase, index) => (
                    <motion.div
                      key={useCase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full">
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 flex-shrink-0">
                              <useCase.icon className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <Badge variant="secondary" className="mb-2 text-xs">
                                {useCase.category}
                              </Badge>
                              <CardTitle className="text-white text-lg leading-tight">
                                {useCase.title}
                              </CardTitle>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {useCase.description}
                          </p>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Problem & Solution */}
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-red-400 font-semibold mb-1 flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                Problema
                              </h4>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                {useCase.problem}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-green-400 font-semibold mb-1 flex items-center gap-2 text-sm">
                                <CheckCircle className="w-3 h-3" />
                                Solución
                              </h4>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                {useCase.solution}
                              </p>
                            </div>
                          </div>

                          {/* Key Metrics */}
                          <div>
                            <h4 className="text-blue-400 font-semibold mb-2 text-sm">Métricas Clave</h4>
                            <div className="grid grid-cols-3 gap-3">
                              {Object.entries(useCase.metrics).map(([key, value]) => (
                                <div key={key} className="text-center bg-gray-700/30 rounded-lg p-2">
                                  <div className="text-sm font-bold text-white">{value}</div>
                                  <div className="text-xs text-gray-400 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tools Used */}
                          <div>
                            <h4 className="text-purple-400 font-semibold mb-2 text-sm">Herramientas</h4>
                            <div className="flex flex-wrap gap-1">
                              {useCase.tools.map((tool, toolIndex) => (
                                <Badge 
                                  key={toolIndex} 
                                  variant="outline" 
                                  className="text-xs border-gray-600 text-gray-300 px-2 py-1"
                                >
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h4 className="text-green-400 font-semibold mb-2 text-sm">Beneficios</h4>
                            <ul className="space-y-1">
                              {useCase.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="text-sm text-gray-400 flex items-start gap-2">
                                  <div className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0 mt-2" />
                                  <span className="leading-relaxed">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Process Steps */}
                          <div>
                            <h4 className="text-orange-400 font-semibold mb-2 text-sm">Proceso Automatizado</h4>
                            <div className="space-y-2">
                              {useCase.steps.slice(0, 4).map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start gap-2 text-sm">
                                  <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold text-xs flex-shrink-0 mt-0.5">
                                    {stepIndex + 1}
                                  </div>
                                  <span className="text-gray-400 leading-relaxed">{step}</span>
                                </div>
                              ))}
                              {useCase.steps.length > 4 && (
                                <div className="text-xs text-gray-500 ml-7">
                                  +{useCase.steps.length - 4} pasos más...
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Section */}
                <motion.div
                  className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    ¿Listo para automatizar tu negocio?
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Estos son solo algunos ejemplos. Cada negocio es único y creamos soluciones personalizadas 
                    para tus necesidades específicas.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                      onClick={() => {
                        onClose()
                        setTimeout(() => {
                          document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                        }, 100)
                      }}
                    >
                      Contáctanos Ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3"
                      onClick={onClose}
                    >
                      Cerrar
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
