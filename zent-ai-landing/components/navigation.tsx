'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, FileText } from 'lucide-react'
import { UseCasesModal } from './sections/use-cases-section'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUseCases, setShowUseCases] = useState(false)

  const navItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Pequeño delay para que se cierre el menú móvil primero
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Zent AI
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  size="sm"
                  onClick={() => setShowUseCases(true)}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-3 py-2 text-sm font-medium ml-2"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Casos de Uso
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <Button 
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              >
                Contáctanos
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  setShowUseCases(true)
                  setIsOpen(false)
                }}
                className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white w-full justify-start px-3 py-2 text-base font-medium mb-2"
              >
                <FileText className="h-4 w-4 mr-2" />
                Casos de Uso
              </Button>
              <div className="pt-2">
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Contáctanos
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modal de Casos de Uso */}
      <UseCasesModal 
        isOpen={showUseCases} 
        onClose={() => setShowUseCases(false)} 
      />
    </>
  )
}
