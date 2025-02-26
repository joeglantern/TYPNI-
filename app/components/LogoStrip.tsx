'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const logos = [
  '/TYPNI-11.jpg',
  '/TYPNI-12.jpg',
  '/TYPNI-13.jpg',
  '/TYPNI-14.jpg',
  '/TYPNI-16.jpg',
  '/TYPNI-18.jpg',
  '/TYPNI-19.jpg',
  '/TYPNI-20.jpg',
  '/TYPNI-22.jpg',
  '/TYPNI-23.jpg',
  '/TYPNI-24.jpg',
  '/TYPNI-25.jpg',
]

export default function LogoStrip() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <div className="relative w-full inline-flex flex-nowrap">
        <div className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-marquee">
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="mx-12 flex-shrink-0"
            >
              <div className="relative w-32 h-32 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4">
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  fill
                  className="object-contain p-2 hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-marquee" aria-hidden="true">
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="mx-12 flex-shrink-0"
            >
              <div className="relative w-32 h-32 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4">
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  fill
                  className="object-contain p-2 hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 