const teamTextures = {
  0: "/models/Male/new-text/Cartridge_Mat_skin_",
  1: "/models/Male/new-text/Dojo_Mat_skin_",
  3: "/models/Male/new-text/Dracon Core_Mat_skin_",
  2: "/models/Male/new-text/NovaUnited_Mat_skin_",
};

export const mapTeamTexture = (team: number, skin: number) => {
  const texture =
    teamTextures[team as keyof typeof teamTextures] + (skin + 1) + ".png";
  return texture;
};

const accesoriesTextures = {
  0: "/models/Male/new-text/Accesories_Mat_1.png",
  1: "/models/Male/new-text/Accesories_Mat_2.png",
  2: "/models/Male/new-text/Accesories_Mat_3.png",
  3: "/models/Male/new-text/Accesories_Mat_4.png",
  4: "/models/Male/new-text/Accesories_Mat_5.png",
  5: "/models/Male/new-text/Accesories_Mat_6.png",
  6: "/models/Male/new-text/Accesories_Mat_7.png",
};

export const mapAccesoriesTexture = (team: number) => {
  const texture = accesoriesTextures[team as keyof typeof accesoriesTextures];

  return texture;
};

interface AnimationConfig {
  name: string;
  startTime: number; // in seconds
}

const actionMap: Record<number, AnimationConfig> = {
  0: {
    name: "Bow_and_Arrow",
    startTime: 29,
  },
  1: {
    name: "Break_Idle",
    startTime:2,
  },
  2: {
    name: "Clapping",
    startTime: 1,
  },
  3: {
    name: "Dance_1",
    startTime: 0.2,
  },
  4: {
    name: "Dance_2",
    startTime: 20,
  },
  5: {
    name: "Epic",
    startTime: 0,
  },
  6: {
    name: "Idle",
    startTime: 0,
  },
  7: {
    name: "Kick",
    startTime: 20,
  },
  8: {
    name: "Salute",
    startTime: 24.5,
  },
  9: {
    name: "T_Pose",
    startTime: 0,
  },
  10: {
    name: "Yelling",
    startTime: 32,
  },
};

export const getActionMap = (key: number): AnimationConfig | undefined => {
  return actionMap[key as keyof typeof actionMap];
};

const mapCardBorders = {
  bronze: {
    border: "/card/top-2.png",
    qr: "/card/qr.png",
  },
  gold: {
    border: "/card/top-2_Dorado.webp",
    qr: "/card/qr_Dorado.png",
  },
  platinum: {
    border: "/card/top-2_Platino.webp",
    qr: "/card/qr_Platino.png",
  },
};

export const mapCardBorderTexture = (type: "bronze" | "gold" | "platinum") => {
  const obj = mapCardBorders[type as keyof typeof mapCardBorders];
  return obj;
};
