import { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  OrthographicCamera,
  Sky,
} from "@react-three/drei";
import Stadium from "../../components/models/in-game/Stadium";
import { Leva, useControls } from "leva";
import { Physics } from "@react-three/rapier";
import { Ball } from "../../components/models/in-game/Ball";
import { useRef } from "react";
import GameModel from "../../components/models/in-game/GameModel";
import { Group } from "three";

type Props = {};

export default function GameScene({}: Props) {
  const ballRef = useRef<Group>(null);
  const { camPosX, camPosY, camPosZ, camRotX, zoom } = useControls("Camera", {
    // Top-down soccer view: camera high above, slightly behind, looking down at field
    camPosX: { value: 0, min: -200, max: 200, step: 0.1 },
    camPosY: { value: 358, min: 50, max: 500, step: 1 },
    camPosZ: { value: 234, min: 0, max: 400, step: 1 },
    // Rotation: tilt angle (negative = looking down)
    camRotX: { value: -0.7, min: -Math.PI / 2, max: 0, step: 0.01 },
    zoom: { value: 8, min: 1, max: 20, step: 0.1 },
  });

  const glSettings = useMemo(
    () => ({
      antialias: true,
      powerPreference: "high-performance",
      depth: true,
      alpha: true,
    }),
    [],
  );

  const dpr = useMemo(() => [1, 2] as [number, number], []);

  const { enableOrbitControls } = useControls("Controls", {
    enableOrbitControls: { value: false, label: "Enable Orbit Controls" },
  });

  const orbitControlsSettings = useMemo(
    () => ({
      enablePan: true,
      enableZoom: true,
      enableRotate: true,
      autoRotate: false,
    }),
    [],
  );

  const { x, y, z, rotationX, rotationY, rotationZ, scale } = useControls(
    "Stadium",
    {
      x: { value: 0, min: -100, max: 100, step: 0.1 },
      y: { value: 0, min: -100, max: 100, step: 0.1 },
      z: { value: 0, min: -100, max: 100, step: 0.1 },
      rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
      scale: { value: 10, min: 0, max: 100, step: 0.1 },
    },
  );

  const model1Controls = useControls("Model 1", {
    pos: { value: { x: 0, y: 125, z: -85 }, step: 1 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scale: { value: 0.1, min: 0.1, max: 20, step: 0.1 },
  });

  const model2Controls = useControls("Model 2", {
    pos: { value: { x: 0, y: 115, z: -50 }, step: 1 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scale: { value: 0.1, min: 0.1, max: 20, step: 0.1 },
  });

  const model3Controls = useControls("Model 3", {
    pos: { value: { x: 20, y: 110, z: -80 }, step: 1 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scale: { value: 0.1, min: 0.1, max: 20, step: 0.1 },
  });

  const ballControls = useControls("Ball", {
    pos: { value: { x: 0, y: 120, z: -42 }, step: 1 },
  });

  return (
    <div className="h-dvh w-full">
      <Canvas
        gl={{ ...glSettings, powerPreference: "high-performance" as const }}
        dpr={dpr}
        className="pointer-events-auto"
        style={{
          touchAction: "none", // Prevent default touch behaviors
          background: "transparent", // Make canvas background transparent
        }}
      >
        <Leva hidden />
        <OrthographicCamera
          makeDefault
          position={[camPosX, camPosY, camPosZ]}
          rotation={[camRotX, 0, 0]}
          zoom={zoom}
          near={0.1}
          far={1000}
        />
        <Suspense fallback={null}>
          <Physics gravity={[0, -30, 0]} colliders={"ball"}>
            {enableOrbitControls && (
              <OrbitControls {...orbitControlsSettings} />
            )}
            <Sky sunPosition={[10, 10, 0]} />
            <ContactShadows
              frames={1}
              scale={10}
              position={[0, -2, 0]}
              blur={4}
              opacity={0.2}
            />
            <Stadium
              position={[x, y, z]}
              scale={scale}
              rotation={[rotationX, rotationY, rotationZ]}
            />

            <Ball
              ref={ballRef}
              position={[
                ballControls.pos.x,
                ballControls.pos.y,
                ballControls.pos.z,
              ]}
              scale={0.5}
            />
            <GameModel
              body_type={0}
              skin_color={0}
              beard_type={0}
              hair_type={0}
              hair_color={0}
              visor_type={0}
              visor_color={0}
              team_id={1}
              animationName="GoalkeeperCatchLeft"
              goalkeeper={{ isGoalKeeper: true, type: 0 }}
              isTeamMate={true}
              position={[model1Controls.pos.x, 111, model1Controls.pos.z]}
              rotation={[0, model1Controls.rotY, 0]}
              scale={model1Controls.scale}
            />
            <GameModel
              body_type={1}
              skin_color={1}
              beard_type={1}
              hair_type={1}
              hair_color={2}
              visor_type={1}
              visor_color={1}
              team_id={1}
              animationName="StrikeForwardJog"
              goalkeeper={{ isGoalKeeper: false, type: 0 }}
              isTeamMate={true}
              position={[model2Controls.pos.x, 111, model2Controls.pos.z]}
              rotation={[0, model2Controls.rotY, 0]}
              scale={model2Controls.scale}
            />
            <GameModel
              body_type={2}
              skin_color={2}
              beard_type={0}
              hair_type={0}
              hair_color={4}
              visor_type={2}
              visor_color={2}
              team_id={2}
              animationName="DefensiveIdle"
              goalkeeper={{ isGoalKeeper: false, type: 0 }}
              isTeamMate={false}
              position={[model3Controls.pos.x, 111, model3Controls.pos.z]}
              rotation={[0, model2Controls.rotY, 0]}
              scale={model3Controls.scale}
              targetPosition={[
                ballRef.current?.position.x || 0,
                ballRef.current?.position.y || 150,
                ballRef.current?.position.z || -42,
              ]}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
