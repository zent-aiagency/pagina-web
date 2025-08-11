"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { trackContactFormSubmit, trackWhatsAppClick, trackCalendlyClick } from "@/lib/analytics"

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simular envío (aquí integrarías con tu backend o servicio de email)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", company: "", message: "" })

        trackContactFormSubmit()

        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        throw new Error("Error al enviar el mensaje")
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus("error")

      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me interesa conocer más sobre sus servicios de automatización.")
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491112345678"
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
    trackWhatsAppClick()
  }

  const openCalendly = () => {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/zentai/consulta-gratuita"
    window.open(calendlyUrl, "_blank")
    trackCalendlyClick()
  }

  return (
    <section id="contacto" className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Automatizá tu negocio con nosotros
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Listo para transformar tus procesos? Contáctanos y descubre cómo podemos ayudarte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Send className="h-6 w-6 text-orange-400" />
                  Envíanos un mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Tu nombre *"
                        value={formData.name}
                        onChange={handleChange}
                        className={`bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Tu email *"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Tu teléfono (opcional)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                    />
                    <Input
                      type="text"
                      name="company"
                      placeholder="Tu empresa (opcional)"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Cuéntanos sobre tu proyecto y qué procesos quieres automatizar... *"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 resize-none ${
                        errors.message ? "border-red-500" : ""
                      }`}
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-3"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>¡Mensaje enviado exitosamente! Te contactaremos pronto.</span>
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3"
                      >
                        <AlertCircle className="h-5 w-5" />
                        <span>Error al enviar el mensaje. Por favor, intenta nuevamente.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              {
                icon: Mail,
                title: "Email",
                info: "hola@zentai.agency",
                action: () => window.open("mailto:hola@zentai.agency", "_blank"),
              },
              {
                icon: Phone,
                title: "WhatsApp",
                info: "+54 9 11 1234-5678",
                action: openWhatsApp,
              },
              {
                icon: MapPin,
                title: "Ubicación",
                info: "Buenos Aires, Argentina",
                action: () => {},
              },
            ].map((contact, index) => (
              <Card
                key={index}
                className={`bg-gray-800/50 border-gray-700 hover:border-orange-500/30 transition-all duration-300 ${
                  contact.action && contact.title !== "Ubicación" ? "cursor-pointer" : ""
                }`}
                onClick={contact.action}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                      <contact.icon className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
                      <p className="text-gray-400">{contact.info}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">¿Prefieres una llamada?</h3>
              <p className="text-gray-300 mb-4">Agenda una consulta gratuita de 30 minutos para discutir tu proyecto</p>
              <Button
                onClick={openCalendly}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              >
                Agendar Llamada Gratuita
              </Button>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700 text-white py-3">
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                onClick={() => window.open("mailto:hola@zentai.agency", "_blank")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
