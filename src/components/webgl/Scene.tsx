import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { useMemo } from "react";
import Lights from "./components/lights";
import { Model } from "./components/Character-2";
import { Perf } from "r3f-perf";
// Memoize the Scene component to prevent unnecessary re-renders
const Scene = () => {
  // Mobile-first: Reduce quality on smaller screens for better performance
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );

  // Memoize camera settings
  const cameraSettings = useMemo(
    () => ({
      position: [0, 0, 5] as [number, number, number],
      fov: 75,
    }),
    []
  );

  // Memoize WebGL settings
  const glSettings = useMemo(
    () => ({
      antialias: !isMobile,
      powerPreference: "high-performance" as const,
      stencil: false,
      depth: true,
      alpha: true, // Enable transparency to blend with background
    }),
    [isMobile]
  );

  // Memoize DPR settings
  const dpr = useMemo(
    () =>
      isMobile ? ([1, 1.5] as [number, number]) : ([1, 2] as [number, number]),
    [isMobile]
  );

  // Memoize OrbitControls settings
  const orbitControlsSettings = useMemo(
    () => ({
      enablePan: true,
      enableZoom: true,
      enableRotate: true,
      minDistance: 300,
      maxDistance: 1000,
      minPolarAngle: Math.PI / 6,
      maxPolarAngle: Math.PI - Math.PI / 6,
      target: [0, 0, 0] as [number, number, number],
    }),
    []
  );

  return (
    <Canvas
      camera={cameraSettings}
      gl={glSettings}
      dpr={dpr}
      className="w-full h-full"
      style={{
        touchAction: "none", // Prevent default touch behaviors
        background: "transparent", // Make canvas background transparent
      }}
    >
      <Perf position="top-left" />
      {/* <Suspense fallback={null}> */}
      <OrbitControls {...orbitControlsSettings} />
      <Lights />
      {/* <CharacterModel scale={275} position={[0, -110, 100]} /> */}
      <Model scale={0.95} position={[0, -35, 230]} />
      <Preload all />
      {/* </Suspense> */}
    </Canvas>
  );
};

Scene.displayName = "Scene";
export default Scene;
