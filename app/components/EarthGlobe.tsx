'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function EarthGlobe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const earthRef = useRef<THREE.Mesh | null>(null)
  const cloudsRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 2
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.minDistance = 1.5
    controls.maxDistance = 3
    controlsRef.current = controls

    // Textures
    const textureLoader = new THREE.TextureLoader()
    const earthDayMap = textureLoader.load('/earth/8k_earth_daymap.jpg')
    const earthNormalMap = textureLoader.load('/earth/earth_normal.jpg')
    const earthSpecularMap = textureLoader.load('/earth/earthspecular.jpg')
    const earthCloudsMap = textureLoader.load('/earth/8k_earth_clouds.jpg')

    // Earth mesh
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthDayMap,
      normalMap: earthNormalMap,
      specularMap: earthSpecularMap,
      normalScale: new THREE.Vector2(6, 6),
      shininess: 5,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)
    earthRef.current = earth

    // Clouds mesh
    const cloudsGeometry = new THREE.SphereGeometry(1.01, 64, 64)
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: earthCloudsMap,
      transparent: true,
      opacity: 0.4,
    })
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
    scene.add(clouds)
    cloudsRef.current = clouds

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 3, 5)
    scene.add(pointLight)

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.001
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0015
      }

      controls.update()
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return

      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      scene.clear()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full min-h-[400px]" />
} 