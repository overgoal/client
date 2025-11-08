import { Canvas } from "@react-three/fiber";
import { cn } from "../../utils/utils";
import { OrbitControls, Preload, Html } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import Lights from "./components/lights";
import ChangeableModels, { PlayerData } from "../models/ChangeableModels";
import QRCode from "react-qr-code";
import { mapCardBorderTexture } from "../../utils/mapTeamTexture";

const getPlayerTeam = (team: number | undefined) => {
  if (team === 0) return "/teams/Cartridge City.png";
  if (team === 1) return "/teams/dojoUnited.png";
  if (team === 2) return "/teams/Nova United.png";
  return "/teams/Drakon core.png";
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
        const res = await fetch("/players.json");
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
    }, 100);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [data]);

  const categoryImages = mapCardBorderTexture(
    player?.player_category ?? "bronze",
  )


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
            <div className="flex w-full flex-row items-center justify-start gap-4 px-4 pt-4">
              <img
                src="/card/Asset-08.png"
                alt=""
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
              <div className="absolute bg-black -top-4 -left-4 z-100 h-42 w-42 bg-[url('/card/Asset-02.png')] bg-cover bg-center rounded-full">
                <img
                  src={getPlayerTeam(player?.team_id)}
                  alt=""
                  className={cn(
                    "relative z-100 scale-40 object-contain object-center",
                    player?.team_id === 1
                      ? "top-1/2 left-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2"
                      : "",
                    player?.team_id === 3
                      ? "top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2"
                      : "",
                  )}
                />
              </div>
              <div className="absolute top-0 z-10 h-24 w-full bg-cover bg-center font-bold">
                <img
                  src={categoryImages.border}
                  alt=""
                  className="absolute left-45 h-full w-3/4 -translate-x-1/5 object-cover"
                />
                <div className="airstrike-normal relative top-5 left-64 z-100 w-full -translate-x-1/5">
                  <h1
                    className="card-name absolute text-[35px]"
                    style={
                      {
                        "--card-name-content": `"${player?.player_name}"`,
                      } as React.CSSProperties
                    }
                  >
                    {player?.player_name}
                  </h1>
                </div>
              </div>

              <div className="airstrike-normal absolute top-15 right-4 z-100 text-2xl text-white">
                {player?.player_category}
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2 p-4 px-12">
              <div className="absolute top-0 left-0 h-full w-full">
                {Array.from({ length: 4 }).map((_, index) => (
                  <img
                    key={index}
                    src="/card/Asset-09.png"
                    alt=""
                    className="absolute top-1/2 left-0 h-1/2 w-full object-cover opacity-90"
                  />
                ))}
              </div>

              <div className="flex w-full flex-row items-center justify-center gap-12">
                <div className="relative z-100 flex items-center justify-center">
                  <img
                    src={categoryImages.qr}
                    alt=""
                    className={cn("h-36 w-36 object-contain", player?.player_category === "gold" ? "scale-120 object-bottom" : "")}
                  />
                  <div className="absolute overflow-hidden bg-contain bg-center bg-no-repeat">
                    <QRCode
                      size={120}
                      value={"/login"}
                      className="overflow-hidden"
                    />
                  </div>
                </div>

                <div className="relative z-100 flex max-h-[180px] flex-1 flex-col items-center justify-center bg-contain bg-center bg-no-repeat py-4">
                  <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-1">
                    <div className="leading-tight">
                      <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                        {player?.shoot}
                      </span>
                      <span className="text-overgoal-blue airstrike-normal text-3xl">
                        Shoot
                      </span>
                    </div>

                    <div className="leading-tight">
                      <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                        {player?.pass}
                      </span>
                      <span className="text-overgoal-blue airstrike-normal text-3xl">
                        Pass
                      </span>
                    </div>

                    <div className="leading-tight">
                      <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                        {player?.intelligence}
                      </span>
                      <span className="text-overgoal-blue airstrike-normal text-3xl">
                        Intel.
                      </span>
                    </div>

                    <div className="leading-tight">
                      <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                        {player?.agility}
                      </span>
                      <span className="text-overgoal-blue airstrike-normal text-3xl">
                        Agility
                      </span>
                    </div>

                    <div className="leading-tight">
                      <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                        {player?.strength}
                      </span>
                      <span className="text-overgoal-blue airstrike-normal text-3xl">
                        Streght.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="airstrike-normal z-100 flex w-full items-center justify-center text-center text-xl text-white">
                <div>{player?.player_description}</div>
              </div>
            </div>
          </div>
        </Html>

        {/* <ModelBody2  scale={4.8}  position={[0, -200, 0]} rotation={[0, 0, 0]} /> */}
        {player && (
          <ChangeableModels
            scale={player.body_type == 2 ? 4 : 5.4}
            position={[0, player.body_type == 2 ? -150 : -200, -40]}
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
