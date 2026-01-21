import { Effect } from "postprocessing";
import { Uniform, Color } from "three";

export class BlueVignetteEffect extends Effect {
  constructor({ strength = 0.5, radius = 0.75, color = "#0F0052" } = {}) {
    super(
      "BlueVignetteEffect",
      /* glsl */ `
        uniform float strength;
        uniform float radius;
        uniform vec3 color;

        void mainImage(
          const in vec4 inputColor,
          const in vec2 uv,
          out vec4 outputColor
        ) {
          vec2 centered = uv - 0.5;
          float dist = length(centered);

          float vignette = smoothstep(radius - 0.2, 0.9, dist);
          
          vec3 mixedColor = mix(
            inputColor.rgb,
            inputColor.rgb * color,
            vignette * strength
          );

          outputColor = vec4(mixedColor, inputColor.a);
        }
      `,
      {
        uniforms: new Map<string, Uniform>([
          ["strength", new Uniform(strength)],
          ["radius", new Uniform(radius)],
          ["color", new Uniform(new Color(color))],
        ]),
      },
    );
  }
}
