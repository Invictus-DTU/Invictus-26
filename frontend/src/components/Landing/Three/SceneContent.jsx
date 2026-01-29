"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, useScroll } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import ShootingStarCursor from "./ShootingStarCursor";
import * as THREE from "three";
import { Model2 } from "./Model2";
import { GradientSky } from "./GradientSky";
import { Sun } from "./Sun";
import { Ocean } from "./Ocean";
import { Fog } from "./Fog";
import { Lotus } from "./Lotus";
import { Birds } from "./Birds";
import { Boat } from "./Boat";
import { Mountain } from "./Mountain";
import { Shiva } from "./Shiva";
import { ThreeDText, MultiLineText3D } from "./3dText";
import { useRouter } from "next/router";
import { Clouds } from "./Clouds";
import { Lion } from "./Lion";

export function SceneContent({
  setcurrSection,
  playTransition,
  onStartExplore,
  setScrollOffset,
}) {
  const modelRef = useRef();
  const scroll = useScroll();
  const [sun, setSun] = useState();
  const [activeSection, setActiveSection] = useState(0);
  const router = useRouter();

  // Mouse position for camera wobble
  const mousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  // Camera keyframes state
  const [cameraShots, setCameraShots] = useState([
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
  ]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to -1 to 1 range
      targetMousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Adjust camera positions for mobile devices
  useEffect(() => {
    const handleResize = () => {
      const isMobile_ = window.innerWidth <= 768;
      setIsMobile(isMobile_);
      if (isMobile_) {
        setCameraShots([
          {
            pos: new THREE.Vector3(5, 10, -30), // TOP VIEW - adjusted for mobile
            lookAt: new THREE.Vector3(0, 0, 0),
          },
          {
            pos: new THREE.Vector3(30, 0, 0), // SIDE VIEW - adjusted for mobile
            lookAt: new THREE.Vector3(0, 2, 0),
          },
          {
            pos: new THREE.Vector3(0, -0.2, 15), // FRONT VIEW - adjusted for mobile
            lookAt: new THREE.Vector3(0, 0, 0),
          },
        ]);
      } else {
        setCameraShots([
          {
            pos: new THREE.Vector3(4, 10, -13), // TOP VIEW - desktop
            lookAt: new THREE.Vector3(0, 0, 0),
          },
          {
            pos: new THREE.Vector3(12, 0, 0), // SIDE VIEW - desktop
            lookAt: new THREE.Vector3(2, 3, 0),
          },
          {
            pos: new THREE.Vector3(0, -0.2, 9), // FRONT VIEW - desktop
            lookAt: new THREE.Vector3(0, 0, 0),
          },
        ]);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    const totalSections = cameraShots.length - 1;
    const progress = scroll.offset * totalSections;

    const sectionIndex = Math.floor(progress);
    const sectionT = progress % 1;

    setActiveSection((prev) => (prev !== sectionIndex ? sectionIndex : prev));

    setcurrSection((prev) => (prev !== sectionIndex ? sectionIndex : prev));

    if (setScrollOffset) {
      setScrollOffset(scroll.offset);
    }

    const current = cameraShots[sectionIndex];
    const next = cameraShots[Math.min(sectionIndex + 1, totalSections)];

    // Calculate camera position with wobble
    const basePos = new THREE.Vector3().lerpVectors(current.pos, next.pos, sectionT);
    
    // Disable wobble in section 2 and during transition to it
    const isInSection2 = sectionIndex >= 2 || (sectionIndex === 1 && sectionT > 0.5);
    const wobbleIntensity = isInSection2 ? 0 : 0.3;
    
    // Smoothly lerp mouse position for smoother wobble (only when not in section 2)
    if (!isInSection2) {
      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;
    } else {
      // Gradually reset wobble to zero when entering section 2
      mousePos.current.x *= 0.9;
      mousePos.current.y *= 0.9;
    }
    
    state.camera.position.set(
      basePos.x + mousePos.current.x * wobbleIntensity,
      basePos.y + mousePos.current.y * wobbleIntensity,
      basePos.z
    );

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

      {/* Clouds */}
      <Clouds />

      {/* Sky */}
      <GradientSky />

      {/* CAMERA SHOT 0 — TOP VIEW */}
      {activeSection === 0 && (
        <ThreeDText
          text="Invictus '26"
          size={isMobile ? 1.6 : 1.9}
          position={isMobile ? [5, 7, 12] : [7, 0, 12]}
          rotation={isMobile ? [0.5, 9.4, 0] : [1, 9.4, -0.1]}
          section={0}
          activeSection={activeSection}
          scroll={scroll}
        />
      )}

      {activeSection === 1 && (
        <>
          <MultiLineText3D
            lines={[
              "Invictus '26",
              "brings back its plethora of events",
              "with its theme based on Indian heritage",
            ]}
            position={[-3, 6, 6]}
            rotation={[1, 1.8, -1]}
            size={0.4}
            section={1}
            scroll={scroll}
          />
          {/* 3D Button */}
          <group
            position={isMobile ? [15.8, -0.9, 1.8] : [-1, 3.3, 4.3]}
            scale={1}
            rotation={[1, 1.8, -1]}
          >
            <mesh
              onClick={() => {
                router.push("/Events");
              }}
              onPointerOver={(e) => {
                document.body.style.cursor = "pointer";
                e.object.scale.set(1.1, 1.1, 1.1);
              }}
              onPointerOut={(e) => {
                document.body.style.cursor = "default";
                e.object.scale.set(1, 1, 1);
              }}
            >
              <boxGeometry args={[2, 0.6, 0.3]} />
              <meshStandardMaterial
                color="#DAA06D"
                metalness={0.5}
                roughness={0.3}
                emissive="#764ba2"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
          <ThreeDText
            text="Events"
            size={0.3}
            position={isMobile ? [16, -1, 2.5] : [-0.7, 3.2, 5]}
            rotation={[1, 1.8, -1]}
            section={1}
            activeSection={activeSection}
            scroll={scroll}
          />
        </>
      )}

      {activeSection === 2 && (
        <>
          <ThreeDText
            text="Start Exploring"
            size={0.03}
            position={[-0.19, -0.2, isMobile ? 13.4 : 8]}
            rotation={[0, 0.11, 0]}
            section={2}
            activeSection={activeSection}
            scroll={scroll}
          />
          {/* 3D Button */}
          <group position={[0, -0.3, isMobile ? 13.4 : 8]} scale={0.1}>
            <mesh
              onClick={() => {
                onStartExplore();
              }}
              onPointerOver={(e) => {
                document.body.style.cursor = "pointer";
                e.object.scale.set(1.1, 1.1, 1.1);
              }}
              onPointerOut={(e) => {
                document.body.style.cursor = "default";
                e.object.scale.set(1, 1, 1);
              }}
            >
              <boxGeometry args={[2, 0.6, 0.3]} />
              <meshStandardMaterial
                color="#DAA06D"
                metalness={0.5}
                roughness={0.3}
                emissive="#764ba2"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
          <ThreeDText
            text="Explore"
            size={0.024}
            position={[-0.08, -0.31, isMobile ? 13.4 : 8]}
            rotation={[-0.1, 0.11, 0]}
            section={2}
            activeSection={activeSection}
            scroll={scroll}
          />
        </>
      )}

      <Fog position={[0, -1, 0]} />

      {/* Sun */}
      <Sun ref={sun} position={[-20, 15, -60]} />

      {/* Birds */}
      <Birds />

      {/* boat */}
      <Boat />

      {/* mountain */}
      <Mountain position={[40, -4, -95]} scale={18} />
      <Mountain position={[-60, -6, -100]} scale={15} />

      {/* shiva */}
      {/* <Shiva position={[-70, -2, 30]} scale={0.4} /> */}
      <Lion position={[-50, 3.3, 40]} scale={1.2} />

      <Environment preset="sunset" />

      {!isMobile && <ShootingStarCursor />}

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
        </EffectComposer>
      )}
    </>
  );
}
