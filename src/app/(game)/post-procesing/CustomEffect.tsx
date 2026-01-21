import { Effect } from "postprocessing";
import { Uniform, Vector2, Color } from "three";

export class CRTEffect extends Effect {
  constructor({ intensity = 0.3, tintColor = "#0FADFF" } = {}) {
    super(
      "CRTEffect",
      /* glsl */ `
        uniform vec2 resolution;
        uniform float intensity;
        uniform vec3 tintColor;

        void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
        {
            // Calculate fragCoord based on uv and resolution
            vec2 fragCoord = uv * resolution;

            // Default color
            vec4 lcdColor = vec4(1.0);

            // Darken every 3rd horizontal strip for scanline
            if (int(mod(fragCoord.y, 3.0)) == 1) {
                lcdColor.rgb = vec3(2.0);
            } else {
                lcdColor.rgb = vec3(1.0);
            }

            vec4 finalColor = inputColor * lcdColor;
            outputColor = mix(finalColor, finalColor * vec4(tintColor, 1.0), intensity);
        }
      `,
      {
        uniforms: new Map<string, Uniform>([
          [
            "resolution",
            new Uniform(
              new Vector2(
                window.innerWidth * Math.min(window.devicePixelRatio, 2),
                window.innerHeight * Math.min(window.devicePixelRatio, 2),
              ),
            ),
          ],
          ["intensity", new Uniform(intensity)],
          ["tintColor", new Uniform(new Color(tintColor))],
        ]),
      },
    );
  }
}
