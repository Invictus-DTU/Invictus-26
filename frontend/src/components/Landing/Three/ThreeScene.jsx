"use client";//use client rhene dena because nextJs server side rendering krta model client side p dikhana

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Model } from "./Model";

function MarbleGround() {
  const textureRef = useRef();
  
  // Create a marble tile texture with black strips
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    const tileSize = 128; // Size of each marble tile
    const stripWidth = 8; // Width of black strips between tiles
    
    // Draw marble tiles
    for (let x = 0; x < canvas.width; x += tileSize) {
      for (let y = 0; y < canvas.height; y += tileSize) {
        // White marble tile with slight variation
        const variation = Math.random() * 10 + 240;
        ctx.fillStyle = `rgb(${variation}, ${variation}, ${variation})`;
        ctx.fillRect(x, y, tileSize - stripWidth, tileSize - stripWidth);
        
        // Add marble veining
        ctx.strokeStyle = `rgba(180, 180, 180, ${Math.random() * 0.3 + 0.2})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.random() * tileSize, y);
        ctx.quadraticCurveTo(
          x + tileSize / 2 + Math.random() * 20 - 10,
          y + tileSize / 2,
          x + Math.random() * tileSize,
          y + tileSize
        );
        ctx.stroke();
      }
    }
    
    // Draw black strips (grout lines)
    ctx.fillStyle = '#1a1a1a';
    for (let x = 0; x < canvas.width; x += tileSize) {
      ctx.fillRect(x + tileSize - stripWidth, 0, stripWidth, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += tileSize) {
      ctx.fillRect(0, y + tileSize - stripWidth, canvas.width, stripWidth);
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    
    return tex;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.3} 
        metalness={0.1}
      />
    </mesh>
  );
}

function SceneContent() {
  const modelRef = useRef();
  const scroll = useScroll();

  // Camera keyframes
  const cameraShots = [
    {
      pos: new THREE.Vector3(4, 9, -12), // TOP VIEW
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
    const next =
      cameraShots[Math.min(sectionIndex + 1, totalSections)];

    // Smooth camera movement
    state.camera.position.lerpVectors(
      current.pos,
      next.pos,
      sectionT
    );

    const lookAt = current.lookAt
      .clone()
      .lerp(next.lookAt, sectionT);

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
      <Model
        ref={modelRef}
        scale={0.055}
        position={[0, -1, 0]}
      />

      {/* Ground */}
      <MarbleGround />

      {/* Sky */}
      <Environment preset="night" background />
    </>
  );
}

/* -----------------------------
   Canvas Wrapper
----------------------------- */
export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 12, 12], fov: 50 }}
      style={{ width: "100%", height: "100vh" }}
    >
      {/* 3 scroll sections */}
      <ScrollControls pages={3} damping={0.18}>
        <SceneContent />
      </ScrollControls>
    </Canvas>
  );
}
