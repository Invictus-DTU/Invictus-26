"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { SceneContent } from "./SceneContent";
import { useState, useEffect } from "react";
import GlitchIntro from "./GlitchIntro";
import VideoTransition from "./VideoTransition";
/* -----------------------------
   Canvas Wrapper
----------------------------- */
export default function ThreeScene() {

  const [playTransition, setPlayTransition] = useState(false);
  const [currSection, setcurrSection] = useState(0);
  const [glitchTrigger, setGlitchTrigger] = useState(0);
  useEffect(() => {
  document.body.classList.add("cursor-hidden");
  return () => document.body.classList.remove("cursor-hidden");
}, []);

  useEffect(() => {
    setGlitchTrigger((t) => t + 1);
  }, []);

  useEffect(() => {
    if (currSection === 2) {
      setGlitchTrigger((t) => t + 1);
    }
  }, [currSection]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GlitchIntro trigger={glitchTrigger} currSection={currSection}  />

      <Canvas
        camera={{ position: [0, 12, 12], fov: 50 }}
        className="absolute inset-0"
        frameloop={playTransition ? "never" : "always"}
        >
        <ScrollControls pages={3} damping={0.18}>
          <SceneContent setcurrSection={setcurrSection} playTransition={playTransition} onStartExplore={() => setPlayTransition(true)} />
        </ScrollControls>
      </Canvas>

      <VideoTransition
        play={playTransition}
        onEnd={() => {

          window.location.href = "/";
          //unmount the model or three scene & start the site or show the model at in the starting only at /model directly then route to /
        }}
      />
    </div>
  );
}
