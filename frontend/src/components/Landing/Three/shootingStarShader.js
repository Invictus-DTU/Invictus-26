export const shootingStarVertex = `
uniform float uTime;
uniform vec2 uMouse;

attribute float aRandom;

varying float vAlpha;

void main() {
  vec3 pos = position;

  float dist = distance(pos.xy, uMouse);
  float strength = exp(-dist * 0.05);

  pos.z += strength * 8.0 * aRandom;

  vAlpha = strength;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 2.5 + strength * 6.0;
}
`;

export const shootingStarFragment = `
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;

  gl_FragColor = vec4(1.0, 0.85, 0.6, vAlpha);
}
`;
