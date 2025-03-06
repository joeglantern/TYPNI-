'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const stories = [
  {
    name: "Sarah Kimani",
    role: "Youth Leader",
    story: "Through TYPNI's leadership program, I developed the confidence to start a community initiative that now impacts over 200 young people.",
    image: "/mediaa/1F1A34 (1977).jpg",
    color: "#590099",
  },
  {
    name: "James Omondi",
    role: "Tech Entrepreneur",
    story: "The digital skills training opened new opportunities. I now run a successful tech startup employing 15 young professionals.",
    image: "/mediaa/1F1A34 (1655).jpg",
    color: "#FFBD00",
  },
  {
    name: "Lucy Wanjiku",
    role: "Environmental Activist",
    story: "TYPNI's support helped me launch a recycling program that's transformed waste management in my community.",
    image: "/mediaa/1F1A34 (930).jpg",
    color: "#900059",
  },
]

export default function SuccessCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + stories.length) % stories.length)
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
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
              rotateY: { duration: 0.4 },
            }}
            className="absolute w-full max-w-4xl px-4"
            style={{ perspective: "1000px" }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl">
              <div className="grid md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-[300px] md:h-[500px]">
                  <Image
                    src={stories[currentIndex].image}
                    alt={stories[currentIndex].name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, ${stories[currentIndex].color}99, transparent)`,
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className="relative p-8 md:p-12 flex flex-col justify-center">
                  <Quote 
                    className="absolute top-8 right-8 w-12 h-12 opacity-10"
                    style={{ color: stories[currentIndex].color }}
                  />
                  <div className="space-y-6">
                    <blockquote className="text-xl md:text-2xl italic text-muted-foreground">
                      "{stories[currentIndex].story}"
                    </blockquote>
                    <div>
                      <h3 
                        className="text-2xl font-bold"
                        style={{ color: stories[currentIndex].color }}
                      >
                        {stories[currentIndex].name}
                      </h3>
                      <p className="text-muted-foreground">{stories[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
} 