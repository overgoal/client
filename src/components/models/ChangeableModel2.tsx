/*
  ChangeableModel2 - Component for body_type 1 (Model 2)
  Loads new_model_2.glb and uses Body_3_1 node
*/

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
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
} from "../../utils/mapTeamTexture";
import {
  PlayerData,
  CharacterConfig,
  playerDataToCharacterConfig,
  getAnim,
  BaseModelProps,
} from "./shared-types";

type GLTFModel2 = GLTF & {
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

export default function ChangeableModel2({
  playerData,
  ...props
}: BaseModelProps) {
  const group = useRef<THREE.Group>(null);

  // Load model
  const model = useGLTF(
    "/models/Male/new-text/new_model_2.glb",
  ) as unknown as GLTFModel2;

  // Load textures
  const skinTextureUrl = mapTeamTexture(
    playerData.team_id,
    playerData.skin_color,
  );
  const skinTexture = useTexture(skinTextureUrl);
  const hairTexture = useTexture(mapAccesoriesTexture(playerData.hair_color));
  const accesoriesTexture = useTexture(
    mapAccesoriesTexture(playerData.visor_color),
  );

  // Set color space on textures
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

  // Generate character config from player data
  const characterConfig = useMemo<CharacterConfig>(
    () => playerDataToCharacterConfig(playerData),
    [playerData],
  );

  // Setup animations
  const { actions, mixer } = useAnimations(model.animations, group);

  useEffect(() => {
    const key = getAnim(playerData.body_type);
    const action = actions["Dancing_2"];
    console.log(action?.getClip()?.duration, "action");

    // Body type 2 specific positioning (this is body_type 1, which uses model 2)
    group.current?.rotation.set(0, 0, 0);
    group.current?.position.set(
      -20,
      group.current?.position.y,
      group.current?.position.z,
    );
    if (!action) return;
    // Reset action to ensure clean start
    action.reset();
    // Configure for infinite looping
    action.clampWhenFinished = true;
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.time = 31.7;

    // Set consistent start time

    // Start playing
    action.play();

    const onLoop = (e: any) => {
      if (e.action === action) {
        action.time = 31.7;
      }
    };
    mixer.addEventListener("loop", onLoop);

    return () => {
      mixer.removeEventListener("loop", onLoop);
      action.stop();
    };
  }, [actions, playerData, mixer]);

  // Create materials
  const bodyMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      map: skinTexture,
      color: new THREE.Color(0xffffff),
      vertexColors: false,
    });

    if (skinTexture) {
      skinTexture.colorSpace = THREE.SRGBColorSpace;
    }

    return material;
  }, [skinTexture]);

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
  }, [hairTexture]);

  const accesoriesMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      map: accesoriesTexture,
      color: new THREE.Color(0xffffff),
      vertexColors: false,
    });

    if (accesoriesTexture) {
      accesoriesTexture.colorSpace = THREE.SRGBColorSpace;
    }

    return material;
  }, [accesoriesTexture]);

  // Get mesh nodes
  const bodyNode = useMemo(() => model.nodes.Body_3_1, [model.nodes.Body_3_1]);
  const eyebrowsNode = useMemo(
    () => model.nodes.Eyebrows,
    [model.nodes.Eyebrows],
  );
  const beardNode = useMemo(() => model.nodes.Beard, [model.nodes.Beard]);
  const hair1Node = useMemo(() => model.nodes.Hair_1, [model.nodes.Hair_1]);
  const hair2Node = useMemo(() => model.nodes.Hair_2, [model.nodes.Hair_2]);
  const visor1Node = useMemo(() => model.nodes.Visor_1, [model.nodes.Visor_1]);
  const visor2Node = useMemo(() => model.nodes.Visor_2, [model.nodes.Visor_2]);
  const visor3Node = useMemo(() => model.nodes.Visor_3, [model.nodes.Visor_3]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CombinedCharacter">
          <group name="Body">
            {/* Main Body Mesh */}
            <skinnedMesh
              name="Body_3_1"
              geometry={bodyNode.geometry}
              material={bodyMaterial}
              skeleton={bodyNode.skeleton}
            >
              <Outlines thickness={3} color="black" angle={0} />
            </skinnedMesh>

            {/* Customizable Parts */}
            <group name="Customizables">
              {/* Eyebrows */}
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
                  material={hairMaterial}
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
          </group>

          {/* Skeleton */}
          <primitive object={model.nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

// Preload model
useGLTF.preload("/models/Male/new-text/new_model_2.glb");

export type { PlayerData, CharacterConfig };
