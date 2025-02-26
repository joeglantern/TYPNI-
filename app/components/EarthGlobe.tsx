'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Loader2 } from 'lucide-react'

export default function EarthGlobe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const earthRef = useRef<THREE.Mesh | null>(null)
  const cloudsRef = useRef<THREE.Mesh | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    if (!mountRef.current) {
      setError('Mount ref not found')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      setDebugInfo('Initializing scene...')

      // Scene setup
      const scene = new THREE.Scene()
      sceneRef.current = scene

      // Get dimensions
      const width = mountRef.current.clientWidth || 500
      const height = mountRef.current.clientHeight || 500
      setDebugInfo(prev => `${prev}\nDimensions: ${width}x${height}`)

      // Camera setup with dynamic FOV based on screen size
      const fov = window.innerWidth < 768 ? 45 : 35
      const camera = new THREE.PerspectiveCamera(
        fov,
        width / height,
        0.1,
        1000
      )
      camera.position.z = window.innerWidth < 768 ? 4 : 3.5
      cameraRef.current = camera

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance",
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      
      // Clear any existing canvas
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild)
      }
      
      mountRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer
      setDebugInfo(prev => `${prev}\nRenderer initialized`)

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.enablePan = false
      controls.minDistance = 2 // Minimum zoom distance
      controls.maxDistance = 6 // Maximum zoom distance
      controls.enableZoom = true // Enable zooming
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5
      controlsRef.current = controls
      setDebugInfo(prev => `${prev}\nControls initialized`)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(5, 3, 5)
      scene.add(pointLight)
      setDebugInfo(prev => `${prev}\nLighting added`)

      // Texture loading
      const textureLoader = new THREE.TextureLoader()
      const loadTexture = (url: string) => {
        return new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            url,
            resolve,
            (progress) => {
              setDebugInfo(prev => `${prev}\nLoading ${url}: ${Math.round(progress.loaded / progress.total * 100)}%`)
            },
            (error) => {
              console.error(`Error loading texture ${url}:`, error)
              reject(error)
            }
          )
        })
      }

      // Load textures
      Promise.all([
        loadTexture('/earth/8k_earth_daymap.jpg'),
        loadTexture('/earth/earth_normal.jpg'),
        loadTexture('/earth/earthspecular.jpg'),
        loadTexture('/earth/8k_earth_clouds.jpg')
      ])
      .then(([earthDayMap, earthNormalMap, earthSpecularMap, earthCloudsMap]) => {
        setDebugInfo(prev => `${prev}\nAll textures loaded`)
        
        earthDayMap.colorSpace = THREE.SRGBColorSpace
        earthDayMap.anisotropy = renderer.capabilities.getMaxAnisotropy()

        // Create Earth
        const earthGeometry = new THREE.SphereGeometry(1, 48, 48)
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
        setDebugInfo(prev => `${prev}\nEarth mesh created`)

        // Create clouds
        const cloudsGeometry = new THREE.SphereGeometry(1.01, 48, 48)
        const cloudsMaterial = new THREE.MeshPhongMaterial({
          map: earthCloudsMap,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
        })
        const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
        scene.add(clouds)
        cloudsRef.current = clouds
        setDebugInfo(prev => `${prev}\nClouds mesh created`)
        
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Error loading Earth textures:', err)
        setError(`Failed to load Earth textures: ${err.message}`)
        setIsLoading(false)
      })

      // Animation loop
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
      setDebugInfo(prev => `${prev}\nAnimation started`)

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return

        const width = mountRef.current.clientWidth
        const height = mountRef.current.clientHeight

        const newFov = window.innerWidth < 768 ? 45 : 35
        cameraRef.current.fov = newFov
        cameraRef.current.aspect = width / height
        cameraRef.current.updateProjectionMatrix()

        if (controlsRef.current) {
          controlsRef.current.minDistance = 2
          controlsRef.current.maxDistance = 6
        }

        rendererRef.current.setSize(width, height)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationFrameId)
        if (mountRef.current && rendererRef.current) {
          mountRef.current.removeChild(rendererRef.current.domElement)
        }
        scene.clear()
      }
    } catch (err) {
      console.error('Error in Earth setup:', err)
      setError(`Failed to initialize Earth: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span>Loading Earth...</span>
            </div>
            <div className="text-xs text-muted-foreground whitespace-pre-wrap">
              {debugInfo}
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-destructive text-center">
            <p>{error}</p>
            <p className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap">{debugInfo}</p>
            <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page</p>
          </div>
        </div>
      )}
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
