// Retro Pixel Shader for protein rendering
export const PixelVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const PixelFragmentShader = `
uniform sampler2D tDiffuse;
uniform float pixelSize;
uniform vec2 resolution;

varying vec2 vUv;

// 8-bit color palette (limited colors like old consoles)
vec3 quantizeColor(vec3 color) {
  // Reduce to 8 levels per channel (3-bit per channel = 512 colors)
  float levels = 8.0;
  return floor(color * levels) / levels;
}

// Dithering pattern (Bayer 4x4)
float dither4x4(vec2 position) {
  int x = int(mod(position.x, 4.0));
  int y = int(mod(position.y, 4.0));
  int index = x + y * 4;

  float dither[16];
  dither[0] = 0.0; dither[1] = 8.0; dither[2] = 2.0; dither[3] = 10.0;
  dither[4] = 12.0; dither[5] = 4.0; dither[6] = 14.0; dither[7] = 6.0;
  dither[8] = 3.0; dither[9] = 11.0; dither[10] = 1.0; dither[11] = 9.0;
  dither[12] = 15.0; dither[13] = 7.0; dither[14] = 13.0; dither[15] = 5.0;

  for (int i = 0; i < 16; i++) {
    if (i == index) return dither[i] / 16.0;
  }
  return 0.0;
}

void main() {
  // Pixelate the UV coordinates
  vec2 pixelatedUV = floor(vUv * resolution / pixelSize) * pixelSize / resolution;

  // Sample the texture
  vec4 texColor = texture2D(tDiffuse, pixelatedUV);

  // Apply dithering
  vec2 pixelPos = vUv * resolution / pixelSize;
  float ditherValue = dither4x4(pixelPos) - 0.5;

  // Add dithering to color
  vec3 ditheredColor = texColor.rgb + ditherValue * 0.1;

  // Quantize to limited color palette
  vec3 finalColor = quantizeColor(ditheredColor);

  gl_FragColor = vec4(finalColor, texColor.a);
}
`;

// Outline shader for pixel art style edges
export const OutlineVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const OutlineFragmentShader = `
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2 resolution;
uniform float outlineThickness;
uniform vec3 outlineColor;

varying vec2 vUv;

void main() {
  vec2 texel = vec2(1.0 / resolution.x, 1.0 / resolution.y);

  // Sample depth at current pixel and neighbors
  float depth = texture2D(tDepth, vUv).r;
  float depthN = texture2D(tDepth, vUv + vec2(0.0, texel.y) * outlineThickness).r;
  float depthS = texture2D(tDepth, vUv - vec2(0.0, texel.y) * outlineThickness).r;
  float depthE = texture2D(tDepth, vUv + vec2(texel.x, 0.0) * outlineThickness).r;
  float depthW = texture2D(tDepth, vUv - vec2(texel.x, 0.0) * outlineThickness).r;

  // Calculate depth difference
  float depthDiff = abs(depthN - depth) + abs(depthS - depth) + abs(depthE - depth) + abs(depthW - depth);

  // Get original color
  vec4 color = texture2D(tDiffuse, vUv);

  // Apply outline
  float outline = step(0.001, depthDiff);

  gl_FragColor = mix(color, vec4(outlineColor, 1.0), outline * 0.8);
}
`;
