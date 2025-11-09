/*
  ChangeableModels - A component that uses 3 different character models (all with the same structure)
  and toggles parts (eyebrows, beard, hair, visor) and applies different textures
  to create unique character variations
*/

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useGLTF,
  useAnimations,
  useTexture,
  Outlines,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {
  mapAccesoriesTexture,
  mapTeamTexture,
  getActionMap,
} from "../../utils/mapTeamTexture";

const getAnim = (bodyType: number): number => {
  if (bodyType === 2) {
    return Math.random() < 0.5 ? 8 : 0;
  }
  return 0;
};
// Type definition for the new unified structure (all 3 models now have this same structure)
type GLTFModel1 = GLTF & {
  nodes: {
    Eyebrows: THREE.SkinnedMesh;
    Beard: THREE.SkinnedMesh;
    Hair_1: THREE.SkinnedMesh;
    Hair_2: THREE.SkinnedMesh;
    Visor_1: THREE.SkinnedMesh;
    Visor_2: THREE.SkinnedMesh;
    Visor_3: THREE.SkinnedMesh;
    Body_1: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Accesories_Mat: THREE.MeshStandardMaterial;
    MainBody_Mat: THREE.MeshStandardMaterial;
  };
};

type GLTFModel2 = GLTF & {
  nodes: {
    Eyebrows: THREE.SkinnedMesh;
    Beard: THREE.SkinnedMesh;
    Hair_1: THREE.SkinnedMesh;
    Hair_2: THREE.SkinnedMesh;
    Visor_1: THREE.SkinnedMesh;
    Visor_2: THREE.SkinnedMesh;
    Visor_3: THREE.SkinnedMesh;
    Body_2: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Accesories_Mat: THREE.MeshStandardMaterial;
    MainBody_Mat: THREE.MeshStandardMaterial;
  };
};

type GLTFModel3 = GLTF & {
  nodes: {
    Eyebrows: THREE.SkinnedMesh;
    Beard: THREE.SkinnedMesh;
    Hair_1: THREE.SkinnedMesh;
    Hair_2: THREE.SkinnedMesh;
    Visor_1: THREE.SkinnedMesh;
    Visor_2: THREE.SkinnedMesh;
    Visor_3: THREE.SkinnedMesh;
    Body_3_1: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Accesories_Mat: THREE.MeshStandardMaterial;
    MainBody_Mat: THREE.MeshStandardMaterial;
  };
};

// Configuration interface for character customization
interface CharacterConfig {
  bodyModel: 1 | 2 | 3; // Which model to use (all have same structure now)
  skinTexture: 1 | 2 | 3; // Which skin texture to use
  hasBeard: boolean;
  hasEyebrows: boolean; // New in updated models
  hairStyle: "hair1" | "hair2";
  visorStyle: "visor1" | "visor2" | "visor3";
  accessoryColor: string; // Hex color for accessories
}

