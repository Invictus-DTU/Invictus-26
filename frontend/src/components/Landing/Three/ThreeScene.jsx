import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import GlitchIntro from "./GlitchIntro";
import VideoTransition from "./VideoTransition";
import SceneRoot from "./SceneRoot";

export default function ThreeScene({ onReady }) {
  const [playTransition, setPlayTransition] = useState(false);
  const [currSection, setcurrSection] = useState(0);
  const [glitchTrigger, setGlitchTrigger] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    document.body.classList.add("cursor-hidden");
    return () => document.body.classList.remove("cursor-hidden");
  }, []);

  useEffect(() => {
    if (currSection === 0 || currSection === 2) {
      setGlitchTrigger((t) => t + 1);
    }
  }, [currSection]);


  return (
    <div className="relative w-full h-screen overflow-hidden">

      <GlitchIntro trigger={glitchTrigger} currSection={currSection} />

      {/* Scroll Down Arrow - appears only when scroll is near top */}
      {scrollOffset < 0.05 && (
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-3 animate-bounce">
          <div className="relative">
            {/* Circular border with gradient */}
            <div className="w-15 h-15 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5 shadow-lg">
              {/* Inner circle with subtle glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-amber-500/20 blur-sm"></div>
              {/* Arrow icon */}
              <svg
                className="w-6 h-6 text-white relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 12, 12], fov: 50 }}
        className="absolute inset-0"
        frameloop={playTransition ? "never" : "always"}
        style={{ all: "unset" }}
        gl={{ alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SceneRoot
            setcurrSection={setcurrSection}
            playTransition={playTransition}
            onStartExplore={() => setPlayTransition(true)}
            onReady={onReady}
            setScrollOffset={setScrollOffset}
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
