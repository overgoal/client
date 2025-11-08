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
};

export const mapAccesoriesTexture = (team: number) => {
  const texture = accesoriesTextures[team as keyof typeof accesoriesTextures];

  return texture;
};

const actionMap = {
  0: "Bow_and_Arrow",

  1: "Break_Idle",

  2: "Clapping",

  3: "Dance_1",

  4: "Dance_2",

  5: "Epic",

  6: "Idle",

  7: "Kick",

  8: "Salute",

  9: "T_Pose",

  10: "Yelling",
};

export const getActionMap = (key: number) => {
  return actionMap[key as keyof typeof actionMap];
};

const mapCardBorders = {
  bronze: {
    border: "/card/top-2.png",
    qr: "/card/qr.png",
  },
  gold: {
    border: "/card/top-2_Dorado.png",
    qr: "/card/qr_Dorado.png",
  },
  platinum: {
    border: "/card/top-2_Platino.png",
    qr: "/card/qr_Platino.png",
  },
};

export const mapCardBorderTexture = (type: "bronze" | "gold" | "platinum") => {
  const obj = mapCardBorders[type as keyof typeof mapCardBorders];
  return obj;
};
