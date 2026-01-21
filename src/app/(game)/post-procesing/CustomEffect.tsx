import { Effect } from "postprocessing";
import { Uniform, Vector2 } from "three";

export class CRTEffect extends Effect {
  constructor() {
    super(
      "CRTEffect",
      /* glsl */ `
        uniform vec2 resolution;

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

            vec3 tint = vec3(15.0, 173.0, 255.0) / 255.0;
            vec4 finalColor = inputColor * lcdColor;
            outputColor = mix(finalColor, finalColor * vec4(tint, 1.0), .3);
        }
      `,
      {
        uniforms: new Map([
          [
            "resolution",
            new Uniform(
              new Vector2(
                window.innerWidth * Math.min(window.devicePixelRatio, 2),
                window.innerHeight * Math.min(window.devicePixelRatio, 2),
              ),
            ),
          ],
        ]),
      },
    );
  }
}
