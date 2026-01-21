import { Effect } from "postprocessing";
import { Uniform } from "three";

export class BlueVignetteEffect extends Effect {
  constructor({ strength = 0.5, radius = 0.75 } = {}) {
    super(
      "BlueVignetteEffect",
      /* glsl */ `
        uniform float strength;
        uniform float radius;

        void mainImage(
          const in vec4 inputColor,
          const in vec2 uv,
          out vec4 outputColor
        ) {
          vec2 centered = uv - 0.5;
          float dist = length(centered);

          float vignette = smoothstep(radius - 0.2, 0.9, dist);
          vec3 blueTint = vec3(15.0 / 255.0, 0.0 / 255.0, 82.0 / 255.0);
        // vec3 blueTint = vec3(1.0, 0.0, 0.0);

          vec3 color = mix(
            inputColor.rgb,
            inputColor.rgb * blueTint,
            vignette * strength
          );

          outputColor = vec4(color, inputColor.a);
        }
      `,
      {
        uniforms: new Map([
          ["strength", new Uniform(strength)],
          ["radius", new Uniform(radius)],
        ]),
      },
    );
  }
}
