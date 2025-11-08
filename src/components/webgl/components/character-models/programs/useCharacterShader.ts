import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import characterFrag from "./characterMaterial.frag?raw";



type props = {
  baseTexture: THREE.Texture;
};

export const useCharacterShader = ({ baseTexture }: props) => {
  const maskTexture = useTexture(
    "/models/Male/textures/Mask_MainBody_Mat_BaseColor.png"
  );

  
  const material = useMemo(() => {

    const material = new THREE.MeshBasicMaterial({
      map: baseTexture,
      color: new THREE.Color(0xffffff),
      vertexColors: false,
      /// @ts-ignore
      skinning: true,
    });
  
    material.onBeforeCompile = (shader) => {

      shader.vertexShader = 'varying vec4 vWorldPosition;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <worldpos_vertex>',
        [
          '#include <worldpos_vertex>',
          'vWorldPosition = modelMatrix * vec4( transformed, 1.0 );'
        ].join( '\n' )
      );

      shader.uniforms.uBaseTexture = { value: baseTexture };
      shader.uniforms.uMaskTexture = { value: maskTexture };
      // shader.vertexShader = characterVert;
      shader.fragmentShader = characterFrag;
    
    };

    // return new THREE.ShaderMaterial({
    //   vertexShader: characterVert,
    //   fragmentShader: characterFrag,
    //   uniforms: {
    //     uBaseTexture: { value: baseTexture },
    //     uMaskTexture: { value: maskTexture },
    //   },
    //   /// @ts-ignore
    //   ...THREE.UniformsLib.skinning,
    //   skinning: true,
    // });

    return material;
  }, [baseTexture, maskTexture]);

  return material;
};
