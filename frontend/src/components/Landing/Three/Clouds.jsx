"use client";

import { Cloud } from "@react-three/drei";

export function Clouds() {
  return (
    <>
      <Cloud fade={true} concentrate="random" growth={5} segments={100} position={[-80, 30, 10]} speed={0.22} opacity={0.5} scale={[3, 2, 8]} />
      {/* <Cloud position={[-12, 13, -5]} speed={0.22} opacity={0.8} scale={[2, 1.5, 3]} /> */}
    </>
  );
}
