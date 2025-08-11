"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { MapPin, Linkedin, Twitter, Instagram, ArrowUp, Loader2 } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { trackNewsletterSignup } from "@/lib/analytics"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubscribed(true)
        setEmail("")
        trackNewsletterSignup()
        setTimeout(() => setIsSubscribed(false), 5000)
      } else {
        const data = await response.json()
        setError(data.error || "Error al suscribirse")
        setTimeout(() => setError(""), 3000)
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error)
      setError("Error de conexión")
      setTimeout(() => setError(""), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Zent AI
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Automatizamos el futuro, una integración a la vez. Transformamos procesos manuales en sistemas
                inteligentes.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                  onClick={() => window.open("https://linkedin.com/company/zentai", "_blank")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                  onClick={() => window.open("https://twitter.com/zentai", "_blank")}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                  onClick={() => window.open("https://instagram.com/zentai", "_blank")}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Servicios</h4>
              <ul className="space-y-2">
                {[
                  "Automatización con n8n",
                  "Agentes de IA",
                  "Integraciones API",
                  "Bots de WhatsApp",
                  "Optimización de procesos",
                  "Consultoría en automatización",
                ].map((service, index) => (
                  <li key={index}>
                    <button
                      className="text-gray-400 hover:text-white transition-colors text-left"
                      onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Enlaces</h4>
              <ul className="space-y-2">
                {[
                  { label: "Inicio", href: "#inicio" },
                  { label: "Servicios", href: "#servicios" },
                  { label: "Nosotros", href: "#nosotros" },
                  { label: "Contacto", href: "#contacto" },
                  { label: "Casos de Uso", href: "#" },
                  { label: "Blog", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <button
                      className="text-gray-400 hover:text-white transition-colors text-left"
                      onClick={() => {
                        if (link.href.startsWith("#") && link.href !== "#") {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Newsletter</h4>
              <p className="text-gray-400 text-sm">
                Recibe tips de automatización y casos de éxito directamente en tu email.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  disabled={isSubmitting || isSubscribed}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Suscribiendo...
                    </>
                  ) : isSubscribed ? (
                    "¡Suscrito!"
                  ) : (
                    "Suscribirse"
                  )}
                </Button>
              </form>

              {/* Status Messages */}
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm"
                >
                  ¡Gracias por suscribirte! Revisa tu email.
                </motion.p>
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">© {currentYear} Zent AI. Todos los derechos reservados.</p>
              <div className="flex space-x-4 text-sm">
                <button className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</button>
                <button className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Buenos Aires, Argentina</span>
              </div>
              <Button variant="ghost" size="sm" onClick={scrollToTop} className="text-gray-400 hover:text-white p-2">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
