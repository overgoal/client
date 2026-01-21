import { EffectComposer } from "@react-three/postprocessing";
import { CRTEffect } from "./CustomEffect";
import { BlueVignetteEffect } from "./BlueVignetteEffect";
import { useMemo } from "react";

export default function GameEffects() {
  const crtEffect = useMemo(() => new CRTEffect(), []);
  const vignetteEffect = useMemo(
    () => new BlueVignetteEffect({ strength: 1, radius: 0.3 }),
    [],
  );

  return (
    <EffectComposer>
      <primitive object={vignetteEffect} />
      <primitive object={crtEffect} />
    </EffectComposer>
  );
}
