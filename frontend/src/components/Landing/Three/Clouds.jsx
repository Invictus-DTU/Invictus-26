"use client";

import { Cloud } from "@react-three/drei";

export function Clouds() {
  return (
    <>
      <Cloud position={[15, 20, -10]} speed={0.2} opacity={0.4} scale={[8, 2, 4]} />
      <Cloud position={[15, 20, -15]} speed={0.15} opacity={0.3} scale={[6, 2, 3]} />
      <Cloud position={[20, 20, 10]} speed={0.25} opacity={0.35} scale={[7, 2, 3.5]} />
      <Cloud position={[20, 20, 5]} speed={0.18} opacity={0.32} scale={[5, 2, 3]} />
      <Cloud position={[18, 20, -5]} speed={0.22} opacity={0.8} scale={[6, 2, 4]} />
      {/* <Cloud position={[-12, 13, -5]} speed={0.22} opacity={0.8} scale={[2, 1.5, 3]} /> */}
    </>
  );
}
