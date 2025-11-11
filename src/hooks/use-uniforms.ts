import { useMemo } from "react";
import * as THREE from "three";

type UniformsInit<T extends Record<string, THREE.IUniform>> = T | (() => T);

export function useUniforms<T extends Record<string, THREE.IUniform>>(
  init: UniformsInit<T>,
): T {
  const uniforms = useMemo(() => {
    if (typeof init === "function") {
      return init();
    }
    return init;
  }, []);

  return uniforms;
}

