'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import Image from 'next/image'

const testimonials = [
  {
    name: "Hon. Charlene Ruto",
    role: "Patron",
    quote: "TYPNI has transformed my perspective on leadership and community service. The programs they offer are truly life-changing.",
    image: "/mediaa/1F1A6508.jpg",
    color: "#590099",
  },
  {
    name: "Festus Orina",
    role: "Program Lead",
    quote: "Being part of the global network has opened up countless opportunities for collaboration and growth.",
    image: "/mediaa/1F1A34 (179).jpg",
    color: "#FFBD00",
  },
  {
    name: "Joseph Liban",
    role: "Program Participant",
    quote: "The impact TYPNI has had on our local community is remarkable. They truly empower young people to make a difference.",
    image: "",  // No photo provided
    color: "#900059",
  },
]

function TestimonialCard({ name, role, quote, image, color, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const calc = (x, y) => {
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    return [-(y - centerY) / 20, (x - centerX) / 20, 1.1]
  }

  const trans = (x, y, s) => 
    `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  return (
    <animated.div
      ref={cardRef}
      className="relative w-full aspect-square cursor-pointer"
      onMouseMove={({ clientX, clientY }) => {
        const [x, y, s] = calc(clientX, clientY)
        set({ xys: [x, y, s] })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        set({ xys: [0, 0, 1] })
      }}
      style={{
        transform: props.xys.to(trans),
      }}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(${color}40 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col items-center justify-center text-center">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mb-6">
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(45deg, ${color}, transparent)`,
                transform: 'scale(1.2)',
                filter: 'blur(20px)',
                opacity: 0.5,
              }}
            />
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-full"
              sizes="96px"
              priority={index === 0}
            />
          </div>

          {/* Quote */}
          <blockquote className="mb-6">
            <p className="text-lg italic text-muted-foreground">"{quote}"</p>
          </blockquote>

          {/* Author Info */}
          <div>
            <h4 className="font-bold text-xl mb-1">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>

          {/* Decorative Elements */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 opacity-20"
            style={{
              background: `radial-gradient(circle at top right, ${color}60, transparent 70%)`,
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-32 h-32 opacity-20"
            style={{
              background: `radial-gradient(circle at bottom left, ${color}60, transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* 3D Effect Border */}
      <div 
        className="absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, ${color}40, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </animated.div>
  )
}

export default function TestimonialCards3D() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          What Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#590099] via-[#FFBD00] to-[#FF0054]">Community</span> Says
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Hear from the young leaders who have been part of our journey.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 
