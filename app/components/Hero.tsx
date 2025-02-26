'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessagesSquare } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the EarthGlobe component with no SSR
const EarthGlobe = dynamic(() => import('./EarthGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse w-64 h-64 rounded-full bg-white/10" />
    </div>
  ),
})

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = ev
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (clientX - left) / width
      const y = (clientY - top) / height
      containerRef.current.style.setProperty('--mouse-x', `${x}`)
      containerRef.current.style.setProperty('--mouse-y', `${y}`)
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Geometric colorful Background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            {/* Logo above text */}
            <div className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 relative hover:bg-white/20 transition-all duration-300">
              <Image
                alt="YPNI Logo"
                src="/logo.png"
                width={200}
                height={200}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                priority
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
                }}
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                The Young Peoples' Network International
              </h1>
              <p className="max-w-[600px] text-white/90 text-base md:text-xl">
                A global network empowering young people to create positive change through collaboration, leadership, and community action.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white text-black px-6 text-sm font-medium shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                href="/about"
              >
                Learn More
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white text-white bg-transparent px-6 text-sm font-medium shadow-sm transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                href="/volunteer"
              >
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 text-white px-6 text-sm font-medium shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                href="/chat"
              >
                Join Chat
                <MessagesSquare className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* Earth Globe */}
          <div ref={containerRef} className="mx-auto w-full h-[350px] md:h-[500px] lg:h-full flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[400px] lg:max-w-[600px] relative">
              <EarthGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 