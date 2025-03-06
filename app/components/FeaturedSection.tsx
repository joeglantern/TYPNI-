import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    title: "Youth Leadership",
    description: "Empowering young leaders through comprehensive training and mentorship programs.",
    image: "/mediaa/1F1A6444.jpg",
    link: "/programs",
    color: "#590099", // Violet Hickey
  },
  {
    title: "Community Impact",
    description: "Creating positive change through local and global community initiatives.",
    image: "/mediaa/1F1A6469.jpg",
    link: "/about",
    color: "#FFBD00", // Radiant Yellow
  },
  {
    title: "Global Network",
    description: "Connecting youth across borders to foster international collaboration.",
    image: "/mediaa/1F1A6456.jpg",
    link: "/network",
    color: "#900059", // Berry Burst
  },
  {
    title: "Innovation Hub",
    description: "Fostering creativity and innovation in youth-led projects.",
    image: "/mediaa/1F1A6448.jpg",
    link: "/projects",
    color: "#FF0054", // Flamingo Pink
  },
]

export default function FeaturedSection() {
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
    hidden: { y: 50, opacity: 0 },
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
    <section className="py-24 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Programs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our initiatives that empower youth and create lasting impact in communities worldwide.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                {/* Card Background with Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                
                {/* Feature Image */}
                <div className="aspect-[4/5] relative">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ textShadow: `0 2px 4px rgba(0,0,0,0.5)` }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-white/90 mb-4 line-clamp-2">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.link}
                    className="inline-flex items-center text-sm font-semibold py-2 px-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    style={{
                      backgroundColor: `${feature.color}40`,
                      borderColor: feature.color,
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 