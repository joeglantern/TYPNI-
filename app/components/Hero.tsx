'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                Young Peoples' Network International
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                A global network empowering young people to create positive change through collaboration, leadership, and community action.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-white text-black px-8 text-sm font-medium shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                href="/about"
              >
                Learn More
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-white text-white bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                href="/volunteer"
              >
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div ref={containerRef} className="mx-auto flex items-center justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-[400px]">
              <div className="glass-card absolute inset-0">
                <Image
                  alt="YPNI Logo"
                  className="mx-auto h-full w-full object-cover transition-all duration-300 hover:scale-105"
                  height={400}
                  src="/logo.png"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width={400}
                  priority
                />
              </div>
              <div
                className="absolute inset-0 rounded-xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(
                    800px circle at calc(100% * var(--mouse-x, 0.5)) calc(100% * var(--mouse-y, 0.5)),
                    rgba(var(--accent-rgb), 0.06),
                    transparent 40%
                  )`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 