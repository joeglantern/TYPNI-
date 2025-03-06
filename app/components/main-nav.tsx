'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import NavLink3D from './NavLink3D'
import FloatingShapes from './FloatingShapes'
import { motion } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-50">
      <div className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Floating Shapes in Background */}
        <FloatingShapes variant="minimal" className="opacity-50" />
        
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#590099] to-[#FF0054] rounded-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 w-full h-full bg-white dark:bg-gray-900 rounded-lg p-1">
                  <img src="/logo.png" alt="TYPNI Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight">TYPNI</span>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            {links.map((link) => (
              <NavLink3D
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {link.label}
              </NavLink3D>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
} 
