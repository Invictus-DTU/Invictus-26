"use client";

import { Text3D } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function ThreeDText({
  text,
  position,
  rotation,
  size ,
  bevelEnabled,
  section,
  activeSection,
  scroll,
}) {
  const ref = useRef();
  const { viewport } = useThree();
  const responsiveSize = viewport.width / 180;


  useFrame(({ clock }) => {
    if (!ref.current) return;

    const totalSections = 2; // cameraShots.length - 1
    const progress = scroll.offset * totalSections;
    const revealOffset = -0.2; // decide opacity not ki kab aayega
    const distance = Math.abs(progress - (section - revealOffset));


    // fade window (0 → 1)
    const opacity = THREE.MathUtils.clamp(1 - distance, 0, 1);

    ref.current.material.opacity +=
      (opacity - ref.current.material.opacity) * 0.1;

    // subtle float
    ref.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 3.1) * 0.015;
  });

  return (
    <Text3D
      ref={ref}
      font="/model/fonts/font.json"
      size={size ?? responsiveSize}
      height={0.08}
      bevelEnabled={bevelEnabled}
      bevelSize={0.01}
      bevelThickness={0.015}
      position={position}
      rotation={rotation}
    //   letterSpacing={0.01}
    >
      {text}
      <meshStandardMaterial
        color="#f2e6d8"
        // roughness={0.75}
        metalness={0.05}
        transparent
        opacity={0}
      />
    </Text3D>
  );
}

export function MultiLineText3D({
  lines = [],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1,
  lineHeight = 0.8,
  scroll,
  section,
}) {
  const groupRef = useRef();
  const materialRefs = useRef([]);

    useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const totalSections = 2;
    const progress = scroll.offset * totalSections;

    // reveal earlier than section
    const revealOffset = 0.4;
    const baseDistance = Math.abs(progress - (section - revealOffset));

    materialRefs.current.forEach((mat, i) => {
        if (!mat) return;

        // stagger per line(i dont think working)
        const lineDelay = i * 0.25;
        const distance = Math.max(baseDistance - lineDelay, 0);

        const targetOpacity = THREE.MathUtils.clamp(1 - distance, 0, 1);

        mat.opacity += (targetOpacity - mat.opacity) * 0.08;
    });

    // subtle float
    groupRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 2.5) * 0.02;
    });


  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {lines.map((line, i) => (
        <Text3D
          key={i}
          font="/model/fonts/font.json"
          size={size}
          height={0.07}
          bevelEnabled
          bevelSize={0.01}
          bevelThickness={0.015}
          position={[
            0,
            -i * lineHeight +
                (1 - (materialRefs.current[i]?.opacity ?? 0)) * 0.3,
            0,
            ]}

        >
          {line}
          <meshStandardMaterial
            ref={(el) => (materialRefs.current[i] = el)}
            color="#f2e6d8"
            roughness={0.75}
            metalness={0.05}
            transparent
            opacity={0}
          />
        </Text3D>
      ))}
    </group>
  );
}

