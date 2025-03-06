'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

const mediaImages = [
  '/mediaa/1F1A34 (230).jpg',
  '/mediaa/1F1A34 (229).jpg',
  '/mediaa/1F1A34 (179).jpg',
  '/mediaa/1F1A34 (44).jpg',
  '/mediaa/1F1A34 (230).jpg',
  '/mediaa/1F1A34 (229).jpg',
]

export default function GallerySection() {
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
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Our Impact
        </motion.h2>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {mediaImages.map((image, index) => (
            <motion.div
              key={image}
              variants={itemVariants}
              className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
                index % 2 === 0 ? 'md:translate-y-12' : ''
              }`}
            >
              <Image
                src={image}
                alt={`Impact Image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={90}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 