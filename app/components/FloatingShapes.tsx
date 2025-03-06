'use client'

import { motion } from 'framer-motion'

interface FloatingShapesProps {
  variant?: 'default' | 'colorful' | 'minimal';
  className?: string;
}

export default function FloatingShapes({ variant = 'default', className = '' }: FloatingShapesProps) {
  const shapes = [
    {
      color: variant === 'colorful' ? '#590099' : 'currentColor',
      size: 'w-16 h-16',
      animation: {
        y: [-20, 20],
        rotate: [0, 360],
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
      },
    },
    {
      color: variant === 'colorful' ? '#FFBD00' : 'currentColor',
      size: 'w-20 h-20',
      animation: {
        x: [-20, 20],
        y: [0, -30],
        rotate: [45, 405],
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
      },
    },
    {
      color: variant === 'colorful' ? '#900059' : 'currentColor',
      size: 'w-12 h-12',
      animation: {
        x: [10, -10],
        y: [-10, 10],
        rotate: [90, 450],
        transition: {
          duration: 7,
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
      },
    },
    {
      color: variant === 'colorful' ? '#FF0054' : 'currentColor',
      size: 'w-24 h-24',
      animation: {
        scale: [1, 1.2, 1],
        rotate: [180, 540],
        transition: {
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse' as const,
        },
      },
    },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating Shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size}`}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            opacity: variant === 'minimal' ? 0.05 : 0.1,
          }}
          animate={shape.animation}
        >
          {/* Cube */}
          <div
            className="w-full h-full relative transform-gpu preserve-3d"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 border-2 rounded-lg"
              style={{
                borderColor: shape.color,
                transform: 'translateZ(20px)',
                backgroundColor: `${shape.color}10`,
              }}
            />
            {/* Back face */}
            <div
              className="absolute inset-0 border-2 rounded-lg"
              style={{
                borderColor: shape.color,
                transform: 'translateZ(-20px)',
                backgroundColor: `${shape.color}05`,
              }}
            />
            {/* Right face */}
            <div
              className="absolute top-0 bottom-0 w-[20px] border-2 rounded-lg"
              style={{
                borderColor: shape.color,
                right: '-20px',
                transform: 'rotateY(90deg)',
                backgroundColor: `${shape.color}08`,
              }}
            />
            {/* Left face */}
            <div
              className="absolute top-0 bottom-0 w-[20px] border-2 rounded-lg"
              style={{
                borderColor: shape.color,
                left: '-20px',
                transform: 'rotateY(-90deg)',
                backgroundColor: `${shape.color}08`,
              }}
            />
            {/* Top face */}
            <div
              className="absolute left-0 right-0 h-[20px] border-2 rounded-lg"
              style={{
                borderColor: shape.color,
                top: '-20px',
                transform: 'rotateX(90deg)',
                backgroundColor: `${shape.color}08`,
              }}
            />
            {/* Bottom face */}
            <div
              className="absolute left-0 right-0 h-[20px] border-2 rounded-lg"
              style={{
                borderColor: shape.color,
                bottom: '-20px',
                transform: 'rotateX(-90deg)',
                backgroundColor: `${shape.color}08`,
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Gradient Overlays */}
      {variant !== 'minimal' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
        </>
      )}
    </div>
  )
} 