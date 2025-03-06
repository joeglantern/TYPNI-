'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, ChevronLeft, ChevronRight, Users } from 'lucide-react'

const events = [
  {
    title: "Youth Leadership Summit 2024",
    date: "June 15-17, 2024",
    location: "Nairobi, Kenya",
    attendees: "500+ Expected",
    description: "Join young leaders from across Africa for three days of inspiration, learning, and networking.",
    image: "/mediaa/1F1A34 (623).jpg",
    color: "#590099",
  },
  {
    title: "Tech Innovation Bootcamp",
    date: "July 8-12, 2024",
    location: "Virtual Event",
    attendees: "200+ Participants",
    description: "Learn cutting-edge technology skills from industry experts in this intensive online bootcamp.",
    image: "/mediaa/1F1A34 (517).jpg",
    color: "#FFBD00",
  },
  {
    title: "Community Impact Day",
    date: "August 20, 2024",
    location: "Multiple Locations",
    attendees: "1000+ Volunteers",
    description: "A day of coordinated community service projects across multiple cities.",
    image: "/mediaa/1F1A34 (381).jpg",
    color: "#900059",
  },
]

export default function EventsCarousel3D() {
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

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + events.length) % events.length)
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-b from-background/80 to-background">
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
            className="absolute w-full max-w-5xl px-4"
            style={{ perspective: "1000px" }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl">
              <div className="grid md:grid-cols-[2fr,3fr]">
                {/* Content Section */}
                <div className="relative p-8 md:p-12 flex flex-col justify-center bg-white/5 backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `linear-gradient(45deg, ${events[currentIndex].color}, transparent)`,
                    }}
                  />
                  <div className="relative space-y-6">
                    <h3 
                      className="text-3xl md:text-4xl font-bold"
                      style={{ color: events[currentIndex].color }}
                    >
                      {events[currentIndex].title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {events[currentIndex].description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-5 h-5" />
                        <span>{events[currentIndex].date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        <span>{events[currentIndex].location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-5 h-5" />
                        <span>{events[currentIndex].attendees}</span>
                      </div>
                    </div>
                    <button
                      className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: events[currentIndex].color }}
                    >
                      Register Now
                    </button>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative h-[300px] md:h-[500px]">
                  <Image
                    src={events[currentIndex].image}
                    alt={events[currentIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to left, ${events[currentIndex].color}99, transparent)`,
                    }}
                  />
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