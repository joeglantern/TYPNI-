'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  lowQuality?: boolean;
  fadeIn?: boolean;
  aspectRatio?: string;
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  quality,
  priority,
  loading,
  sizes,
  lowQuality = false,
  fadeIn = true,
  aspectRatio,
  containerClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      checkMobile()
      window.addEventListener('resize', checkMobile)
      
      return () => {
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  // Default sizes if not provided
  const defaultSizes = sizes || (
    '(max-width: 640px) 100vw, ' +
    '(max-width: 768px) 80vw, ' +
    '(max-width: 1024px) 60vw, ' +
    '(max-width: 1280px) 50vw, ' +
    '33vw'
  )

  // Default quality based on device and lowQuality prop
  const imageQuality = quality || (lowQuality ? 60 : (isMobile ? 75 : 85))

  // Use eager loading for priority images
  const imageLoading = priority ? 'eager' : (loading || 'lazy')

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
  }

  // If aspectRatio is provided, wrap in a container with that aspect ratio
  if (aspectRatio) {
    return (
      <div 
        className={cn(
          "relative overflow-hidden", 
          containerClassName
        )}
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          alt={alt}
          fill={true}
          sizes={defaultSizes}
          quality={imageQuality}
          priority={priority}
          loading={imageLoading}
          onLoad={handleLoad}
          className={cn(
            "object-cover",
            fadeIn && "transition-opacity duration-500",
            fadeIn && !isLoaded && "opacity-0",
            fadeIn && isLoaded && "opacity-100",
            className
          )}
          {...props}
        />
      </div>
    )
  }

  // Otherwise, render the image directly
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={defaultSizes}
      quality={imageQuality}
      priority={priority}
      loading={imageLoading}
      onLoad={handleLoad}
      className={cn(
        fadeIn && "transition-opacity duration-500",
        fadeIn && !isLoaded && "opacity-0",
        fadeIn && isLoaded && "opacity-100",
        className
      )}
      {...props}
    />
  )
} 