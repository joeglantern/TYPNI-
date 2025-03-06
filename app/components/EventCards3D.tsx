'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import Image from 'next/image'

const events = [
  {
    title: "Youth Summit 2024",
    image: "/mediaa/1F1A34 (1977).jpg",
    date: "June 15-17, 2024",
    location: "Nairobi, Kenya",
    color: "#590099",
  },
  {
    title: "Leadership Workshop",
    image: "/mediaa/1F1A34 (1655).jpg",
    date: "July 8, 2024",
    location: "Virtual Event",
    color: "#FFBD00",
  },
  {
    title: "Community Day",
    image: "/mediaa/1F1A34 (930).jpg",
    date: "August 20, 2024",
    location: "Multiple Locations",
    color: "#900059",
  },
]

function EventCard({ image, title, date, location, color, index }) {
  const [isHovered, setIsHovered] = useState(false)

  const { transform, opacity } = useSpring({
    transform: isHovered
      ? 'perspective(1000px) rotateX(10deg) scale(1.05)'
      : 'perspective(1000px) rotateX(0deg) scale(1)',
    opacity: isHovered ? 1 : 0.8,
    config: {
      mass: 5,
      tension: 400,
      friction: 40,
    },
  })

  return (
    <animated.div
      className="relative w-full aspect-[16/9] cursor-pointer group"
      style={{ transform, opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index === 0}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom, 
              ${color}00 0%, 
              ${color}40 50%, 
              ${color}90 100%
            )`,
            opacity: isHovered ? 0.9 : 0.7,
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transform-gpu">
          <div className="transform-gpu transition-all duration-300 space-y-2"
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h3>
            <div className="flex flex-col space-y-1">
              <p className="text-white/90 text-sm md:text-base">
                {date}
              </p>
              <p className="text-white/80 text-sm">
                {location}
              </p>
            </div>
            <button
              className="mt-4 px-6 py-2 rounded-full text-sm font-semibold
                transition-all duration-300 transform-gpu
                bg-white/20 backdrop-blur-sm hover:bg-white/30
                border-2 text-white"
              style={{ borderColor: color }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* 3D Effect Elements */}
      <div 
        className="absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          background: `
            linear-gradient(45deg, ${color}40, transparent),
            linear-gradient(-45deg, transparent, ${color}20)
          `,
          opacity: isHovered ? 1 : 0,
          transform: 'translateZ(-1px)',
        }}
      />
    </animated.div>
  )
}

export default function EventCards3D() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Upcoming <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#590099] via-[#FFBD00] to-[#FF0054]">Events</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Join us at our upcoming events and be part of the change.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 