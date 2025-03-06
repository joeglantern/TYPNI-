'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { Html, PerspectiveCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import Image from 'next/image'

const cards = [
  {
    title: "Youth Leadership",
    image: "/mediaa/1F1A6508.jpg",
    description: "Empowering young leaders through comprehensive training",
    color: "#590099",
  },
  {
    title: "Community Impact",
    image: "/mediaa/1F1A6444.jpg",
    description: "Creating positive change through local initiatives",
    color: "#FFBD00",
  },
  {
    title: "Global Network",
    image: "/mediaa/1F1A6469.jpg",
    description: "Connecting youth across borders",
    color: "#900059",
  },
  {
    title: "Innovation Hub",
    image: "/mediaa/1F1A6456.jpg",
    description: "Fostering creativity in youth-led projects",
    color: "#FF0054",
  },
]

function Card({ position, rotation, scale, image, title, description, color, index }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const texture = useTexture(image)

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  const scale2 = spring.to([0, 1], [1, 1.2])
  const rotation2 = spring.to([0, 1], [0, Math.PI * 0.1])

  useFrame((state) => {
    if (!active) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
    }
  })

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      rotation-y={rotation2}
      scale-x={scale2}
      scale-y={scale2}
      scale-z={scale2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
    >
      <planeGeometry args={[2, 3]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.9}
        metalness={0.5}
        roughness={0.5}
      />
      <Html
        position={[0, -1.7, 0.1]}
        center
        style={{
          width: '200px',
          textAlign: 'center',
          background: `${color}CC`,
          padding: '10px',
          borderRadius: '8px',
          transform: 'translateZ(0.1px)',
          pointerEvents: 'none',
        }}
      >
        <h3 className="text-white font-bold text-lg">{title}</h3>
        {active && (
          <p className="text-white/90 text-sm mt-2">{description}</p>
        )}
      </Html>
    </animated.mesh>
  )
}

function Scene() {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.z = 8
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      {cards.map((card, index) => (
        <Card
          key={card.title}
          {...card}
          position={[index * 2.5 - 3.75, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1}
          index={index}
        />
      ))}
    </>
  )
}

export default function ThreeDCards() {
  return (
    <section className="h-[600px] w-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <Scene />
      </Canvas>
    </section>
  )
} 