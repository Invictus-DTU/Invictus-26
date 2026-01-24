"use client";

import { Cloud } from "@react-three/drei";

export function Clouds() {
  return (
    <>
      <Cloud
        fade={true}
        concentrate="random"
        // growth={2}
        // segments={30}
        color={"gray"}
        volume={12}
        position={[-70, 40, 20]}
        speed={0.3}
        opacity={0.01}
        scale={[2, 5, 19]}
      />
      <Cloud
        fade={true}
        concentrate="outside"
        color={"white"}
        // growth={4}
        volume={10}
        segments={20}
        position={[-70, 38, -15]}
        speed={0.02}
        opacity={0.07}
        scale={[3, 4, 8]}
      />
       <Cloud
        fade={true}
        concentrate="random"
        color={"white"}
        // growth={2}
        volume={20}
        segments={30}
        position={[-70, 40, 50]}
        speed={0.22}
        opacity={0.06}
        scale={[3, 2, 10]}
      />
      {/* <Cloud position={[-12, 13, -5]} speed={0.22} opacity={0.8} scale={[2, 1.5, 3]} /> */}
    </>
  );
}
