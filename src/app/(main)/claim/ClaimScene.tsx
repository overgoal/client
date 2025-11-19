import {
  Html,
  OrbitControls,
  Preload,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { useEffect, useMemo, useState, Suspense } from "react";
import { PlayerData } from "../../../components/models/ChangeableModels";
import ChangeableModel1 from "../../../components/models/ChangeableModel1";
import ChangeableModel2 from "../../../components/models/ChangeableModel2";
import ChangeableModel3 from "../../../components/models/ChangeableModel3";
import { GlitchText } from "../../../components/ui/glitch-text";
import { Canvas } from "@react-three/fiber";
import { cn } from "../../../utils/utils";

const getCategoyContainer = (category: string) => {
  switch (category) {
    case "bronze":
      return "/claim/claim-container-gold.webp";
    case "gold":
      return "/claim/claim-container-gold.webp";
    case "platinum":
      return "/claim/claim-container-platinum.webp";
  }
};

const getPlayerTeamImage = (team: number) => {
  switch (team) {
    case 1:
      return "/teams/Cartridge City.webp";
    case 4:
      return "/teams/dojoUnited.webp";
    case 10:
      return "/teams/Nova United.webp";
    case 5:
      return "/teams/Drakon core.webp";
  }
};

const MODEL_PATHS = {
  0: "/models/Male/new-text/new_model.glb",
  1: "/models/Male/new-text/new_model.glb",
  2: "/models/Male/new-text/new_model.glb",
};

Object.values(MODEL_PATHS).forEach((path) => {
  useGLTF.preload(path);
});

interface ClaimSceneContentProps {
  player: PlayerData | null;
  orbitControlsSettings: any;
  onLoadComplete?: () => void;
}

function ClaimSceneContent({
  player,
  orbitControlsSettings,
  onLoadComplete,
}: ClaimSceneContentProps) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && onLoadComplete) {
      const timer = setTimeout(() => {
        onLoadComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadComplete, player]);

  // Fallback: If player exists but models aren't loading, call onLoadComplete after 5 seconds
  useEffect(() => {
    if (player && onLoadComplete) {
      const fallbackTimer = setTimeout(() => {
        onLoadComplete();
      }, 100);
      return () => clearTimeout(fallbackTimer);
    }
  }, [player, onLoadComplete]);

  return (
    <>
      <OrbitControls {...orbitControlsSettings} />

      <Html fullscreen className="pointer-events-none p-1">
        <div className="airstrike-normal mt-18 w-full text-center">
          <img
            src={getCategoyContainer(player?.player_category || "bronze")}
            alt=""
            className="absolute top-10 left-0 z-90 h-25 w-full"
          />
          <img
            src="/claim/claim-container-gradient.webp"
            alt=""
            className="absolute top-10 left-0 z-20 h-24 w-full"
          />
          <GlitchText
            text={player?.player_name || ""}
            className="z-100 text-3xl"
          />
          <img
            src={getPlayerTeamImage(player?.team_id || 0)}
            alt=""
            loading="eager"
            className={cn(
              "absolute top-30 left-1/2 z-100 h-20 w-20 -translate-x-1/2",
              player?.team_id === 3 || player?.team_id === 1 ? "h-18 w-16" : "",
            )}
          />
        </div>
      </Html>

      {!player && (
        <Html center>
          <div className="text-xl text-white">Loading player data...</div>
        </Html>
      )}

      {player?.body_type === 0 && (
        <ChangeableModel1
          defaultAnimtion="Dance 2"
          playerData={player}
          scale={5}
          position={[0, -210, 0]}
          rotation={[0, 0, 0]}
        />
      )}
      {player?.body_type === 1 && (
        <ChangeableModel2
          defaultAnimtion="Dancing_2"
          playerData={player}
          scale={5}
          position={[0, -220, 0]}
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

      {player &&
        player.body_type !== 0 &&
        player.body_type !== 1 &&
        player.body_type !== 2 && (
          <Html center>
            <div className="text-xl text-white">
              Unknown body type: {player.body_type}
            </div>
          </Html>
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
      position: [0, 0.5, 360] as [number, number, number],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/players.json");
        const data = await res.json();

        const player = data.find(
          (player: PlayerData) =>
            player.linkID.toString() === playerLinkId.toString(),
        );

        if (player) {
          setPlayer(player);
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
      }
    };

    fetchData();
  }, [playerLinkId]);

  // ... existing code ...

  return (
    <>
      <img
        src="/claim/claims-bg.webp"
        alt=""
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <Canvas
        camera={cameraSettings}
        gl={glSettings}
        dpr={dpr}
        className="pointer-events-auto h-full w-full"
        style={{
          touchAction: "none",
          background: "transparent",
        }}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/claim/claims-bg.webp"
                  alt="Loading"
                  className="h-32 w-32"
                />
              </div>
            </Html>
          }
        >
          <ClaimSceneContent
            player={player}
            orbitControlsSettings={orbitControlsSettings}
            onLoadComplete={onLoadComplete}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

ClaimScene.displayName = "ClaimScene";
export default ClaimScene;
