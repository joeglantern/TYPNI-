'use client'

import { OptimizedImage } from '@/components/ui/optimized-image'

export default function TestImage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test</h1>
      <div className="w-full max-w-md">
        <OptimizedImage
          src="/mediaa/1F1A34 (1977).jpg"
          alt="Test Image"
          aspectRatio="4/3"
          className="rounded-lg"
          priority={true}
          fadeIn={true}
        />
      </div>
    </div>
  )
} 