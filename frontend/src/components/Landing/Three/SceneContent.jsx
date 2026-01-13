"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  useScroll,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  GodRays,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { Model } from "./Model";
import { Model2 } from "./Model2";
import { MarbleGround } from "./MarbleGround";
import { Walls } from "./Walls";
import { Clouds } from "./Clouds";
import { GradientSky } from "./GradientSky";
import { Sun } from "./Sun";
import { Ocean } from "./Ocean";
import { Fog } from "./Fog";
import { AnimatedTextSections } from "./AnimatedTextSections";
import { Lotus } from "./Lotus";

export function SceneContent() {
  const modelRef = useRef();
  const scroll = useScroll();
  const [sun, setSun] = useState();

  // Camera keyframes
  const cameraShots = [
    {
      pos: new THREE.Vector3(4, 10, -13), // TOP VIEW
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      pos: new THREE.Vector3(10, 0, 2), // SIDE VIEW
      lookAt: new THREE.Vector3(0, 2, 0),
    },
    {
      pos: new THREE.Vector3(0, -0.2, 9), // FRONT VIEW
      lookAt: new THREE.Vector3(0, 0, 0),
    },
  ];

  useFrame((state) => {
    const totalSections = cameraShots.length - 1;
    const progress = scroll.offset * totalSections;

    const sectionIndex = Math.floor(progress);
    const sectionT = progress % 1;

    const current = cameraShots[sectionIndex];
    const next = cameraShots[Math.min(sectionIndex + 1, totalSections)];

    // Smooth camera movement
    state.camera.position.lerpVectors(current.pos, next.pos, sectionT);

    const lookAt = current.lookAt.clone().lerp(next.lookAt, sectionT);

    state.camera.lookAt(lookAt);

    // Optional: subtle model parallax
    if (modelRef.current) {
      modelRef.current.position.y = -1 - scroll.offset * 0.3;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />

      {/* Temple Model */}
      {/* <Model
        ref={modelRef}
        scale={0.055}
        position={[0, -1, 0]}
      /> */}
      <Model2
        ref={modelRef}
        scale={2.5}
        rotation={[0, Math.PI, 0]}
        position={[0, -1, 0]}
        shadows={true}
      />

      {/* Lotus */}
      <Lotus position={[8, -1, -2]} scale={5} />
      <Lotus position={[-8, -1, -2]} scale={5} />

      {/* Water surface with reflections */}
      <Ocean position={[0, -2, 0]} />

      {/* Fog around model */}
      <Fog position={[0, -1, 0]} />

      {/* Ground */}
      {/* <MarbleGround /> */}

      {/* Walls */}
      {/* <Walls /> */}

      {/* Clouds */}
      {/* <Clouds /> */}

      {/* Sky */}
      <GradientSky />

      {/* Sun */}
      <Sun ref={sun} position={[-20, 15, -40]} />

      <Environment preset="sunset" />

      {/* Animated Text Sections */}
      {/* <AnimatedTextSections /> */}

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
        />

        <Noise opacity={0.1} />

        <Vignette eskil={false} offset={0.1} darkness={0.9} />
        {/* {sun && (
          <GodRays
            sun={sunRef}
            decay={0.9} // An illumination decay factor.
            weight={0.1} // A light ray weight factor.
            exposure={0.2} // A constant attenuation coefficient.
            // blur={true} // Whether the god rays should be blurred to reduce artifacts.
          />
        )} */}
      </EffectComposer>
    </>
  );
}
