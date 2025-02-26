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
    <div className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-gray-600 font-medium mb-8">Trusted by organizations worldwide</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Replace these with actual partner logos */}
          <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">Partner 1</span>
          </div>
          <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">Partner 2</span>
          </div>
          <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">Partner 3</span>
          </div>
          <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">Partner 4</span>
          </div>
          <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">Partner 5</span>
          </div>
        </div>
      </div>
    </div>
  )
} 