"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ================= SHADERS ================= */

const vertexShader = `
attribute float life;
varying float vLife;

void main() {
  vLife = life;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float size = 0.02 * life;
    size *= (300.0 / -mvPosition.z); // distance attenuation
    gl_PointSize = size;

  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
precision highp float;
varying float vLife;

void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float dist = length(p);

  float alpha = smoothstep(1.0, 0.0, dist);
  alpha *= vLife;

  vec3 color = vec3(0.95, 0.88, 0.78); // warm gold

  gl_FragColor = vec4(color, alpha);
}
`;

/* ================= COMPONENT ================= */

export default function ShootingStarCursor() {
  const pointsRef = useRef();
  const prevWorldPos = useRef(new THREE.Vector3());

  const { camera, mouse } = useThree();

  const COUNT = 8000;

  /* ===== GEOMETRY BUFFERS ===== */
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();

    const positions = new Float32Array(COUNT * 3);
    const velocity = new Float32Array(COUNT * 3);
    const life = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) life[i] = 0;

    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("velocity", new THREE.BufferAttribute(velocity, 3));
    g.setAttribute("life", new THREE.BufferAttribute(life, 1));

    return g;
  }, []);

  /* ===== MATERIAL ===== */
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  /* ===== FRAME LOOP ===== */
  useFrame((_, delta) => {
const worldPos = new THREE.Vector3(mouse.x, mouse.y, 0.2);
worldPos.unproject(camera);


    const dir = worldPos.clone().sub(prevWorldPos.current);
    prevWorldPos.current.copy(worldPos);

    const pos = geometry.attributes.position.array;
    const vel = geometry.attributes.velocity.array;
    const life = geometry.attributes.life.array;

    /* Shift particles back */
    for (let i = COUNT - 1; i > 0; i--) {
      life[i] = life[i - 1];
      pos[i * 3] = pos[(i - 1) * 3];
      pos[i * 3 + 1] = pos[(i - 1) * 3 + 1];
      pos[i * 3 + 2] = pos[(i - 1) * 3 + 2];

      vel[i * 3] = vel[(i - 1) * 3];
      vel[i * 3 + 1] = vel[(i - 1) * 3 + 1];
      vel[i * 3 + 2] = vel[(i - 1) * 3 + 2];
    }

    /* Head particle */
    life[0] = 1;
    pos[0] = worldPos.x;
    pos[1] = worldPos.y;
    pos[2] = worldPos.z;

    vel[0] = dir.x * 30;
    vel[1] = dir.y * 30;
    vel[2] = dir.z * 30;

    /* Update all */
    for (let i = 0; i < COUNT; i++) {
      life[i] -= delta * 0.5;

      pos[i * 3] += vel[i * 3] * delta;
      pos[i * 3 + 1] += vel[i * 3 + 1] * delta;
      pos[i * 3 + 2] += vel[i * 3 + 2] * delta;

      vel[i * 3] *= 0.88;
      vel[i * 3 + 1] *= 0.88;
      vel[i * 3 + 2] *= 0.88;

      if (life[i] <= 0) {
        pos[i * 3] = worldPos.x;
        pos[i * 3 + 1] = worldPos.y;
        pos[i * 3 + 2] = worldPos.z;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.velocity.needsUpdate = true;
    geometry.attributes.life.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}
