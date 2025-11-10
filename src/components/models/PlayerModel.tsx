/*
  PlayerModel - Wrapper component that selects the correct model based on body_type
  - body_type 0 -> ChangeableModel3 (Model 3, Body_2 node)
  - body_type 1 -> ChangeableModel1 (Model 1, Body_1_1 node)
  - body_type 2 -> ChangeableModel2 (Model 2, Body_3_1 node)
*/

import ChangeableModel1 from "./ChangeableModel1";
import ChangeableModel2 from "./ChangeableModel2";
import ChangeableModel3 from "./ChangeableModel3";
import { BaseModelProps } from "./shared-types";

export default function PlayerModel({ playerData, ...props }: BaseModelProps) {
  // Select component based on body_type
  switch (playerData.body_type) {
    case 0:
      return <ChangeableModel3 playerData={playerData} {...props} />;
    case 1:
      return <ChangeableModel1 playerData={playerData} {...props} />;
    case 2:
      return <ChangeableModel2 playerData={playerData} {...props} />;
    default:
      return <ChangeableModel3 playerData={playerData} {...props} />;
  }
}

export { ChangeableModel1, ChangeableModel2, ChangeableModel3 };
export type { PlayerData, CharacterConfig } from "./shared-types";

