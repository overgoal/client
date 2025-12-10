import { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Stadium from "../../components/models/in-game/Stadium";
import { useControls } from "leva";

type Props = {};

export default function GameScene({}: Props) {
  const {
    camPosX,
    camPosY,
    camPosZ,
    camRotX,
    zoom,
  } = useControls("Camera", {
    // Top-down soccer view: camera high above, slightly behind, looking down at field
    camPosX: { value: 0, min: -200, max: 200, step: 0.1 },
    camPosY: { value: 337, min: 50, max: 500, step: 1 },
    camPosZ: { value: 234, min: 0, max: 400, step: 1 },
    // Rotation: tilt angle (negative = looking down)
    camRotX: { value: -0.7, min: -Math.PI / 2, max: 0, step: 0.01 },
    zoom: { value: 5.1, min: 1, max: 20, step: 0.1 },
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

  const { x, y, z, rotationX, rotationY, rotationZ, scale } = useControls("Stadium", {
    x: { value: 0, min: -100, max: 100, step: 0.1 },
    y: { value: 0, min: -100, max: 100, step: 0.1 },
    z: { value: 0, min: -100, max: 100, step: 0.1 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scale: { value: 10, min: 0, max: 100, step: 0.1 },
  });

  return (
    <div className="h-dvh w-full">
      <Canvas
        // camera={cameraSettings}
        gl={{ ...glSettings, powerPreference: "high-performance" as const }}
        dpr={dpr}
        className="pointer-events-auto"
        style={{
          touchAction: "none", // Prevent default touch behaviors
          background: "transparent", // Make canvas background transparent
        }}
      >
        <OrthographicCamera
          makeDefault
          position={[camPosX, camPosY, camPosZ]}
          rotation={[camRotX, 0, 0]}
          zoom={zoom}
          near={0.1}
          far={1000}
        />
        <Suspense fallback={null}>
          {enableOrbitControls && <OrbitControls {...orbitControlsSettings} />}
          <Stadium
            position={[x, y, z]}
            scale={scale}
            rotation={[rotationX, rotationY, rotationZ]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
