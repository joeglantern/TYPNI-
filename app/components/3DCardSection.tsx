'use client'

import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/web'
import Image from 'next/image'
import { motion } from 'framer-motion'

const cards = [
  {
    title: "Youth Leadership",
    image: "/mediaa/1F1A6508.jpg",
    description: "Empowering young leaders through comprehensive training",
    color: "#590099",
  },
  {
    title: "Community Impact",
    image: "/mediaa/1F1A6444.jpg",
    description: "Creating positive change through local initiatives",
    color: "#FFBD00",
  },
  {
    title: "Global Network",
    image: "/mediaa/1F1A6469.jpg",
    description: "Connecting youth across borders",
    color: "#900059",
  },
  {
    title: "Innovation Hub",
    image: "/mediaa/1F1A6456.jpg",
    description: "Fostering creativity in youth-led projects",
    color: "#FF0054",
  },
]

function Card({ image, title, description, color, index }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const springProps = useSpring({
    transform: isHovered 
      ? 'perspective(1000px) rotateY(-15deg) rotateX(10deg) scale(1.1)'
      : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  })

  return (
    <animated.div
      className="relative w-full h-[400px] cursor-pointer"
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
          opacity-60 transition-opacity duration-300 z-10"
        />
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={index === 0}
        />
        <div 
          className="absolute inset-0 z-20 p-6 flex flex-col justify-end transform-gpu
          transition-transform duration-300"
          style={{
            transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)',
          }}
        >
          <h3 
            className="text-2xl font-bold text-white mb-3"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            {title}
          </h3>
          <p className="text-white/90 text-sm transform-gpu transition-all duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {description}
          </p>
        </div>
      </div>
      <div 
        className="absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, ${color}40, transparent)`,
          opacity: isHovered ? 1 : 0,
          transform: 'translateZ(-1px)',
        }}
      />
    </animated.div>
  )
}

export default function ThreeDCardSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#590099] via-[#FFBD00] to-[#FF0054]">Programs</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Explore our transformative programs designed to empower and inspire.
        </motion.p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Card key={card.title} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 