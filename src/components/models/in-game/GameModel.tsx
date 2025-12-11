import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Outlines, useFBX, useTexture } from "@react-three/drei";
import { FBXLoader } from "three-stdlib";
import { mapAccesoriesTexture } from "../../../utils/mapTeamTexture";
import { useLoader, useFrame } from "@react-three/fiber";
import { GameModelProps } from "../shared-types";

const getBodyModel = (body_type: number) => {
  switch (body_type) {
    case 0:
      return "/models/in-game/game_model_1.fbx";
    case 1:
      return "/models/in-game/game_model_2.fbx";
    case 2:
      return "/models/in-game/game_model_3.fbx";
    default:
      return "/models/in-game/game_model_1.fbx";
  }
};

export default function GameModel(props: GameModelProps) {
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  // Load FBX model
  const fbxModel = useLoader(FBXLoader, getBodyModel(props.body_type));

  // Load animation FBX if provided
  // Note: We'll load it conditionally in useEffect to avoid hook rules violation
  const [animationFbx, setAnimationFbx] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (!props.animationName) {
      setAnimationFbx(null);
      return;
    }

    let cancelled = false;
    const loader = new FBXLoader();

    loader.load(
      `/models/in-game/animations/${props.animationName}.fbx`,
      (loaded) => {
        if (!cancelled) {
          setAnimationFbx(loaded);
        }
      },
      undefined,
      (error) => {
        if (!cancelled) {
          console.error("Error loading animation FBX:", error);
          setAnimationFbx(null);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [props.animationName]);

  // Get texture URL based on goalkeeper/defender status
  const { type } = props.goalkeeper;
  const skinTextureUrl = useMemo(() => {
    if (props.goalkeeper.isGoalKeeper) {
      // Goalkeeper texture: Goalkeeper_{team_id}_Skin_{skin_color + 1}.png
      return `/models/in-game/textures/goalkeepers/Goalkeeper_${type + 1}_Skin_${props.skin_color + 1}.png`;
    } else {
      // Defender texture: BaseTeam_{team_id}_Skin_{skin_color + 1}.png
      return `/models/in-game/textures/defenders/BaseTeam_${type + 1}_Skin_${props.skin_color + 1}.png`;
    }
  }, [props.goalkeeper.isGoalKeeper, props.team_id, props.skin_color]);

  // Load textures
  const skinTexture = useTexture(skinTextureUrl);
  const hairTexture = useTexture(mapAccesoriesTexture(0));
  const accesoriesTexture = useTexture(mapAccesoriesTexture(0));

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
    if (hairTexture) {
      hairTexture.colorSpace = THREE.SRGBColorSpace;
      hairTexture.needsUpdate = true;
    }
  }, [skinTexture, accesoriesTexture, hairTexture]);

  // Setup FBX animation
  useEffect(() => {
    if (!fbxModel) return;

    // Find root bone or use the model itself as root
    let root: THREE.Object3D | null = null;

    // Try to find mixamorigHips or similar root bone
    fbxModel.traverse((child) => {
      if (child instanceof THREE.Bone && child.name.includes("Hips")) {
        root = child;
      }
    });

    // If no bone found, use the model itself
    if (!root) {
      root = fbxModel;
    }

    const mixerInstance = new THREE.AnimationMixer(root);
    mixer.current = mixerInstance;

    // Use animation from separate FBX if provided, otherwise use animations from model FBX
    const animations = animationFbx?.animations || fbxModel.animations;

    if (animations && animations.length > 0) {
      const clip = animations[0];
      const action = mixerInstance.clipAction(clip);
      actionRef.current = action;

      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }

    return () => {
      if (actionRef.current) {
        actionRef.current.stop();
        actionRef.current = null;
      }
      mixerInstance.stopAllAction();
      mixer.current = null;
    };
  }, [fbxModel, animationFbx]);

  // Update mixer on each frame
  useFrame((_state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

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

  // Apply materials to meshes in the FBX model
  useEffect(() => {
    if (!fbxModel) return;

    fbxModel.traverse((child) => {
      if (
        child.name.includes("Hair") &&
        !child.name.includes(props.hair_type.toString())
      ) {
        child.visible = false;
      }

      if (
        child.name.includes("Hair") &&
        !child.name.includes(props.hair_type.toString())
      ) {
        child.visible = false;
      }

      if (
        child.name.includes("Visor") &&
        !child.name.includes(props.visor_type.toString())
      ) {
        child.visible = false;
      }

      if (child instanceof THREE.SkinnedMesh || child instanceof THREE.Mesh) {
        // Determine material based on mesh name
        const name = child.name.toLowerCase();

        if (name.includes("body") || name.includes("skin")) {
          child.material = bodyMaterial;
        } else if (name.includes("hair")) {
          child.material = hairMaterial;
        } else if (
          name.includes("visor") ||
          name.includes("beard") ||
          name.includes("eyebrow") ||
          name.includes("accesor")
        ) {
          child.material = accesoriesMaterial;
        } else {
          // Default to body material
          child.material = bodyMaterial;
        }
      }
    });
  }, [fbxModel, bodyMaterial, hairMaterial, accesoriesMaterial]);

  if (!fbxModel) {
    return null;
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={fbxModel} />
      <Outlines thickness={1.5} color="black" angle={0} />
    </group>
  );
}

useFBX.preload("/models/in-game/game_model_1.fbx");
