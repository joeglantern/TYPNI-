"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Menu,
  Home,
  Book,
  Calendar,
  Edit,
  Image as ImageIcon,
  MessageCircle,
  BarChart,
  Info,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function MobileNav({ links, currentPath }: { links: NavLink[], currentPath: string }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  // Prefetch all links when component mounts
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefetchLinks = () => {
        links.forEach((link) => {
          router.prefetch(link.href)
        })
      }
      
      // Use requestIdleCallback for non-critical operations
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(prefetchLinks)
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(prefetchLinks, 200)
      }
    }
  }, [router, links])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
        <SheetHeader className="px-4 py-3 border-b">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="TYPNI Logo"
              width={32}
              height={32}
              className="animate-float"
              priority
            />
            <SheetTitle>TYPNI</SheetTitle>
          </Link>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-64px)]">
          <nav className="flex-1 overflow-y-auto py-2">
            <div className="space-y-1 px-2">
              {links.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                      currentPath === link.href 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </nav>
          <div className="border-t p-4 flex items-center justify-between">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 