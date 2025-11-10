/*
  Main exports for Player Model components
*/

// Main wrapper component (recommended)
export { default as PlayerModel } from "./PlayerModel";

// Individual model components (for direct use)
export { default as ChangeableModel1 } from "./ChangeableModel1";
export { default as ChangeableModel2 } from "./ChangeableModel2";
export { default as ChangeableModel3 } from "./ChangeableModel3";

// Shared types and utilities
export type { 
  PlayerData, 
  CharacterConfig, 
  BaseModelProps 
} from "./shared-types";

export { 
  playerDataToCharacterConfig, 
  getAnim 
} from "./shared-types";

// Legacy export (for backwards compatibility if needed)
export { default as ChangeableModels } from "./ChangeableModels";

