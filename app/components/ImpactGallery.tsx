import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const galleryImages = [
  {
    src: "/mediaa/1F1A34 (230).jpg",
    title: "Community Outreach",
    category: "Impact",
  },
  {
    src: "/mediaa/1F1A34 (229).jpg",
    title: "Youth Leadership",
    category: "Programs",
  },
  {
    src: "/mediaa/1F1A34 (179).jpg",
    title: "Global Connections",
    category: "Network",
  },
  {
    src: "/mediaa/1F1A34 (44).jpg",
    title: "Educational Initiatives",
    category: "Education",
  },
  {
    src: "/mediaa/1F1A34 (230).jpg",
    title: "Cultural Exchange",
    category: "Culture",
  },
  {
    src: "/mediaa/1F1A34 (229).jpg",
    title: "Innovation Projects",
    category: "Innovation",
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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#900059] to-[#FF0054]">
            Our Impact Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg bg-white">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
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
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 border-2"
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
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {image.category}
                    </span>
                    <h3 
                      className="text-xl font-bold text-white"
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 