import { EffectComposer } from "@react-three/postprocessing";
import { CRTEffect } from "./CustomEffect";
import { BlueVignetteEffect } from "./BlueVignetteEffect";
import { useControls } from "leva";
import { useEffect, useMemo } from "react";

export default function GameEffects() {
  const {
    vignetteStrength,
    vignetteRadius,
    vignetteColor,
    crtIntensity,
    crtTintColor,
  } = useControls("Game Effects", {
    vignetteStrength: { value: 1, min: 0, max: 2 },
    vignetteRadius: { value: 0.3, min: 0, max: 1 },
    vignetteColor: { value: "#0F0052" },
    crtIntensity: { value: 0.3, min: 0, max: 1 },
    crtTintColor: { value: "#0FADFF" },
  });

  const crtEffect = useMemo(() => new CRTEffect(), []);
  const vignetteEffect = useMemo(() => new BlueVignetteEffect(), []);

  useEffect(() => {
    vignetteEffect.uniforms.get("strength")!.value = vignetteStrength;
    vignetteEffect.uniforms.get("radius")!.value = vignetteRadius;
    vignetteEffect.uniforms.get("color")!.value.set(vignetteColor);
  }, [vignetteEffect, vignetteStrength, vignetteRadius, vignetteColor]);

  useEffect(() => {
    crtEffect.uniforms.get("intensity")!.value = crtIntensity;
    crtEffect.uniforms.get("tintColor")!.value.set(crtTintColor);
  }, [crtEffect, crtIntensity, crtTintColor]);

  return (
    <EffectComposer>
      <primitive object={vignetteEffect} />
      <primitive object={crtEffect} />
    </EffectComposer>
  );
}
