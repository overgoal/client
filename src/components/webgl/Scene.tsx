import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'

// Cube component with rotation animation
function Cube() {
  const meshRef = useRef<any>(null)

  // Animate the cube rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4f46e5" />
    </mesh>
  )
}


const Scene = () => {
  // Mobile-first: Reduce quality on smaller screens for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
        style={{ touchAction: 'none' }} // Prevent default touch behaviors
      >
        <Suspense fallback={null}>
          {/* Lighting */}
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
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0, 0]}
          />

          {/* 3D Objects */}
          <Cube />
        </Suspense>
      </Canvas>
  )
}

Scene.displayName = 'Scene'
export default Scene