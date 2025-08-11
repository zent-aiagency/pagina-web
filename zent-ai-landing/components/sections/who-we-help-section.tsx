import { Card, CardContent } from '@/components/ui/card'
import { Megaphone, Truck, ShoppingCart, Rocket, Briefcase } from 'lucide-react'
import { OptimizedGlitchText, OptimizedRevealText } from '@/components/animations/optimized-animated-text'
import { motion } from 'framer-motion'

export function WhoWeHelpSection() {
  const clients = [
    {
      icon: Megaphone,
      title: 'Agencias Digitales',
      description: 'Automatiza reportes de clientes, gestión de campañas y procesos de onboarding.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Truck,
      title: 'Equipos de Logística',
      description: 'Optimiza cadenas de suministro, tracking de envíos y gestión de inventario.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: ShoppingCart,
      title: 'Negocios de E-commerce',
      description: 'Automatiza procesamiento de pedidos, atención al cliente y gestión de stock.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Rocket,
      title: 'Startups y PYMEs',
      description: 'Escala operaciones sin aumentar costos, automatiza procesos críticos.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Briefcase,
      title: 'Empresas de Servicios',
      description: 'Mejora eficiencia operativa, automatiza facturación y gestión de clientes.',
      color: 'from-purple-500 to-violet-500'
    }
  ]

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <OptimizedGlitchText 
              text="A Quién Ayudamos"
              className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
              intensity={1.5}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OptimizedRevealText 
              text="Trabajamos con empresas de todos los tamaños que buscan optimizar sus operaciones"
              direction="left"
            />
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <Card 
              key={index} 
              className="bg-gray-800/40 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 group overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardContent className="p-6 relative z-10">
                <div className="mb-4 flex justify-center">
                  <div className={`p-4 bg-gradient-to-r ${client.color} bg-opacity-20 rounded-full border border-current border-opacity-30`}>
                    <client.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white group-hover:text-gray-100 transition-colors">
                  {client.title}
                </h3>
                <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors">
                  {client.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
