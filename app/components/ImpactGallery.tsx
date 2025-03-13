'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { getImageQuality, shouldPrioritize } from '@/lib/image-utils'

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
]

export default function ImpactGallery() {
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

  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-center">
          Our Impact Gallery
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {galleryImages.map((image, index) => (
            <div key={image.src} className="relative">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-md">
                <OptimizedImage
                  src={image.src}
                  alt={image.title}
                  aspectRatio="4/3"
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={shouldPrioritize(index, isMobile)}
                  quality={getImageQuality(isMobile, index < 3)}
                  fadeIn={true}
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                  <h3 className="text-white font-bold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 