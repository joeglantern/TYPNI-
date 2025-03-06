'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Loader2 } from 'lucide-react'

// Network path creation utilities
const createWindingCurve = (radius: number, turns: number, height: number, offset: number = 0) => {
  const points: THREE.Vector3[] = []
  const segments = turns * 64
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = 2 * Math.PI * turns * t + offset
    const y = height * Math.sin(Math.PI * t)
    const x = radius * Math.cos(angle)
    const z = radius * Math.sin(angle)
    points.push(new THREE.Vector3(x, y, z))
  }
  
  return new THREE.CatmullRomCurve3(points)
}

const createNetworkPath = (radius: number, points: number, heightVariation: number, twist: number) => {
  const pathPoints: THREE.Vector3[] = []
  const angleStep = (Math.PI * 2) / points
  
  for (let i = 0; i <= points; i++) {
    const angle = angleStep * i
    const twistOffset = (i / points) * twist
    
    const x = radius * Math.cos(angle + twistOffset)
    const z = radius * Math.sin(angle + twistOffset)
    const y = heightVariation * Math.sin(angle * 2)
    
    pathPoints.push(new THREE.Vector3(x, y, z))
  }
  
  return new THREE.CatmullRomCurve3(pathPoints, true)
}

export default function EarthGlobe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const earthRef = useRef<THREE.Mesh | null>(null)
  const cloudsRef = useRef<THREE.Mesh | null>(null)
  const networkLinesRef = useRef<THREE.Mesh[]>([])
  const networkPathsRef = useRef<THREE.CatmullRomCurve3[]>([])
  const transmissionNodesRef = useRef<THREE.Mesh[]>([])
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
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffd500, 2.5)
      pointLight.position.set(5, 3, 5)
      scene.add(pointLight)

      // Add a hemisphere light for more natural lighting
      const hemisphereLight = new THREE.HemisphereLight(0x4169e1, 0x40e0d0, 1.2)
      scene.add(hemisphereLight)

      // Add a subtle blue rim light
      const rimLight = new THREE.PointLight(0x0077ff, 1.5)
      rimLight.position.set(-5, 0, -5)
      scene.add(rimLight)
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

        // Enhance texture colors
        const enhanceTexture = (texture: THREE.Texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
        }
        
        enhanceTexture(earthNormalMap)
        enhanceTexture(earthSpecularMap)
        enhanceTexture(earthCloudsMap)

        // Create Earth
        const earthGeometry = new THREE.SphereGeometry(1, 48, 48)
        const earthMaterial = new THREE.MeshPhongMaterial({
          map: earthDayMap,
          normalMap: earthNormalMap,
          specularMap: earthSpecularMap,
          normalScale: new THREE.Vector2(8, 8),
          shininess: 25,
          specular: new THREE.Color(0x2277ff),
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
          opacity: 0.25,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
        scene.add(clouds)
        cloudsRef.current = clouds
        setDebugInfo(prev => `${prev}\nClouds mesh created`)
        
        // Create network system
        const createNetworkSystem = () => {
          try {
            // Clear existing network elements
            networkLinesRef.current.forEach(line => sceneRef.current?.remove(line))
            transmissionNodesRef.current.forEach(node => sceneRef.current?.remove(node))
            networkLinesRef.current = []
            transmissionNodesRef.current = []

            // Create network paths with different parameters
            const paths = [
              createNetworkPath(1.3, 8, 0.4, Math.PI), // Equatorial path
              createNetworkPath(1.25, 6, 0.6, Math.PI * 1.5), // Diagonal path
              createNetworkPath(1.35, 10, 0.3, Math.PI * 0.5), // Polar path
              createWindingCurve(1.28, 3, 0.3, Math.PI * 0.25), // Winding path 1
              createWindingCurve(1.32, 2, -0.4, Math.PI * 0.75), // Winding path 2
            ]
            networkPathsRef.current = paths

            // Create glowing tube materials with brand colors
            const tubeMaterials = [
              new THREE.MeshPhongMaterial({
                color: 0x590099, // Violet Hickey
                transparent: true,
                opacity: 0.6,
                shininess: 90,
                emissive: 0x590099,
                emissiveIntensity: 0.5,
              }),
              new THREE.MeshPhongMaterial({
                color: 0xFFBD00, // Radiant Yellow
                transparent: true,
                opacity: 0.6,
                shininess: 90,
                emissive: 0xFFBD00,
                emissiveIntensity: 0.5,
              }),
              new THREE.MeshPhongMaterial({
                color: 0x900059, // Berry Burst
                transparent: true,
                opacity: 0.6,
                shininess: 90,
                emissive: 0x900059,
                emissiveIntensity: 0.5,
              }),
              new THREE.MeshPhongMaterial({
                color: 0xFF0054, // Flamingo Pink
                transparent: true,
                opacity: 0.6,
                shininess: 90,
                emissive: 0xFF0054,
                emissiveIntensity: 0.5,
              }),
              new THREE.MeshPhongMaterial({
                color: 0x590099, // Violet Hickey (repeated for last path)
                transparent: true,
                opacity: 0.6,
                shininess: 90,
                emissive: 0x590099,
                emissiveIntensity: 0.5,
              }),
            ]

            // Create tubes along the paths
            paths.forEach((path, index) => {
              const tubeGeometry = new THREE.TubeGeometry(
                path,
                100, // segments
                0.008 + (index * 0.002), // radius varies by path
                12, // radiusSegments for smoother tubes
                true
              )
              const tube = new THREE.Mesh(tubeGeometry, tubeMaterials[index])
              sceneRef.current?.add(tube)
              networkLinesRef.current.push(tube)

              // Create transmission nodes
              const nodeCount = 5 + index // More nodes on later paths
              const nodeGeometry = new THREE.SphereGeometry(0.015 + (index * 0.003), 16, 16)
              const nodeMaterial = new THREE.MeshPhongMaterial({
                color: tubeMaterials[index].color,
                emissive: tubeMaterials[index].color,
                emissiveIntensity: 1,
                transparent: true,
                opacity: 0.8,
              })

              for (let i = 0; i < nodeCount; i++) {
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone())
                const position = path.getPoint(i / nodeCount)
                node.position.copy(position)
                node.userData.progress = i / nodeCount
                node.userData.speed = 0.0005 + (index * 0.0002) + (Math.random() * 0.0002)
                sceneRef.current?.add(node)
                transmissionNodesRef.current.push(node)
              }
            })

            setDebugInfo(prev => `${prev}\nNetwork system created`)
          } catch (error) {
            console.error('Error creating network system:', error)
            setDebugInfo(prev => `${prev}\nError creating network system: ${error}`)
          }
        }

        createNetworkSystem()
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

        // Animate network elements
        if (networkPathsRef.current?.length > 0) {
          transmissionNodesRef.current.forEach((node, index) => {
            if (!node) return

            try {
              const pathIndex = Math.floor(index / 5) % networkPathsRef.current.length
              const path = networkPathsRef.current[pathIndex]
              
              if (!path) return
              
              // Update progress with varying speeds
              node.userData.progress = (node.userData.progress + (node.userData.speed || 0.001)) % 1
              
              // Update position with smooth interpolation
              const position = path.getPoint(node.userData.progress)
              if (position) {
                node.position.copy(position)
                
                // Enhanced pulse effect
                const pulse = Math.sin(currentTime * 0.005 + index * 0.5) * 0.5 + 0.5
                node.scale.setScalar(1 + pulse * 0.4)
                
                const material = node.material as THREE.MeshPhongMaterial
                if (material) {
                  material.emissiveIntensity = 0.5 + pulse
                  material.opacity = 0.6 + pulse * 0.4
                }
              }
            } catch (error) {
              console.warn('Error animating node:', error)
            }
          })

          // Animate network lines
          networkLinesRef.current.forEach((line, index) => {
            if (!line) return
            
            try {
              line.rotation.y += 0.0001 * (index + 1)
              line.rotation.x += 0.00005 * Math.sin(currentTime * 0.001)
            } catch (error) {
              console.warn('Error rotating network line:', error)
            }
          })
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
