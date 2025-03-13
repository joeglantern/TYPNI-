'use client'

import { useState } from 'react'
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
]

export default function ProgramCarousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + programs.length) % programs.length)
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-3xl aspect-[16/9]">
          <Image
            src={programs[currentIndex].image}
            alt={programs[currentIndex].title}
            fill
            className="object-cover rounded-2xl"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-black/50 rounded-b-2xl">
            <h3 className="text-3xl font-bold mb-2">{programs[currentIndex].title}</h3>
            <p className="text-lg">{programs[currentIndex].description}</p>
          </div>
        </div>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
} 