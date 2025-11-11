import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Preload, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import Lights from "../../../components/webgl/components/lights";
import { PlayerData } from "../../../components/models/ChangeableModels";
import ChangeableModel1 from "../../../components/models/ChangeableModel1";
import ChangeableModel2 from "../../../components/models/ChangeableModel2";
import ChangeableModel3 from "../../../components/models/ChangeableModel3";


interface ClaimSceneContentProps {
  player: PlayerData | null;
  orbitControlsSettings: any;
  onLoadComplete?: () => void;
}

function ClaimSceneContent({ player, orbitControlsSettings, onLoadComplete }: ClaimSceneContentProps) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && onLoadComplete) {
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

      <Html fullscreen className="pointer-events-none p-1">
        <div className="airstrike-normal mt-6 w-full text-center">
          <img
            src="/card/Asset-08.png"
            alt=""
            className="absolute top-0 left-0 z-0 h-full w-full object-cover"
          />
          <h1
            className="card-name z-0 text-[42px]"
            style={
              {
                "--card-name-content": `"${player?.player_name}"`,
              } as React.CSSProperties
            }
          >
            {player?.player_name}
          </h1>
        </div>
      </Html>

      {player?.body_type === 0 && (
        <ChangeableModel1
          defaultAnimtion="Dance 2"
          playerData={player}
          scale={5}
          position={[0, -200, 0]}
          rotation={[0, 0, 0]}
        />
      )}
      {player?.body_type === 1 && (
        <ChangeableModel2
          defaultAnimtion="Dancing_2"
          playerData={player}
          scale={5}
          position={[0, -200, 0]}
          rotation={[0, 0, 0]}
        />
      )}

      {player?.body_type === 2 && (
        <ChangeableModel3
          defaultAnimtion="Bow_and_Arrow"
          playerData={player}
          scale={4.6}
          position={[0, -200, 0]}
          rotation={[0, 0, 0]}
        />
      )}

      <Preload all />
    </>
  );
}

interface ClaimSceneProps {
  playerLinkId: number | string;
  onLoadComplete?: () => void;
}

const ClaimScene = ({ playerLinkId, onLoadComplete }: ClaimSceneProps) => {
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

        const player = data.find(
          (player: PlayerData) =>
            player.linkID.toString() === playerLinkId.toString(),
        );
        setPlayer(player);
        console.log(player, "player");
      } catch (error) {
        console.error("Failed to fetch player data:", error);
      }
    };

    fetchData();
  }, [playerLinkId]);

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
        <ClaimSceneContent 
          player={player} 
          orbitControlsSettings={orbitControlsSettings}
          onLoadComplete={onLoadComplete}
        />
      </Suspense>
    </Canvas>
  );
};

ClaimScene.displayName = "ClaimScene";
export default ClaimScene;
