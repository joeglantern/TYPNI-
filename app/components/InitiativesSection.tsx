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
  },
  {
    title: "Youth Mentorship",
    description: "Guiding the Leaders of Tomorrow. Our mentorship programs connect experienced professionals with young aspirants, fostering growth and development.",
    icon: BookOpen,
    color: "#FFBD00", // Radiant Yellow
    link: "/programs/mentorship",
  },
  {
    title: "Youth Employment",
    description: "Building Careers, Transforming Lives. TYPNI is dedicated to bridging the gap between education and employment through training and job placement.",
    icon: Award,
    color: "#900059", // Berry Burst
    link: "/programs/employment",
  },
  {
    title: "Entrepreneurship",
    description: "Innovation and creativity are the driving forces of economic growth. We support young entrepreneurs with training, resources, and funding opportunities.",
    icon: Rocket,
    color: "#FF0054", // Flamingo Pink
    link: "/programs/entrepreneurship",
  },
  {
    title: "Financial Literacy",
    description: "Financial independence is key to a secure future. Learn money management, saving, investing, and future planning through our programs.",
    icon: Target,
    color: "#590099", // Violet Hickey
    link: "/programs/financial-literacy",
  },
  {
    title: "Sports, Arts & Talent",
    description: "Unleashing Creative Potential. We promote youth development through sports, arts, and talent-based activities.",
    icon: Heart,
    color: "#FFBD00", // Radiant Yellow
    link: "/programs/arts-sports",
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
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      {/* Animated Background Elements */}
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
            Our <span className="text-[#590099] dark:text-[#FFBD00]">Initiatives</span>
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
                  className="relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    backgroundColor: `${initiative.color}10`,
                    borderLeft: `4px solid ${initiative.color}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${initiative.color}20` }}
                    >
                      <Icon 
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: initiative.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#590099] dark:group-hover:text-[#FFBD00] transition-colors">
                        {initiative.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {initiative.description}
                      </p>
                      <Link
                        href={initiative.link}
                        className="inline-flex items-center text-sm font-semibold hover:underline"
                        style={{ color: initiative.color }}
                      >
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 