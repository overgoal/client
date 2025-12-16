/*
  Shared types and utilities for ChangeableModel components
*/

// Player data interface from JSON
export interface PlayerData {
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
  hair_color: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  visor_type: 0 | 1 | 2;
  visor_color: 0 | 1 | 2;
  team_id: number;
  player_category: "bronze" | "gold" | "platinum";
  player_name: string;
  player_description: string;
  linkID: number;
}

// Configuration interface for character customization
export interface CharacterConfig {
  skinTexture: 1 | 2 | 3;
  hasBeard: boolean;
  hasEyebrows: boolean;
  hairStyle: "hair1" | "hair2";
  visorStyle: "visor1" | "visor2" | "visor3";
  accessoryColor: string;
}

// Convert player JSON data to CharacterConfig
export function playerDataToCharacterConfig(
  player: PlayerData,
): CharacterConfig {
  const visorColorMap: Record<number, string> = {
    0: "#ff0000", // Red
    1: "#00ff00", // Green
    2: "#0000ff", // Blue
  };

  const hairStyleMap: Record<number, "hair1" | "hair2"> = {
    0: "hair1",
    1: "hair2",
  };

  const visorStyleMap: Record<number, "visor1" | "visor2" | "visor3"> = {
    0: "visor1",
    1: "visor2",
    2: "visor3",
  };

  return {
    skinTexture: (player.skin_color + 1) as 1 | 2 | 3,
    hasBeard: player.beard_type === 1,
    hasEyebrows: true,
    hairStyle: hairStyleMap[player.hair_type],
    visorStyle: visorStyleMap[player.visor_type],
    accessoryColor: visorColorMap[player.visor_color],
  };
}

// Get animation key based on body type
export function getAnim(bodyType: number): number {
  if (bodyType === 2) {
    return Math.random() < 0.5 ? 8 : 0;
  }
  if (bodyType === 1) {
    return Math.random() < 0.5 ? 11 : 0;
  }
  return 3;
}

// Base props interface for all model components
export interface BaseModelProps {
  playerData: PlayerData;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  actionName?: string;
  defaultAnimtion?: string;
}

export interface GameModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  animationName?: string;
  body_type: 0 | 1 | 2;
  skin_color: 0 | 1 | 2;
  beard_type: 0 | 1;
  hair_type: 0 | 1;
  hair_color: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  visor_type: 0 | 1 | 2;
  visor_color: 0 | 1 | 2;
  team_id: number;
  goalkeeper: {
    isGoalKeeper: boolean;
    type: 0 | 1;
  };
  isTeamMate: boolean;
  targetPosition?: [number, number, number] | null;
}
