import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users2, BookOpen, Award, Target, Heart, Rocket } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const initiatives = [
  {
    title: "Youth Empowerment",
    description: "Unlocking Potential, Building Futures. We are committed to empowering young people to take charge of their lives and futures through workshops, leadership programs, and community engagement.",
    icon: Users2,
    color: "#590099", // Violet Hickey
    link: "/programs/empowerment",
    gradient: "from-[#590099] to-[#9b4dff]",
  },
  {
    title: "Youth Mentorship",
    description: "Guiding the Leaders of Tomorrow. Our mentorship programs connect experienced professionals with young aspirants, fostering growth and development.",
    icon: BookOpen,
    color: "#FFBD00", // Radiant Yellow
    link: "/programs/mentorship",
    gradient: "from-[#FFBD00] to-[#FFA500]",
  },
  {
    title: "Youth Employment",
    description: "Building Careers, Transforming Lives. TYPNI is dedicated to bridging the gap between education and employment through training and job placement.",
    icon: Award,
    color: "#900059", // Berry Burst
    link: "/programs/employment",
    gradient: "from-[#900059] to-[#FF1493]",
  },
  {
    title: "Entrepreneurship",
    description: "Innovation and creativity are the driving forces of economic growth. We support young entrepreneurs with training, resources, and funding opportunities.",
    icon: Rocket,
    color: "#FF0054", // Flamingo Pink
    link: "/programs/entrepreneurship",
    gradient: "from-[#FF0054] to-[#FF69B4]",
  },
  {
    title: "Financial Literacy",
    description: "Financial independence is key to a secure future. Learn money management, saving, investing, and future planning through our programs.",
    icon: Target,
    color: "#590099", // Violet Hickey
    link: "/programs/financial-literacy",
    gradient: "from-[#590099] to-[#9370DB]",
  },
  {
    title: "Sports, Arts & Talent",
    description: "Unleashing Creative Potential. We promote youth development through sports, arts, and talent-based activities.",
    icon: Heart,
    color: "#FFBD00", // Radiant Yellow
    link: "/programs/arts-sports",
    gradient: "from-[#FFBD00] to-[#FFD700]",
  },
]

export default function InitiativesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-background dark:via-background/80 dark:to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-[#590099]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#FFBD00]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-[#FF0054]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#590099] via-[#FFBD00] to-[#FF0054]">Initiatives</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering youth through comprehensive programs and initiatives that foster growth, leadership, and success.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon
            return (
              <motion.div
                key={initiative.title}
                variants={itemVariants}
                className="group relative"
              >
                <div 
                  className="relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800"
                  style={{
                    background: `linear-gradient(135deg, ${initiative.color}05 0%, ${initiative.color}10 100%)`,
                  }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${initiative.color} 0%, transparent 100%)`,
                    }}
                  />
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${initiative.color} 0%, transparent 100%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div 
                      className="p-4 rounded-xl mb-6 w-16 h-16 flex items-center justify-center bg-gradient-to-br transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${initiative.color}20 0%, ${initiative.color}30 100%)`,
                      }}
                    >
                      <Icon 
                        className="w-8 h-8 transition-transform duration-300"
                        style={{ color: initiative.color }}
                      />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r group-hover:bg-gradient-to-br transition-colors duration-300"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${initiative.color}, ${initiative.color}dd)`,
                      }}
                    >
                      {initiative.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {initiative.description}
                    </p>

                    <Link
                      href={initiative.link}
                      className="inline-flex items-center text-sm font-semibold hover:underline"
                      style={{ color: initiative.color }}
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Corner Accent */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${initiative.color}40, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 