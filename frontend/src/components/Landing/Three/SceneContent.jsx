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
import ShootingStarCursor from "./ShootingStarCursor";
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
import { Birds } from "./Birds";
import { Boat } from "./Boat";
import { Mountain } from "./Mountain";
import { Shiva } from "./Shiva";
import { ThreeDText, MultiLineText3D } from "./3dText";

export function SceneContent({ setcurrSection, playTransition, onStartExplore }) {
  const modelRef = useRef();
  const scroll = useScroll();
  const [sun, setSun] = useState();
  const [activeSection, setActiveSection] = useState(0);

  // Camera keyframes
  const cameraShots = [
    {
      pos: new THREE.Vector3(4, 10, -13), // TOP VIEW
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      pos: new THREE.Vector3(12, 0, 0), // SIDE VIEW
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

  setActiveSection((prev) =>
    prev !== sectionIndex ? sectionIndex : prev
  );

  setcurrSection((prev) =>
    prev !== sectionIndex ? sectionIndex : prev
  );

  const current = cameraShots[sectionIndex];
  const next = cameraShots[Math.min(sectionIndex + 1, totalSections)];

  state.camera.position.lerpVectors(current.pos, next.pos, sectionT);

  const lookAt = current.lookAt.clone().lerp(next.lookAt, sectionT);
  state.camera.lookAt(lookAt);

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
      {/* <Fog position={[0, -1, 0]} /> */}

      {/* Ground */}
      {/* <MarbleGround /> */}

      {/* Walls */}
      {/* <Walls /> */}

      {/* Clouds */}
      {/* <Clouds /> */}

      {/* Sky */}
      <GradientSky />

      {/* CAMERA SHOT 0 — TOP VIEW */}
      {activeSection === 0 && (
        <ThreeDText
          text="Invictus '26"
          size={1.9}
          position={[0, 0, 12]}
          rotation={[1,9.4,-0.1]}
          section={0}
          activeSection={activeSection}
          scroll={scroll}
        />
      )}

      {activeSection === 1 && (
        <MultiLineText3D
        lines={[
          "Invictus '26",
          "brings back its plethora of events",
          "with its theme based on Indian heritage",
        ]}
        position={[-4, 6, 4]}
        rotation={[1, 1.8, -1]}
        size={0.4}
        section={1}
        scroll={scroll}
      />
      )}

      {activeSection === 2 && (
        <ThreeDText
          text="Start Exploring"
          size={0.03}
          position={[-0.19, -0.2, 8]}
          rotation={[0,0.11,0]}
          section={2}
          activeSection={activeSection}
          scroll={scroll}
          onStartExplore={onStartExplore}
        />

      )}

      {/* Sun */}
      <Sun ref={sun} position={[-20, 15, -60]} />

      {/* Birds */}
      <Birds />

      {/* boat */}
      <Boat />

      {/* mountain */}
      <Mountain position={[40,-4,-95]} scale={18} />
      <Mountain position={[-60,-6,-100]} scale={15} />

      {/* shiva */}
      <Shiva position={[-70,-2,30]} scale={0.4} />

      <Environment preset="sunset" />
      <ShootingStarCursor />

      {/* Animated Text Sections */}
      {/* <AnimatedTextSections /> */}

      {/* Post-processing effects */}
      {!playTransition && (
      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.7}
          luminanceSmoothing={2.9}
        />

        <Noise opacity={0.05} />

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
      )}
    </>
  );
}
