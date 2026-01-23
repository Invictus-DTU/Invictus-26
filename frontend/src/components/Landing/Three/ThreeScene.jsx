"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import GlitchIntro from "./GlitchIntro";
import VideoTransition from "./VideoTransition";
import SceneRoot from "./SceneRoot";

export default function ThreeScene({ onReady }) {
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
      <GlitchIntro trigger={glitchTrigger} currSection={currSection} />

      <Canvas
        camera={{ position: [0, 12, 12], fov: 50 }}
        className="absolute inset-0"
        frameloop={playTransition ? "never" : "always"}
        gl={{ alpha: true }}
        style={{ all: "unset" }}
      >
        <Suspense fallback={null}>
          <SceneRoot
            setcurrSection={setcurrSection}
            playTransition={playTransition}
            onStartExplore={() => setPlayTransition(true)}
            onReady={onReady}
          />
        </Suspense>
      </Canvas>

      <VideoTransition
        play={playTransition}
        onEnd={() => {
          window.location.href = "/Home";
        }}
      />
    </div>
  );
}
