/*
  ChangeableModels - A component that randomly combines parts from 3 different character models
  to create unique character variations
*/

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

// Type definitions for the three model variants
type GLTFResultModel1 = GLTF & {
  nodes: {
    Beard: THREE.SkinnedMesh;
    Hair_1: THREE.SkinnedMesh;
    Visor_1: THREE.SkinnedMesh;
    Body_1: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Accesories_Mat: THREE.MeshStandardMaterial;
    MainBody_Mat: THREE.MeshStandardMaterial;
  };
};

type GLTFResultModel2 = GLTF & {
  nodes: {
    Beard: THREE.SkinnedMesh;
    Hair_1: THREE.SkinnedMesh;
    Hair_2: THREE.SkinnedMesh;
    Visor_2: THREE.SkinnedMesh;
    Body_2: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
};

type GLTFResultModel3 = GLTF & {
  nodes: {
    Body_3: THREE.SkinnedMesh;
    Visor_3: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
};

// Configuration interface for character customization
interface CharacterConfig {
  bodyModel: 1 | 2 | 3; // Which body mesh to use
  skinTexture: 1 | 2 | 3; // Which skin texture to use
  hasBeard: boolean; // From Model 1
  hairStyle: "none" | "hair1" | "hair2"; // From Models 1 & 2
  visorStyle: "visor1" | "visor2" | "visor3"; // From all models
  accessoryColor: string; // Hex color for accessories
}

// Random utility functions
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate random character configuration
function generateRandomConfig(): CharacterConfig {
  return {
    bodyModel: randomChoice([1, 2, 3] as const),
    skinTexture: randomChoice([1, 2, 3] as const),
    hasBeard: Math.random() > 0.5,
    hairStyle: randomChoice(["none", "hair1", "hair2"] as const),
    visorStyle: randomChoice(["visor1", "visor2", "visor3"] as const),
    accessoryColor: randomChoice([
      "#ffffff", // White
      "#00ff00", // Green
      "#ff0000", // Red
      "#0000ff", // Blue
      "#ffff00", // Yellow
      "#ff00ff", // Magenta
      "#00ffff", // Cyan
    ]),
  };
}

interface ChangeableModelsProps {
  config?: CharacterConfig;
  autoRandomize?: boolean;
  autoRandomizeInterval?: number; // Interval in milliseconds to auto-randomize (e.g., 2000 for 2 seconds)
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export default function ChangeableModels({
  config,
  autoRandomize = true,
  autoRandomizeInterval,
  ...props
}: ChangeableModelsProps) {
  const group = useRef<THREE.Group>(null);

  // State to manage dynamic character configuration when using interval
  const [dynamicConfig, setDynamicConfig] = useState<CharacterConfig | null>(
    null,
  );

  // Load all three models
  const model1 = useGLTF(
    "/models/Male/male_last_2.glb",
  ) as unknown as GLTFResultModel1;
  const model2 = useGLTF(
    "/models/Male/male_body_2.glb",
  ) as unknown as GLTFResultModel2;
  const model3 = useGLTF(
    "/models/Male/male_body_3.glb",
  ) as unknown as GLTFResultModel3;

  // Load all skin textures
  const skinTexture1 = useTexture(
    "/models/Male/textures/MainBody_Skin1_BaseColor.png",
  );
  const skinTexture2 = useTexture(
    "/models/Male/textures/MainBody_Skin2_BaseColor.png",
  );
  const skinTexture3 = useTexture(
    "/models/Male/textures/MainBody_Skin3_BaseColor.png",
  );

  // Load accessories texture
  const accesoriesTexture = useTexture(
    "/models/Male/textures/Accesories_Mat_BaseColor.png",
  );

  // Load mask texture for model 3
  //   const maskMainBodyTexture = useTexture(
  //     "/models/Male/textures/Mask_MainBody_Mat_BaseColor.png",
  //   );

  // Set color space on all textures when they load
  useEffect(() => {
    if (skinTexture1) {
      skinTexture1.colorSpace = THREE.SRGBColorSpace;
      skinTexture1.needsUpdate = true;
    }
    if (skinTexture2) {
      skinTexture2.colorSpace = THREE.SRGBColorSpace;
      skinTexture2.needsUpdate = true;
    }
    if (skinTexture3) {
      skinTexture3.colorSpace = THREE.SRGBColorSpace;
      skinTexture3.needsUpdate = true;
    }
    if (accesoriesTexture) {
      accesoriesTexture.colorSpace = THREE.SRGBColorSpace;
      accesoriesTexture.needsUpdate = true;
    }
  }, [skinTexture1, skinTexture2, skinTexture3, accesoriesTexture]);

  // Auto-randomize interval effect
  useEffect(() => {
    if (!autoRandomizeInterval) return;

    // Set initial random config
    setDynamicConfig(generateRandomConfig());

    // Set up interval to randomize character
    const intervalId = setInterval(() => {
      setDynamicConfig(generateRandomConfig());
    }, autoRandomizeInterval);

    // Cleanup interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [autoRandomizeInterval]);

  // Generate or use provided config
  const characterConfig = useMemo<CharacterConfig>(() => {
    // Priority: dynamicConfig (from interval) > provided config > random > default
    if (dynamicConfig) return dynamicConfig;
    if (config) return config;
    if (autoRandomize) return generateRandomConfig();
    // Default config
    return {
      bodyModel: 1,
      skinTexture: 1,
      hasBeard: true,
      hairStyle: "hair1",
      visorStyle: "visor1",
      accessoryColor: "#ffffff",
    };
  }, [dynamicConfig, config, autoRandomize]);

  // Select the appropriate model based on config
  const selectedModel = useMemo(() => {
    switch (characterConfig.bodyModel) {
      case 1:
        return model1;
      case 2:
        return model2;
      case 3:
        return model3;
      default:
        return model1;
    }
  }, [characterConfig.bodyModel, model1, model2, model3]);

  // Get the correct body node name based on selected body model
  const bodyNodeName = useMemo(() => {
    switch (characterConfig.bodyModel) {
      case 1:
        return "Body_1";
      case 2:
        return "Body_2";
      case 3:
        return "Body_3";
      default:
        return "Body_1";
    }
  }, [characterConfig.bodyModel]);

  // Setup animations
  const { actions } = useAnimations(selectedModel.animations, group);

  useEffect(() => {
    if (actions) {
      actions["Break"]?.play();
    }
  }, [actions]);

  // Select skin texture based on config
  const selectedSkinTexture = useMemo(() => {
    switch (characterConfig.skinTexture) {
      case 1:
        return skinTexture1;
      case 2:
        return skinTexture2;
      case 3:
        return skinTexture3;
      default:
        return skinTexture1;
    }
  }, [characterConfig.skinTexture, skinTexture1, skinTexture2, skinTexture3]);

  // Create body material with selected skin texture
  const bodyMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      map: selectedSkinTexture,
      color: new THREE.Color(0xffffff),
      vertexColors: false,
    });

    if (selectedSkinTexture) {
      selectedSkinTexture.colorSpace = THREE.SRGBColorSpace;
    }

    // Add alpha map if using body model 3
    if (characterConfig.bodyModel === 3) {
      //   material.alphaMap = maskMainBodyTexture;
    }

    return material;
  }, [selectedSkinTexture, characterConfig.bodyModel]);

  // Create accessories material
  const accessoriesMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      map: accesoriesTexture,
      color: new THREE.Color(characterConfig.accessoryColor),
      vertexColors: true,
    });

    if (accesoriesTexture) {
      accesoriesTexture.colorSpace = THREE.SRGBColorSpace;
    }

    return material;
  }, [accesoriesTexture, characterConfig.accessoryColor]);

  // Get body mesh from the selected model
  const bodyNode = useMemo(() => {
    const node =
      selectedModel.nodes[bodyNodeName as keyof typeof selectedModel.nodes];
    return node as unknown as THREE.SkinnedMesh;
  }, [selectedModel, bodyNodeName]);

  const beardNode = useMemo(() => {
    const node =
      selectedModel.nodes["Beard" as keyof typeof selectedModel.nodes];
    return node as unknown as THREE.SkinnedMesh;
  }, [selectedModel.nodes["Beard" as keyof typeof selectedModel.nodes]]);

  const hair1Node = useMemo(() => {
    return selectedModel.nodes[
      "Hair_1" as keyof typeof selectedModel.nodes
    ] as unknown as THREE.SkinnedMesh;
  }, [selectedModel.nodes["Hair_1" as keyof typeof selectedModel.nodes]]);

  const hair2Node = useMemo(() => {
    return selectedModel.nodes[
      "Hair_2" as keyof typeof selectedModel.nodes
    ] as unknown as THREE.SkinnedMesh;
  }, [selectedModel.nodes["Hair_2" as keyof typeof selectedModel.nodes]]);

  const visor1Node = useMemo(() => {
    return selectedModel.nodes[
      "Visor_1" as keyof typeof selectedModel.nodes
    ] as unknown as THREE.SkinnedMesh;
  }, [selectedModel.nodes["Visor_1" as keyof typeof selectedModel.nodes]]);

  const visor2Node = useMemo(() => {
    return selectedModel.nodes[
      "Visor_2" as keyof typeof selectedModel.nodes
    ] as unknown as THREE.SkinnedMesh;
  }, [selectedModel.nodes["Visor_2" as keyof typeof selectedModel.nodes]]);

  const visor3Node = useMemo(() => {
    return selectedModel.nodes[
      "Visor_3" as keyof typeof selectedModel.nodes
    ] as unknown as THREE.SkinnedMesh;
  }, [selectedModel.nodes["Visor_3" as keyof typeof selectedModel.nodes]]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CombinedCharacter">
          <group name="Body">
            {/* Main Body Mesh */}
            <skinnedMesh
              name={bodyNodeName}
              geometry={bodyNode.geometry}
              material={bodyMaterial}
              skeleton={bodyNode.skeleton}
            />

            {/* Customizable Parts */}
            <group name="Customizables">
              {/* Beard - Only from Model 1 */}
              {characterConfig.hasBeard && model1.nodes.Beard && (
                <skinnedMesh
                  name="Beard"
                  geometry={beardNode.geometry}
                  material={accessoriesMaterial}
                  skeleton={beardNode.skeleton}
                />
              )}

              {/* Hair Style 1 - From Model 1 */}
              {characterConfig.hairStyle === "hair1" && hair1Node && (
                <skinnedMesh
                  name="Hair_1"
                  geometry={hair1Node.geometry}
                  material={accessoriesMaterial}
                  skeleton={hair1Node.skeleton}
                />
              )}

              {/* Hair Style 2 - Only from Model 2 */}
              {characterConfig.hairStyle === "hair2" && hair2Node && (
                <skinnedMesh
                  name="Hair_2"
                  geometry={hair2Node.geometry}
                  material={accessoriesMaterial}
                  skeleton={hair2Node.skeleton}
                />
              )}

              {/* Visor 1 - From Model 1 */}
              {characterConfig.visorStyle === "visor1" && visor1Node && (
                <skinnedMesh
                  name="Visor_1"
                  geometry={visor1Node.geometry}
                  material={accessoriesMaterial}
                  skeleton={visor1Node.skeleton}
                />
              )}

              {/* Visor 2 - From Model 2 */}
              {characterConfig.visorStyle === "visor2" && visor2Node && (
                <skinnedMesh
                  name="Visor_2"
                  geometry={visor2Node.geometry}
                  material={accessoriesMaterial}
                  skeleton={visor2Node.skeleton}
                />
              )}

              {/* Visor 3 - From Model 3 */}
              {characterConfig.visorStyle === "visor3" && visor3Node && (
                <skinnedMesh
                  name="Visor_3"
                  geometry={visor3Node.geometry}
                  material={accessoriesMaterial}
                  skeleton={visor3Node.skeleton}
                />
              )}
            </group>
          </group>

          {/* Skeleton - Use the skeleton from the selected body model */}
          <primitive object={selectedModel.nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

// Preload all models
useGLTF.preload("/models/Male/male_last_2.glb");
useGLTF.preload("/models/Male/male_body_2.glb");
useGLTF.preload("/models/Male/male_body_3.glb");

// Export utility functions for external use
export { generateRandomConfig };
export type { CharacterConfig };
