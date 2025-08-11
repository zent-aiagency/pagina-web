'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Workflow, Brain, Sheet, MessageCircle, Database, Zap, GitBranch } from 'lucide-react'
import { motion } from 'framer-motion'

export function ToolsSection() {
  const tools = [
    { name: 'n8n', icon: Workflow, color: 'text-red-400' },
    { name: 'OpenAI', icon: Brain, color: 'text-green-400' },
    { name: 'Google Sheets', icon: Sheet, color: 'text-green-500' },
    { name: 'WhatsApp API', icon: MessageCircle, color: 'text-green-500' },
    { name: 'PostgreSQL', icon: Database, color: 'text-blue-400' },
    { name: 'Make', icon: GitBranch, color: 'text-purple-400' },
    { name: 'Zapier', icon: Zap, color: 'text-orange-400' }
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Herramientas que Dominamos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trabajamos con las mejores tecnologías para crear soluciones robustas y escalables
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800/40 border-gray-700 hover:border-gray-600 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 group-hover:border-gray-500/50 transition-all">
                      <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {tool.name}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-400 text-lg">
            Y muchas más herramientas según las necesidades específicas de tu proyecto
          </p>
        </motion.div>
      </div>
    </section>
  )
}
