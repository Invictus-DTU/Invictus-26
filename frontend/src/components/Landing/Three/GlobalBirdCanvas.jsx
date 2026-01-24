"use client";

import { Canvas } from "@react-three/fiber";
import { Birds } from "./Birds"; 

export default function GlobalBirdCanvas() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ contain: "strict" }}
    >
      <Canvas
        camera={{ position: [60, 22, -30], fov: 55 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <Birds />
      </Canvas>
    </div>
  );
}

