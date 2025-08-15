import fs from "fs";

const makeBuild = () => {
  fs.copyFile("../../../universe/manifest_dev.json", "./manifest_dev.json", (err) => {
    if (err) {
      console.error("Error copying manifest_dev.json", err);
    }
  });
};

makeBuild();