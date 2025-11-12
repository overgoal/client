uniform sampler2D uTexture;
uniform float uTime;
uniform float uGlitchIntensity;

varying vec2 vUv;

// 2D Random (returns 0 - 1)
float random2d(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

// Random range
float randomRange(in vec2 seed, in float min, in float max) {
  return min + random2d(seed) * (max - min);
}

// Return 1 if v inside 1d range
float insideRange(float v, float bottom, float top) {
  return step(bottom, v) - step(top, v);
}

void main() {
  vec2 uv = vUv;
  
  // Inputs
  float AMT = uGlitchIntensity * 0.04; // 0 - 1 glitch amount
  float SPEED = 0.5; // 0 - 1 spee
  
  float time = floor(uTime * SPEED * 60.0);
  
  // Glitch trigger with delay
  float glitchTriggerTime = floor(uTime * 1.); // Check every 2 seconds
  float glitchRandom = random2d(vec2(glitchTriggerTime, 0.0));
  float glitchActive = step(0.9, glitchRandom); // 30% chance to glitch
  
  // If not active, return original texture
  if (glitchActive < 0.5) {
    gl_FragColor = texture2D(uTexture, uv);
    return;
  }
  
  // Copy original
  vec3 outCol = texture2D(uTexture, uv).rgb;
  
  // Randomly offset slices horizontally
  float maxOffset = AMT / 2.0;
  for (float i = 0.0; i < 10.0; i += 1.0) {
    float sliceY = random2d(vec2(time, 2345.0 + i));
    float sliceH = random2d(vec2(time, 9035.0 + i)) * 0.25;
    float hOffset = randomRange(vec2(time, 9625.0 + i), -maxOffset, maxOffset);
    vec2 uvOff = uv;
    uvOff.x += hOffset;
    if (insideRange(uv.y, sliceY, fract(sliceY + sliceH)) == 1.0) {
      outCol = texture2D(uTexture, uvOff).rgb;
    }
  }
  
  // Do slight offset on one entire channel
  float maxColOffset = AMT / 6.0;
  float rnd = random2d(vec2(time, 9545.0));
  vec2 colOffset = vec2(
    randomRange(vec2(time, 9545.0), -maxColOffset, maxColOffset), 
    randomRange(vec2(time, 7205.0), -maxColOffset, maxColOffset)
  );
  
  if (rnd < 0.33) {
    outCol.r = texture2D(uTexture, uv + colOffset).r;
  } else if (rnd < 0.66) {
    outCol.g = texture2D(uTexture, uv + colOffset).g;
  } else {
    outCol.b = texture2D(uTexture, uv + colOffset).b;
  }
  
  // Add scan lines for extra effect
  float scanline = sin(uv.y * 800.0 + uTime * 30.0) * 0.03;
  outCol += scanline * AMT;
  
  gl_FragColor = vec4(outCol, 1.0);
}

