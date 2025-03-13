'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { getImageQuality, shouldPrioritize } from '@/lib/image-utils'

const mediaImages = [
  '/mediaa/1F1A34 (230).jpg',
  '/mediaa/1F1A34 (229).jpg',
  '/mediaa/1F1A34 (179).jpg',
  '/mediaa/1F1A34 (44).jpg',
  '/mediaa/1F1A34 (517).jpg',
  '/mediaa/1F1A34 (381).jpg',
]

export default function GallerySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 20,
      },
    },
  }

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FFBD00] to-[#FF0054]"
        >
          Our Impact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-16"
        >
          Creating positive change through youth empowerment and community engagement.
        </motion.p>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto"
        >
          {mediaImages.map((image, index) => (
            <motion.div
              key={`gallery-image-${index}-${image}`}
              variants={itemVariants}
              className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white ${
                !isMobile && index % 2 === 0 ? 'md:translate-y-12' : ''
              }`}
            >
              <OptimizedImage
                src={image}
                alt={`Impact Image ${index + 1}`}
                aspectRatio="4/3"
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={shouldPrioritize(index, isMobile)}
                quality={getImageQuality(isMobile, index < 2)}
                fadeIn={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 