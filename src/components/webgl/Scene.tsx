import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import Lights from "./components/lights";
import  { PlayerData } from "../models/ChangeableModels";
import ChangeableModel1 from "../models/ChangeableModel1";
import ChangeableModel2 from "../models/ChangeableModel2";
import ChangeableModel3 from "../models/ChangeableModel3";


interface SceneContentProps {
  player: PlayerData | null;
  orbitControlsSettings: any;
  onLoadComplete?: () => void;
}

function SceneContent({ player, orbitControlsSettings, onLoadComplete }: SceneContentProps) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && onLoadComplete) {
      // Add a small delay to ensure everything is fully rendered
      const timer = setTimeout(() => {
        onLoadComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadComplete]);

  return (
    <>
      <OrbitControls {...orbitControlsSettings} />
      <Lights />

      {player && player.body_type === 0 && (
        <ChangeableModel1
          defaultAnimtion="Break Idle"
          playerData={player}
          scale={3.5}
          position={[0, -150, 0]}
          rotation={[0, 0, 0]}
        />
      )}
      {player && player.body_type === 1 && (
        <ChangeableModel2
          defaultAnimtion="Break_Idle"
          playerData={player}
          scale={3.8}
          position={[0, -150, 0]}
          rotation={[0, 0, 0]}
        />
      )}
      {player && player.body_type === 2 && (
        <ChangeableModel3
          playerData={player}
          defaultAnimtion="Break_Idle"
          scale={3.5}
          position={[0, -150, 0]}
          rotation={[0, 0, 0]}
        />
      )}

      <Preload all />
    </>
  );
}

interface SceneProps {
  onLoadComplete?: () => void;
}

const Scene = ({ onLoadComplete }: SceneProps) => {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    [],
  );

  // Memoize camera settings
  const cameraSettings = useMemo(
    () => ({
      position: [0, 0.5, 5] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
      fov: 75,
      near: 0.1,
      far: 1000,
    }),
    [],
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
    [isMobile],
  );

  // Memoize DPR settings
  const dpr = useMemo(
    () =>
      isMobile ? ([1, 1.5] as [number, number]) : ([1, 2] as [number, number]),
    [isMobile],
  );

  // Memoize OrbitControls settings
  const orbitControlsSettings = useMemo(
    () => ({
      enablePan: true,
      enableZoom: false,
      enableRotate: true,
      autoRotate: false,
      autoRotateSpeed: 5,
      minDistance: 300,
      maxDistance: 1000,
      minPolarAngle: Math.PI / 2,
      maxPolarAngle: Math.PI - Math.PI / 2,
      target: [0, 0, 0] as [number, number, number],
    }),
    [],
  );

  // Fetch player data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/players.json");
        const data = await res.json();
        if (data.length > 0) {
          setPlayer(data[3]); // Set initial player
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Canvas
      camera={cameraSettings}
      gl={glSettings}
      dpr={dpr}
      className="pointer-events-auto h-full w-full"
      style={{
        touchAction: "none", // Prevent default touch behaviors
        background: "transparent", // Make canvas background transparent
      }}
    >
      {/* <Perf position="top-left" /> */}
      <Suspense fallback={null}>
        <SceneContent
          player={player}
          orbitControlsSettings={orbitControlsSettings}
          onLoadComplete={onLoadComplete}
        />
      </Suspense>
    </Canvas>
  );
};

Scene.displayName = "Scene";
export default Scene;
