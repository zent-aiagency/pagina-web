import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { OptimizedAnimatedGradientText, OptimizedSplitText } from '@/components/animations/optimized-animated-text'

export function AboutUsSection() {
  const team = [
    {
      name: 'Francisco Sobral',
      role: 'Ingeniero de Automatización',
      description: 'Especialista en n8n y arquitectura de sistemas. 5+ años automatizando procesos complejos para empresas de tecnología.',
      skills: ['n8n', 'Node.js', 'APIs', 'PostgreSQL'],
      image: '/francisco-sobral-headshot.png'
    },
    {
      name: 'Isidro Pasman',
      role: 'Estratega en IA',
      description: 'Experto en inteligencia artificial y optimización de procesos. Transforma ideas complejas en soluciones automatizadas simples.',
      skills: ['OpenAI', 'Machine Learning', 'Strategy', 'Process Design'],
      image: '/isidro-pasman-headshot.png'
    }
  ]

  return (
    <section id="nosotros" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <OptimizedAnimatedGradientText 
              text="Sobre Nosotros"
              colors={['#FBBF24', '#F59E0B', '#D97706', '#B45309']}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OptimizedSplitText 
              text="Somos apasionados por simplificar operaciones con automatización e inteligencia artificial"
              staggerDelay={0.03}
              delay={0.5}
            />
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 group-hover:border-yellow-500/50 transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-100 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-yellow-400 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                      {member.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">Especialidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant="secondary" 
                            className="bg-gray-700/50 text-gray-300 hover:bg-yellow-500/20 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="p-2 bg-gray-700/50 rounded-lg hover:bg-blue-500/20 transition-colors cursor-pointer">
                        <Linkedin className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer">
                        <Github className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
