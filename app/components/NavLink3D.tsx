'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

interface NavLink3DProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function NavLink3D({ href, children, className = '' }: NavLink3DProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const [isHovered, setIsHovered] = useState(false)

  const springProps = useSpring({
    transform: isHovered
      ? 'perspective(1000px) rotateX(10deg) rotateY(-10deg) scale(1.1)'
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    config: {
      mass: 1,
      tension: 300,
      friction: 20,
    },
  })

  return (
    <animated.div
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <Link
        href={href}
        className={`relative inline-block px-4 py-2 transition-colors duration-200 ${className}`}
      >
        <span className="relative z-10">{children}</span>
        
        {/* Background Effects */}
        {isActive && (
          <motion.div
            layoutId="nav-active"
            className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        
        {/* Hover Effects */}
        <div
          className="absolute inset-0 rounded-lg transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `
              linear-gradient(135deg, rgba(255,255,255,0.1), transparent),
              linear-gradient(to right, transparent, rgba(255,255,255,0.05))
            `,
          }}
        />
        
        {/* 3D Border Effect */}
        <div
          className="absolute inset-0 rounded-lg transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset',
            transform: 'translateZ(-1px)',
          }}
        />
      </Link>
    </animated.div>
  )
} 