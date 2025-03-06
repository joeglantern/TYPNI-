import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const galleryImages = [
  {
    src: "/mediaa/1F1A34 (1977).jpg",
    title: "Community Outreach",
    category: "Impact",
    description: "Engaging with local communities to create sustainable change",
  },
  {
    src: "/mediaa/1F1A34 (1655).jpg",
    title: "Youth Leadership",
    category: "Programs",
    description: "Developing tomorrow's leaders through hands-on experience",
  },
  {
    src: "/mediaa/1F1A34 (930).jpg",
    title: "Global Connections",
    category: "Network",
    description: "Building bridges across cultures and continents",
  },
  {
    src: "/mediaa/1F1A34 (623).jpg",
    title: "Educational Initiatives",
    category: "Education",
    description: "Empowering through knowledge and skill development",
  },
  {
    src: "/mediaa/1F1A34 (517).jpg",
    title: "Cultural Exchange",
    category: "Culture",
    description: "Celebrating diversity and fostering understanding",
  },
  {
    src: "/mediaa/1F1A34 (381).jpg",
    title: "Innovation Projects",
    category: "Innovation",
    description: "Creating solutions for tomorrow's challenges",
  },
]

export default function ImpactGallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background/80 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-[#900059]/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#FF0054]/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-[#FFBD00]/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#900059] via-[#FFBD00] to-[#FF0054]">
            Our Impact Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Witness the transformative power of youth engagement through our visual journey.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-2">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />
                
                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  quality={90}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 border-2 backdrop-blur-sm"
                      style={{
                        backgroundColor: 
                          image.category === 'Impact' ? '#59009920' :
                          image.category === 'Programs' ? '#FFBD0020' :
                          image.category === 'Network' ? '#90005920' :
                          '#FF005420',
                        borderColor:
                          image.category === 'Impact' ? '#590099' :
                          image.category === 'Programs' ? '#FFBD00' :
                          image.category === 'Network' ? '#900059' :
                          '#FF0054',
                        color: 'white',
                      }}
                    >
                      {image.category}
                    </span>
                    <h3 
                      className="text-2xl font-bold text-white mb-2"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Corner Accent */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at top right, ${
                      image.category === 'Impact' ? '#59009940' :
                      image.category === 'Programs' ? '#FFBD0040' :
                      image.category === 'Network' ? '#90005940' :
                      '#FF005440'
                    }, transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 