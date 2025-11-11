import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useUniforms } from "../../../hooks/use-uniforms";
import { useShader } from "../../../hooks/use-shader";
import * as THREE from "three";
import vertexShader from "./background-glitch.vert?raw";
import fragmentShader from "./background-glitch.frag?raw";

interface BackgroundUniforms extends Record<string, THREE.IUniform> {
  uTexture: { value: THREE.Texture | null };
  uTime: { value: number };
  uGlitchIntensity: { value: number };
}

function BackgroundPlane() {
  const texture = useTexture("/homepage/background.png");
  const { viewport } = useThree();

  const uniforms = useUniforms<BackgroundUniforms>(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uGlitchIntensity: { value: 1.0 },
  }));

  const material = useShader(
    {
      vertexShader,
      fragmentShader,
    },
    uniforms,
  );

  // Update time uniform on each frame
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, -40]} material={material}>
      <planeGeometry args={[viewport.width * 1.2, viewport.height * 1.2]} />
    </mesh>
  );
}

export default BackgroundPlane;
