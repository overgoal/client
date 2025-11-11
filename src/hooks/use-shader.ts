import { useMemo } from "react";
import * as THREE from "three";

interface ShaderConfig {
  vertexShader: string;
  fragmentShader: string;
  glslVersion?: string;
}

export function useShader<T extends Record<string, THREE.IUniform>>(
  config: ShaderConfig,
  uniforms: T,
): THREE.ShaderMaterial & { uniforms: T } {
  const { vertexShader, fragmentShader, glslVersion } = config;

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    return mat as THREE.ShaderMaterial & { uniforms: T };
  }, [vertexShader, fragmentShader, glslVersion]);

  // Update uniforms reference without recreating material
  material.uniforms = uniforms;

  return material;
}
