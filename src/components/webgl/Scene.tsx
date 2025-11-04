import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import Lights from "./components/lights";
import { MaleBody1 } from "../../components/models/MaleLast";
import { ModelBody2 } from "../../components/models/MaleBody2";
import { ModelBody3 } from "../../components/models/MaleBody3";

const Scene = () => {
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
      // stencil: false,
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
      autoRotate: false,
      autoRotateSpeed: 5,
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
      className="w-full h-full pointer-events-auto"
      style={{
        touchAction: "none", // Prevent default touch behaviors
        background: "transparent", // Make canvas background transparent
      }}
    >
      {/* <Perf position="top-left" /> */}
      <Suspense fallback={null}>
        <OrbitControls {...orbitControlsSettings} />
        <Lights />

        <MaleBody1 scale={4} position={[-250, -150, 0]} rotation={[0, 1, 0]} />
        <ModelBody2 scale={4} position={[0, -150, 0]} rotation={[0, 0, 0]} />
        <ModelBody3 scale={4} position={[250, -150, 0]} rotation={[0, 0, 0]} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

Scene.displayName = "Scene";
export default Scene;
