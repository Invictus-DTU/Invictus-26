"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* CONFIG */
const PARTICLE_COUNT = 6000;
const SPAWN_PER_FRAME = 40;

export default function ShootingStarCursor() {
  const pointsRef = useRef();
  const index = useRef(0);

  const { mouse, viewport } = useThree();
  const clock = useRef(0);

  /* ---------- GEOMETRY ---------- */
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3)
    );

    geo.setAttribute(
      "aVelocity",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3)
    );

    geo.setAttribute(
      "aStartTime",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT), 1)
    );

    geo.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT), 1)
    );

    return geo;
  }, []);

  /* ---------- SHADER ---------- */
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: `
          attribute vec3 aVelocity;
          attribute float aStartTime;
          attribute float aRandom;

          uniform float uTime;

          varying float vAlpha;

          void main() {
            float age = uTime - aStartTime;

            if (age < 0.0) {
              vAlpha = 0.0;
              gl_Position = vec4(0.0);
              return;
            }

            vec3 pos = position + aVelocity * age * 6.0;

            float life = 1.0 - age * 0.8;
            vAlpha = clamp(life, 0.0, 1.0);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 6.0 * vAlpha;
          }
        `,
        fragmentShader: `
          varying float vAlpha;

          void main() {
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float d = dot(p, p);

            if (d > 1.0) discard;

            gl_FragColor = vec4(1.0, 0.85, 0.55, vAlpha);
          }
        `,
      }),
    []
  );

  /* ---------- UPDATE ---------- */
  useFrame((state, delta) => {
    clock.current += delta;
    material.uniforms.uTime.value = clock.current;

    const posAttr = geometry.attributes.position;
    const velAttr = geometry.attributes.aVelocity;
    const timeAttr = geometry.attributes.aStartTime;
    const randAttr = geometry.attributes.aRandom;

    const x = mouse.x * viewport.width * 0.5;
    const y = mouse.y * viewport.height * 0.5;

    for (let i = 0; i < SPAWN_PER_FRAME; i++) {
      const i3 = index.current * 3;

      posAttr.array[i3] = x;
      posAttr.array[i3 + 1] = y;
      posAttr.array[i3 + 2] = 0;

      velAttr.array[i3] = (Math.random() - 0.5) * 0.6;
      velAttr.array[i3 + 1] = (Math.random() - 0.5) * 0.6;
      velAttr.array[i3 + 2] = Math.random() * 0.8;

      timeAttr.array[index.current] = clock.current;
      randAttr.array[index.current] = Math.random();

      index.current = (index.current + 1) % PARTICLE_COUNT;
    }

    posAttr.needsUpdate = true;
    velAttr.needsUpdate = true;
    timeAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
