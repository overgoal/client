import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Outlines, useAnimations, useFBX, useTexture } from "@react-three/drei";
import { FBXLoader } from "three-stdlib";
import { mapAccesoriesTexture } from "../../../utils/mapTeamTexture";
import { useLoader, useFrame } from "@react-three/fiber";
import { GameModelProps } from "../shared-types";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";

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
  const rb = useRef<RapierRigidBody>(null);
  const group = useRef<THREE.Group>(null);

  // --- NEW: Animation state refs ---
  const previousActionRef = useRef<THREE.AnimationAction | null>(null);
  const idleInitializedRef = useRef(false);

  // Load FBX model
  const fbxModel = useLoader(FBXLoader, getBodyModel(props.body_type));

  // Load Animations
  const { animations: defensiveIdleAnims } = useFBX(
    "/models/in-game/animations/DefensiveIdle.fbx",
  );
  const { animations: jogForwardAnims } = useFBX(
    "/models/in-game/animations/JogForward.fbx",
  );
  const { animations: jogDiagLeftAnims } = useFBX(
    "/models/in-game/animations/JogForwardDiagonalLeft.fbx",
  );
  const { animations: jogDiagRightAnims } = useFBX(
    "/models/in-game/animations/JogForwardDiagonalRight.fbx",
  );
  const { animations: strikeAnims } = useFBX(
    "/models/in-game/animations/StrikeForwardJog.fbx",
  );

  // Rename CLIPS directly to avoid name collisions if they share default names
  useMemo(() => {
    if (defensiveIdleAnims[0]) defensiveIdleAnims[0].name = "DefensiveIdle";
    if (jogForwardAnims[0]) jogForwardAnims[0].name = "JogForward";
    if (jogDiagLeftAnims[0])
      jogDiagLeftAnims[0].name = "JogForwardDiagonalLeft";
    if (jogDiagRightAnims[0])
      jogDiagRightAnims[0].name = "JogForwardDiagonalRight";
    if (strikeAnims[0]) strikeAnims[0].name = "StrikeForwardJog";
  }, [
    defensiveIdleAnims,
    jogForwardAnims,
    jogDiagLeftAnims,
    jogDiagRightAnims,
    strikeAnims,
  ]);

  // Bind animations
  const { actions } = useAnimations(
    [
      defensiveIdleAnims[0],
      jogForwardAnims[0],
      jogDiagLeftAnims[0],
      jogDiagRightAnims[0],
      strikeAnims[0],
    ],
    group,
  );

  const [currentAction, setCurrentAction] = useState("DefensiveIdle");

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

  // --- NEW: Initialize idle once so there's always a base layer playing ---
  useEffect(() => {
    if (!actions || idleInitializedRef.current) return;

    const idle = actions["DefensiveIdle"];
    if (!idle) return;

    idle.reset();
    idle.enabled = true;
    idle.setEffectiveTimeScale(1);
    idle.setEffectiveWeight(1);
    idle.play();

    previousActionRef.current = idle;
    idleInitializedRef.current = true;
  }, [actions]);

  // --- NEW: Crossfade from previous action to current action ---
  useEffect(() => {
    if (!actions || !currentAction) return;

    const nextAction = actions[currentAction];
    if (!nextAction) return;

    const previousAction = previousActionRef.current;

    nextAction.reset();
    nextAction.enabled = true;
    nextAction.setEffectiveTimeScale(
      currentAction === "DefensiveIdle" ? 1 : 1.5,
    );
    nextAction.setEffectiveWeight(2);
    nextAction.play();

    if (previousAction && previousAction !== nextAction) {
      // smooth crossfade between clips
      previousAction.crossFadeTo(nextAction, 0.2, false);
    } else if (!previousAction) {
      // first action ever
      nextAction.fadeIn(0.2);
    }

    previousActionRef.current = nextAction;
  }, [currentAction, actions]);

  // Optional: clean up on unmount (doesn't affect runtime blends)
  useEffect(() => {
    return () => {
      if (!actions) return;
      Object.values(actions).forEach((action) => {
        action?.stop();
      });
    };
  }, [actions]);

  // Update movement + choose animation
  useFrame((_state, delta) => {
    if (!rb.current || !props.targetPosition) return;

    // Current position
    const pos = rb.current.translation();

    // Direction to target (XZ plane only)
    const dirX = props.targetPosition[0] - pos.x;
    const dirZ = props.targetPosition[2] - pos.z;
    const len = Math.hypot(dirX, dirZ);

    if (len > 0.1) {
      // ---- Movement ----
      const normX = dirX / len;
      const normZ = dirZ / len;

      const speed = 25; // units per second
      rb.current.setNextKinematicTranslation({
        x: pos.x + normX * speed * delta,
        y: pos.y,
        z: pos.z + normZ * speed * delta,
      });

      // ---- Animation Direction ----
      const movementDir = new THREE.Vector3(normX, 0, normZ);

      // Always rotate model towards movement direction when moving
      const currentRot = rb.current.rotation();
      const currentQuat = new THREE.Quaternion(
        currentRot.x,
        currentRot.y,
        currentRot.z,
        currentRot.w,
      );

      const targetQuat = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        movementDir,
      );

      const slerpSpeed = 5 * delta;
      currentQuat.slerp(targetQuat, slerpSpeed);

      rb.current.setNextKinematicRotation({
        x: currentQuat.x,
        y: currentQuat.y,
        z: currentQuat.z,
        w: currentQuat.w,
      });

      // Calculate angle for animation selection
      const forward = new THREE.Vector3(0, 0, 1)
        .applyQuaternion(currentQuat)
        .normalize();
      const dot = forward.dot(movementDir);
      const crossY = forward.x * movementDir.z - forward.z * movementDir.x;
      const signedAngle = Math.atan2(crossY, dot);
      const deg = THREE.MathUtils.radToDeg(signedAngle);
      const absDeg = Math.abs(deg);

      // Animation Selection
      if (len < 8) {
        // Close to target -> Strike
        if (currentAction !== "StrikeForwardJog")
          setCurrentAction("StrikeForwardJog");
      } else {
        // Far from target -> Jog logic
        if (absDeg < 20) {
          if (currentAction !== "JogForward") setCurrentAction("JogForward");
        } else if (deg >= 20 && deg <= 160) {
          if (currentAction !== "JogForwardDiagonalLeft")
            setCurrentAction("JogForwardDiagonalLeft");
        } else if (deg <= -20 && deg >= -140) {
          if (currentAction !== "JogForwardDiagonalRight")
            setCurrentAction("JogForwardDiagonalRight");
        } else {
          // behind / sharp turn
          if (currentAction !== "JogForward") setCurrentAction("JogForward");
        }
      }
    } else {
      if (currentAction !== "DefensiveIdle") setCurrentAction("DefensiveIdle");
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
    <RigidBody
      ref={rb}
      gravityScale={0}
      type="kinematicPosition"
      colliders={false}
      {...props}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "ball") {
          const impulseStrength = 200;

          // Base forward vector (model facing -Z)
          const forward = new THREE.Vector3(0, 0, 1);

          // Get rigidbody rotation (Rapier's quaternion -> THREE.Quaternion)
          const rot = rb.current?.rotation();
          if (rot) {
            const quat = new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w);
            forward.applyQuaternion(quat);
          }

          forward.normalize().multiplyScalar(impulseStrength);
          forward.y = 20; // some lift

          other.rigidBody?.applyImpulse(
            { x: forward.x, y: forward.y, z: forward.z },
            true,
          );
        }
      }}
    >
      <group ref={group} dispose={null}>
        {/* Physics collider (tuned to your model size) */}
        <CapsuleCollider args={[30, 15]} position={[0, 10, 0]} />

        {/* Visual model */}
        <primitive object={fbxModel} dispose={null} />
        <Outlines thickness={1.5} color="black" angle={0} />
      </group>
    </RigidBody>
  );
}

useFBX.preload("/models/in-game/game_model_1.fbx");
useFBX.preload("/models/in-game/animations/DefensiveIdle.fbx");
useFBX.preload("/models/in-game/animations/JogForward.fbx");
useFBX.preload("/models/in-game/animations/JogForwardDiagonalLeft.fbx");
useFBX.preload("/models/in-game/animations/JogForwardDiagonalRight.fbx");
useFBX.preload("/models/in-game/animations/StrikeForwardJog.fbx");
