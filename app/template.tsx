'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Template({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  const loadingMessages = [
    "Building International Connections...",
    "Loading Awesomeness...",
    "Empowering Youth Globally...",
    "Creating Positive Impact...",
    "Transforming Communities...",
    "Fostering Leadership...",
  ]

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length)
    }, 2000)

    // Complete loading after progress reaches 100%
    const loadingTimer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(loadingTimer)
    }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative w-[160px] h-[160px] inline-block mb-8">
            <Image
              src="/logo.png"
              alt="TYPNI Logo"
              width={160}
              height={160}
              className="animate-float"
              priority
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-20 blur-2xl animate-pulse" />
          </div>
          
          <div className="space-y-6">
            <p className="text-lg font-medium text-foreground/80 h-8 transition-all duration-300 animate-fade-in">
              {loadingMessages[messageIndex]}
            </p>
            
            <div className="relative">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
} 