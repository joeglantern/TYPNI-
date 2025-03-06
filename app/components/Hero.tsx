'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessagesSquare } from 'lucide-react'
import dynamic from 'next/dynamic'
import FloatingShapes from './FloatingShapes'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'

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
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])

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

  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const calc = (x: number, y: number) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.1,
  ]

  const trans = (x: number, y: number, s: number) =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

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
      <FloatingShapes variant="colorful" className="opacity-30" />

      <motion.div style={{ y }} className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            {/* Logo above text */}
            <animated.div
              onMouseMove={({ clientX, clientY }) => {
                const rect = containerRef.current?.getBoundingClientRect()
                if (!rect) return
                const x = clientX - rect.left
                const y = clientY - rect.top
                set({ xys: calc(x, y) })
              }}
              onMouseLeave={() => set({ xys: [0, 0, 1] })}
              style={{
                transform: props.xys.to(trans),
              }}
              className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 relative hover:bg-white/20 transition-all duration-300"
            >
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
            </animated.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                The Young Peoples' Network International
              </h1>
              <p className="max-w-[600px] text-white/90 text-base md:text-xl">
                A global network empowering young people to create positive change through collaboration, leadership, and community action.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full sm:w-auto"
            >
              <Link
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white text-black px-6 text-sm font-medium shadow transition-all duration-300 hover:bg-white/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transform-gpu"
                href="/about"
              >
                Learn More
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white text-white bg-transparent px-6 text-sm font-medium shadow-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transform-gpu"
                href="/volunteer"
              >
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 text-white px-6 text-sm font-medium shadow transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transform-gpu"
                href="/chat"
              >
                Join Chat
                <MessagesSquare className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          {/* Earth Globe */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto w-full h-[350px] md:h-[500px] lg:h-full flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-[400px] lg:max-w-[600px] relative">
              <EarthGlobe />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 