varying vec2 vUv;
varying vec4 vColor;
uniform sampler2D uBaseTexture;
uniform sampler2D uMaskTexture;

void main() {
    vec4 baseColor = texture2D(uBaseTexture, vUv);
    vec4 maskColor = texture2D(uMaskTexture, vUv);

   vec4 finalColor = mix(baseColor, maskColor, 0.5);

    gl_FragColor = finalColor;
}