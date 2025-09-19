import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'

// Cube component with rotation animation - optimized to avoid re-renders
const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  // Memoize geometry and material to prevent re-creation on re-renders
  const geometry = useMemo(() => new THREE.BoxGeometry(2, 2, 2), [])
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "#4f46e5" }), [])

  // Animate the cube rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  )
}

// Memoize the Scene component to prevent unnecessary re-renders
const Scene = () => {
  // Mobile-first: Reduce quality on smaller screens for better performance
  const isMobile = useMemo(() => 
    typeof window !== 'undefined' && window.innerWidth < 768, []
  )

  // Memoize camera settings
  const cameraSettings = useMemo(() => ({
    position: [0, 0, 5] as [number, number, number],
    fov: 75
  }), [])

  // Memoize WebGL settings
  const glSettings = useMemo(() => ({
    antialias: !isMobile,
    powerPreference: "high-performance" as const,
    stencil: false,
    depth: true,
    alpha: true // Enable transparency to blend with background
  }), [isMobile])

  // Memoize DPR settings
  const dpr = useMemo(() => 
    isMobile ? [1, 1.5] as [number, number] : [1, 2] as [number, number], 
    [isMobile]
  )

  // Memoize OrbitControls settings
  const orbitControlsSettings = useMemo(() => ({
    enablePan: false,
    enableZoom: true,
    enableRotate: true,
    minDistance: 3,
    maxDistance: 10,
    minPolarAngle: Math.PI / 6,
    maxPolarAngle: Math.PI - Math.PI / 6,
    target: [0, 0, 0] as [number, number, number]
  }), [])

  return (
    <Canvas
      camera={cameraSettings}
      gl={glSettings}
      dpr={dpr}
      className="w-full h-full"
      style={{ 
        touchAction: 'none', // Prevent default touch behaviors
        background: 'transparent' // Make canvas background transparent
      }}
    >
      <Suspense fallback={null}>
        {/* Lighting - memoized to prevent re-creation */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Camera Controls - Mobile friendly */}
        <OrbitControls {...orbitControlsSettings} />

        {/* 3D Objects - Cube will be centered in the middle of the screen */}
        <Cube />
      </Suspense>
    </Canvas>
  )
}

Scene.displayName = 'Scene'
export default Scene