'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"
import { Home, Book, Calendar, Edit, Image as ImageIcon, Info, User, Settings, Handshake, CreditCard, Heart } from 'lucide-react'
import { useEffect, useState } from "react"

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/programs', label: 'Programs', icon: Book },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/blog', label: 'Blog', icon: Edit },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/partners', label: 'Partners', icon: Handshake },
  { href: '/membership', label: 'Membership', icon: CreditCard },
  { href: '/about', label: 'About', icon: Info },
  { href: '/donate', label: 'Donate', icon: Heart },
  { href: '/polls', label: 'Polls', icon: Home }
]

export function MainNav() {
  const pathname = usePathname()
  const [session, setSession] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      setSession(currentSession)

      if (currentSession) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentSession.user.id)
          .single()

        setIsAdmin(profile?.role === 'admin')
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-2 hidden md:flex flex-1">
          <Link href="/" className="mr-4 flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="TYPNI Logo"
              width={28}
              height={28}
              className="animate-float"
              priority
            />
            <span className="hidden font-bold sm:inline-block">
              TYPNI
            </span>
          </Link>
          <nav className="flex items-center space-x-2 text-sm font-medium overflow-x-auto no-scrollbar">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 flex items-center gap-1.5 px-2 py-1 rounded-md whitespace-nowrap",
                  pathname === link.href ? "text-foreground bg-accent" : "text-foreground/60"
                )}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-1">
            <ThemeToggle />
            {session ? (
              <>
                {isAdmin && (
                  <Button variant="ghost" size="sm" asChild className="h-8">
                    <Link href="/admin" className="flex items-center gap-1.5">
                      <Settings className="h-3.5 w-3.5" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" asChild className="h-8">
                  <Link href="/profile" className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    Profile
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="h-8">
                  <Link href="/auth/login">Log In</Link>
                </Button>
                <Button variant="default" size="sm" asChild className="h-8">
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 
