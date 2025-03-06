'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const programs = [
  {
    title: "Youth Leadership Academy",
    description: "Intensive training program for aspiring young leaders",
    image: "/mediaa/1F1A34 (230).jpg",
    color: "#590099",
  },
  {
    title: "Digital Skills Workshop",
    description: "Learn essential digital skills for the modern workplace",
    image: "/mediaa/1F1A34 (229).jpg",
    color: "#FFBD00",
  },
  {
    title: "Environmental Initiative",
    description: "Join our efforts to protect and preserve the environment",
    image: "/mediaa/1F1A34 (179).jpg",
    color: "#900059",
  },
  {
    title: "Creative Arts Program",
    description: "Express yourself through various forms of art",
    image: "/mediaa/1F1A34 (44).jpg",
    color: "#FF0054",
  },
]

export default function ProgramCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + programs.length) % programs.length)
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden bg-gradient-to-b from-background/50 to-background">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.4 },
            rotateY: { duration: 0.4 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute w-full max-w-3xl aspect-[16/9] cursor-grab active:cursor-grabbing"
          style={{ perspective: "1000px" }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={programs[currentIndex].image}
              alt={programs[currentIndex].title}
              fill
              className="object-cover"
              priority
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              style={{
                background: `linear-gradient(to top, ${programs[currentIndex].color}CC, transparent)`,
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">{programs[currentIndex].title}</h3>
              <p className="text-lg text-white/90">{programs[currentIndex].description}</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
} 