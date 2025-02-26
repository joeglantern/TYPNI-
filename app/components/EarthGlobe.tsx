'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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

    // Camera setup with dynamic FOV based on screen size
    const fov = window.innerWidth < 768 ? 75 : 60 // Reduced FOV for larger appearance
    const camera = new THREE.PerspectiveCamera(
      fov,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = window.innerWidth < 768 ? 2 : 1.75 // Moved camera closer
    cameraRef.current = camera

    // Optimized renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Optimized controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.minDistance = window.innerWidth < 768 ? 1.75 : 1.5 // Adjusted min distance
    controls.maxDistance = window.innerWidth < 768 ? 3 : 2.5 // Adjusted max distance
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controlsRef.current = controls

    // Optimized texture loading
    const textureLoader = new THREE.TextureLoader()
    const loadTexture = (url: string) => {
      return new Promise<THREE.Texture>((resolve) => {
        textureLoader.load(url, resolve)
      })
    }

    // Progressive loading of textures
    Promise.all([
      loadTexture('/earth/8k_earth_daymap.jpg'),
      loadTexture('/earth/earth_normal.jpg'),
      loadTexture('/earth/earthspecular.jpg'),
      loadTexture('/earth/8k_earth_clouds.jpg')
    ]).then(([earthDayMap, earthNormalMap, earthSpecularMap, earthCloudsMap]) => {
      // Optimize textures
      earthDayMap.colorSpace = THREE.SRGBColorSpace // Updated from deprecated encoding
      earthDayMap.anisotropy = renderer.capabilities.getMaxAnisotropy()

      // Earth mesh with optimized geometry
      const earthGeometry = new THREE.SphereGeometry(1, 48, 48) // Reduced segments for better performance
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

      // Optimized clouds mesh
      const cloudsGeometry = new THREE.SphereGeometry(1.01, 48, 48)
      const cloudsMaterial = new THREE.MeshPhongMaterial({
        map: earthCloudsMap,
        transparent: true,
        opacity: 0.4,
        depthWrite: false, // Improve transparency performance
      })
      const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
      scene.add(clouds)
      cloudsRef.current = clouds
    })

    // Optimized lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 3, 5)
    scene.add(pointLight)

    // Optimized animation loop
    let animationFrameId: number
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) return

      if (earthRef.current) {
        earthRef.current.rotation.y += 0.0005
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.00075
      }

      controls.update()
      renderer.render(scene, camera)

      lastTime = currentTime - (deltaTime % frameInterval)
    }

    animate(0)

    // Optimized resize handler
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return

      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight

      // Update camera FOV based on screen size
      const newFov = window.innerWidth < 768 ? 75 : 60
      cameraRef.current.fov = newFov
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.minDistance = window.innerWidth < 768 ? 1.75 : 1.5
        controlsRef.current.maxDistance = window.innerWidth < 768 ? 3 : 2.5
      }

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

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      <div ref={mountRef} className="w-full h-full" />
      {/* Speech Bubble */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg animate-float">
        <div className="relative">
          <p className="text-sm md:text-base font-medium text-center">
            TYPNI - We are Global! 🌍
          </p>
          {/* Speech bubble triangle */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-white dark:border-t-gray-800" />
        </div>
      </div>
    </div>
  )
} 
