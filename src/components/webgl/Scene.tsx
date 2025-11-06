import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Preload } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import Lights from "./components/lights";
import { MaleBody1 } from "../../components/models/MaleLast";
import { ModelBody2 } from "../../components/models/MaleBody2";
import { ModelBody3 } from "../../components/models/MaleBody3";
import ChangeableModels, { PlayerData } from "../models/ChangeableModels";

const getPlayerTeam = (team: number | undefined) => {
  console.log("team", team);
  if (team === 0) return "/teams/dojoUnited.png";
  if (team === 1) return "/teams/Cartridge City.png";
  if (team === 2) return "/teams/VoidBreakers.png";
  return "/teams/Galactic Forge.png";
};

const Scene = () => {
  const [data, setData] = useState<PlayerData[]>([]);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    [],
  );

  // Memoize camera settings
  const cameraSettings = useMemo(
    () => ({
      position: [0, 0, 5] as [number, number, number],
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
    [],
  );

  // Fetch player data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/players (2).json");
        const data = await res.json();
        setData(data);
        if (data.length > 0) {
          setPlayer(data[0]); // Set initial player
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
      }
    };

    fetchData();
  }, []);

  // Set up interval to cycle through players
  useEffect(() => {
    if (data.length === 0) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % data.length;
      setPlayer(data[currentIndex]);
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [data]);

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

        <Html position={[0, 0, 0]} fullscreen>
          <div className="flex h-full w-full flex-col items-center justify-between">
            <div className="bg-overgoal-purple flex w-full flex-row items-center justify-start gap-4 px-4 pt-4">
              <img
                src={getPlayerTeam(player?.team)}
                alt=""
                className="h-24 w-24 object-contain"
              />
              <h1 className="airstrike-normal text-5xl font-bold text-black">
                {player?.player_name}
              </h1>
            </div>
            <div className="flex w-full flex-row items-center gap-2">
              <div className="flex h-full w-full flex-col items-start bg-linear-to-b from-transparent from-5% to-black/90 to-30% p-8">
                <div className="flex h-full flex-row items-start gap-2">
                  <span className="text-overgoal-blue airstrike-normal text-3xl font-bold">
                    {player?.shoot}
                  </span>{" "}
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Shoot
                  </span>
                </div>

                <div className="flex h-full flex-row items-start gap-2">
                  <span className="text-overgoal-blue airstrike-normal text-3xl font-bold">
                    {player?.pass}
                  </span>{" "}
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Pass
                  </span>
                </div>
                <div className="flex h-full flex-row items-start gap-2">
                  <span className="text-overgoal-blue airstrike-normal text-3xl font-bold">
                    {player?.intelligence}
                  </span>{" "}
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Intelligence
                  </span>
                </div>
                <div className="flex h-full flex-row items-start gap-2">
                  <span className="text-overgoal-blue airstrike-normal text-3xl font-bold">
                    {player?.dribble}
                  </span>{" "}
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Dribble
                  </span>
                </div>

                <div className="flex h-full flex-row items-start gap-2">
                  <span className="text-overgoal-blue airstrike-normal text-3xl font-bold">
                    {player?.strength}
                  </span>{" "}
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Strength
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Html>

        {/* <MaleBody1 scale={4.8} position={[0, -200, -20]} rotation={[0, 0, 0]} /> */}
        {/* <ModelBody2 scale={4} position={[0, -150, 0]} rotation={[0, 0, 0]} /> */}
        {/* <ModelBody3 scale={4} position={[0, -150, 0]} rotation={[0, 0, 0]} /> */}
        {/* <ChangeableModels
          scale={4.8}
          position={[0, -200, -20]}
          rotation={[0, 0, 0]}
          autoRandomize={false}
        /> */}

        {player && (
          <ChangeableModels
            scale={4.8}
            position={[0, -200, -20]}
            rotation={[0, 0, 0]}
            playerData={player}
            autoRandomize={false}
          />
        )}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

Scene.displayName = "Scene";
export default Scene;
