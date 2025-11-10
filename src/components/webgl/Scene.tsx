import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import Lights from "./components/lights";
import { PlayerData } from "../models/ChangeableModels";
import ChangeableModel1 from "../models/ChangeableModel1";
import ChangeableModel2 from "../models/ChangeableModel2";
import ChangeableModel3 from "../models/ChangeableModel3";
import { BlendFunction, GlitchMode } from "postprocessing";

import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Vector2 } from "three";

const getRandomizedRotation = (bodyType: number): number => {
  if (bodyType === 0) {
    return Math.random() < 0.5 ? 1.5 : 0.8;
  }
  return 0.5;
};

const Scene = () => {
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
          setPlayer(data[0]); // Set initial player
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
        <OrbitControls {...orbitControlsSettings} />
        <Lights />

        <EffectComposer>
          <Glitch
            delay={new Vector2(4, 4.5)} // min and max glitch delay
            duration={new Vector2(0.6, 1.0)} // min and max glitch duration
            strength={new Vector2(0.03, 0.03)} // min and max glitch strength
            mode={GlitchMode.SPORADIC}
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.85}
          />
        </EffectComposer>

        {/* <ModelBody2  scale={4.8}  position={[0, -200, 0]} rotation={[0, 0, 0]} /> */}
        {player && player.body_type === 0 && (
          <ChangeableModel1
            defaultAnimtion="Break Idle"
            playerData={player}
            scale={5}
            position={[0, -200, 0]}
            rotation={[0, getRandomizedRotation(player.body_type), 0]}
          />
        )}
        {player && player.body_type === 1 && (
          <ChangeableModel2
            defaultAnimtion="Break_Idle"
            playerData={player}
            scale={5}
            position={[0, -200, 0]}
            rotation={[0, getRandomizedRotation(player.body_type), 0]}
          />
        )}
        {player && player.body_type === 2 && (
          <ChangeableModel3
            playerData={player}
            defaultAnimtion="Break_Idle"
            scale={4.6}
            position={[0, -200, 0]}
            rotation={[0, getRandomizedRotation(player.body_type), 0]}
          />
        )}

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

Scene.displayName = "Scene";
export default Scene;