// Player data interface from JSON
interface PlayerData {
  user_id: number;
  created_at: number;
  last_updated_at: number;
  last_login_at: number;
  fame: number;
  charisma: number;
  stamina: number;
  strength: number;
  agility: number;
  intelligence: number;
  energy: number;
  speed: number;
  leadership: number;
  pass: number;
  shoot: number;
  freekick: number;
  universe_currency: number;
  body_type: 0 | 1 | 2;
  skin_color: 0 | 1 | 2;
  beard_type: 0 | 1;
  hair_type: 0 | 1;
  hair_color: 0 | 1 | 2 | 3;
  visor_type: 0 | 1 | 2;
  visor_color: 0 | 1 | 2;
  team_id: number;
  player_category: "bronze" | "gold" | "platinum";
  player_name: string;
  player_description: string;
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
    hasEyebrows: Math.random() > 0.3, // Higher chance to have eyebrows
    hairStyle: randomChoice(["hair1", "hair2"] as const),
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

// Convert player JSON data to CharacterConfig
function playerDataToCharacterConfig(player: PlayerData): CharacterConfig {
  // Map visor colors (0, 1, 2) to actual hex colors
  const visorColorMap: Record<number, string> = {
    0: "#ff0000", // Red
    1: "#00ff00", // Green
    2: "#0000ff", // Blue
  };

  // Map hair style numbers to hair style strings
  const hairStyleMap: Record<number, "hair1" | "hair2"> = {
    0: "hair1",
    1: "hair2",
  };

  // Map visor type to visor style
  const visorStyleMap: Record<number, "visor1" | "visor2" | "visor3"> = {
    0: "visor1",
    1: "visor2",
    2: "visor3",
  };

  return {
    bodyModel: (player.body_type + 1) as 1 | 2 | 3, // Convert 0-2 to 1-3
    skinTexture: (player.skin_color + 1) as 1 | 2 | 3, // Convert 0-2 to 1-3
    hasBeard: player.beard_type === 1,
    hasEyebrows: true, // Default to true (can be extended in PlayerData interface if needed)
    hairStyle: hairStyleMap[player.hair_type],
    visorStyle: visorStyleMap[player.visor_type],
    accessoryColor: visorColorMap[player.visor_color],
  };
}

interface ChangeableModelsProps {
  config?: CharacterConfig;
  playerData?: PlayerData; // Accept player data from JSON
  autoRandomize?: boolean;
  autoRandomizeInterval?: number; // Interval in milliseconds to auto-randomize (e.g., 2000 for 2 seconds)
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export default function ChangeableModels({
  config,
  playerData,
  autoRandomize = true,
  autoRandomizeInterval,
  ...props
}: ChangeableModelsProps) {
  const group = useRef<THREE.Group>(null);

  // State to manage dynamic character configuration when using interval
  const [dynamicConfig, setDynamicConfig] = useState<CharacterConfig | null>(
    null,
  );

  // Load all three models (all now have the same structure)
  const model1 = useGLTF(
    "/models/Male/new-text/new_model.glb",
  ) as unknown as GLTFModel1;
  const model2 = useGLTF(
    "/models/Male/new-text/new_model_2.glb",
  ) as unknown as GLTFModel2;
  const model3 = useGLTF(
    "/models/Male/new-text/new_model_3.glb",
  ) as unknown as GLTFModel3;

  // Load all skin textures
  const skinTextureUrl = mapTeamTexture(
    playerData?.team_id ?? 0,
    playerData?.skin_color ?? 0,
  );
  const skinTexture = useTexture(skinTextureUrl);
  // Load accessories texture
  // const accesoriesTexture = useTexture(
  //   "/models/Male/textures/Accesories_Mat_BaseColor.png",
  // );

  const hairTexture = useTexture(
    mapAccesoriesTexture(playerData?.hair_color ?? 0),
  );
  const accesoriesTexture = useTexture(
    mapAccesoriesTexture(playerData?.visor_color ?? 0),
  );

  // Load mask texture for model 3
  //   const maskMainBodyTexture = useTexture(
  //     "/models/Male/textures/Mask_MainBody_Mat_BaseColor.png",
  //   );

  // Set color space on all textures when they load
  useEffect(() => {
    if (skinTexture) {
      skinTexture.colorSpace = THREE.SRGBColorSpace;
      skinTexture.needsUpdate = true;
    }
    if (accesoriesTexture) {
      accesoriesTexture.colorSpace = THREE.SRGBColorSpace;
      accesoriesTexture.needsUpdate = true;
    }
  }, [skinTexture, accesoriesTexture]);

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
    // Priority: dynamicConfig (from interval) > playerData > provided config > random > default
    if (dynamicConfig) return dynamicConfig;
    if (playerData) return playerDataToCharacterConfig(playerData);
    if (config) return config;
    if (autoRandomize) return generateRandomConfig();
    // Default config (when no playerData, config, or autoRandomize is provided)
    return {
      bodyModel: 1,
      skinTexture: 1,
      hasBeard: true,
      hasEyebrows: true,
      hairStyle: "hair1",
      visorStyle: "visor1",
      accessoryColor: "#ffffff",
    };
  }, [dynamicConfig, playerData, config, autoRandomize]);

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
        return "Body_1_1";
      case 2:
        return "Body_3_1";
      case 3:
        return "Body_2";
      default:
        return "Body_1";
    }
  }, [characterConfig.bodyModel]);

  // Setup animations
  const { actions, mixer, clips } = useAnimations(
    selectedModel.animations,
    group,
  );

  //8
  //2

  useEffect(() => {
    let key = getAnim(playerData?.body_type ?? 0);
    let actionConfig = getActionMap(key);
    const actionName = actionConfig?.name ?? "Idle";
    const action = actions[actionName];

    if (playerData?.body_type === 2 && key === 0) {
      group.current?.rotation.set(0, 0.65, 0);
      group.current?.position.set(
        -20,
        group.current?.position.y,
        group.current?.position.z,
      );
    } else {
      group.current?.rotation.set(0, 0, 0);
      group.current?.position.set(
        0,
        group.current?.position.y,
        group.current?.position.z,
      );
    }

    if (playerData?.body_type === 2 && key === 8) {
      group.current?.rotation.set(0, -0.1, 0);
    }

    if (action) {
      // Step 1: Stop all other actions
      mixer.stopAllAction();

      // Step 2: Reset the action to clear any previous state
      action.reset();

      // Step 3: Set the time to the desired starting position
      const startTime = actionConfig?.startTime ?? 0;
      action.time = startTime;

      // Step 4: Enable the action and set it to play
      action.play();

      // Step 5: Pause immediately to freeze at this position
      action.paused = true;

      // Step 6: CRITICAL - Force mixer to update to apply the pose
      mixer.update(0);
    }
  }, [actions, selectedModel, playerData, playerData?.body_type, mixer]);

  // Select skin texture based on config
  const selectedSkinTexture = useMemo(() => {
    return skinTexture;
  }, [skinTexture]);

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
  const hairMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      map: hairTexture,
      color: new THREE.Color(0xffffff),
      vertexColors: false,
    });

    if (hairTexture) {
      hairTexture.colorSpace = THREE.SRGBColorSpace;
    }

    return material;
  }, [hairTexture, characterConfig.accessoryColor]);

  const accesoriesMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      map: accesoriesTexture,
      color: new THREE.Color(0xffffff),
      vertexColors: false,
    });

    if (accesoriesTexture) {
      hairTexture.colorSpace = THREE.SRGBColorSpace;
    }

    return material;
  }, [accesoriesTexture, characterConfig.accessoryColor]);

  // Get all mesh nodes from the selected model (all models now have same structure)
  const bodyNode = useMemo(() => {
    const node =
      selectedModel.nodes[bodyNodeName as keyof typeof selectedModel.nodes];
    return node as unknown as THREE.SkinnedMesh;
  }, [selectedModel.nodes, bodyNodeName]);

  const eyebrowsNode = useMemo(() => {
    return selectedModel.nodes.Eyebrows;
  }, [selectedModel.nodes.Eyebrows]);

  const beardNode = useMemo(() => {
    return selectedModel.nodes.Beard;
  }, [selectedModel.nodes.Beard]);

  const hair1Node = useMemo(() => {
    return selectedModel.nodes.Hair_1;
  }, [selectedModel.nodes.Hair_1]);

  const hair2Node = useMemo(() => {
    return selectedModel.nodes.Hair_2;
  }, [selectedModel.nodes.Hair_2]);

  const visor1Node = useMemo(() => {
    return selectedModel.nodes.Visor_1;
  }, [selectedModel.nodes.Visor_1]);

  const visor2Node = useMemo(() => {
    return selectedModel.nodes.Visor_2;
  }, [selectedModel.nodes.Visor_2]);

  const visor3Node = useMemo(() => {
    return selectedModel.nodes.Visor_3;
  }, [selectedModel.nodes.Visor_3]);

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
            >
              <Outlines thickness={3} color="black" angle={0} />
            </skinnedMesh>

            {/* Customizable Parts */}
            <group name="Customizables">
              {/* Eyebrows - New in updated models */}
              {characterConfig.hasEyebrows && eyebrowsNode && (
                <skinnedMesh
                  name="Eyebrows"
                  geometry={eyebrowsNode.geometry}
                  material={hairMaterial}
                  skeleton={eyebrowsNode.skeleton}
                >
                  <Outlines thickness={3} color="black" angle={0} />
                </skinnedMesh>
              )}

              {/* Beard */}
              {characterConfig.hasBeard && beardNode && (
                <skinnedMesh
                  name="Beard"
                  geometry={beardNode.geometry}
                  material={accesoriesMaterial}
                  skeleton={beardNode.skeleton}
                >
                  <Outlines thickness={3} color="black" angle={0} />
                </skinnedMesh>
              )}

              {/* Hair Style 1 */}
              {characterConfig.hairStyle === "hair1" && hair1Node && (
                <skinnedMesh
                  name="Hair_1"
                  geometry={hair1Node.geometry}
                  material={hairMaterial}
                  skeleton={hair1Node.skeleton}
                >
                  <Outlines thickness={3} color="black" angle={0} />
                </skinnedMesh>
              )}

              {/* Hair Style 2 */}
              {characterConfig.hairStyle === "hair2" && hair2Node && (
                <skinnedMesh
                  name="Hair_2"
                  geometry={hair2Node.geometry}
                  material={hairMaterial}
                  skeleton={hair2Node.skeleton}
                >
                  <Outlines thickness={3} color="black" angle={0} />
                </skinnedMesh>
              )}

              {/* Visor 1 */}
              {characterConfig.visorStyle === "visor1" && visor1Node && (
                <skinnedMesh
                  name="Visor_1"
                  geometry={visor1Node.geometry}
                  material={accesoriesMaterial}
                  skeleton={visor1Node.skeleton}
                >
                  <Outlines thickness={3} color="black" angle={0} />
                </skinnedMesh>
              )}

              {/* Visor 2 */}
              {characterConfig.visorStyle === "visor2" && visor2Node && (
                <skinnedMesh
                  name="Visor_2"
                  geometry={visor2Node.geometry}
                  material={accesoriesMaterial}
                  skeleton={visor2Node.skeleton}
                >
                  <Outlines thickness={3} color="black" angle={0} />
                </skinnedMesh>
              )}

              {/* Visor 3 */}
              {characterConfig.visorStyle === "visor3" && visor3Node && (
                <skinnedMesh
                  name="Visor_3"
                  geometry={visor3Node.geometry}
                  material={accesoriesMaterial}
                  skeleton={visor3Node.skeleton}
                >
                  <Outlines thickness={3} color="black" angle={0} />
                </skinnedMesh>
              )}
            </group>

            {/* Unified Outline for entire character */}
          </group>

          {/* Skeleton - Use the skeleton from the selected body model */}
          <primitive object={selectedModel.nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

// Preload all models
useGLTF.preload("/models/Male/new-text/new_model.glb");
useGLTF.preload("/models/Male/new-text/new_model_2.glb");
useGLTF.preload("/models/Male/new-text/new_model_3.glb");

// Export utility functions for external use
export { generateRandomConfig, playerDataToCharacterConfig };
export type { CharacterConfig, PlayerData };
