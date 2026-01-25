import { ScrollControls, useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { SceneContent } from "./SceneContent";

/* ---------- Model Ready Signal ---------- */
function ModelReadySignal({ onReady }) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) onReady();
  }, [progress]);

  return null;
}

/* ---------- Scene Root ---------- */
export default function SceneRoot({
  setcurrSection,
  playTransition,
  onStartExplore,
  onReady,
  setScrollOffset,
}) {
  const { scene } = useThree();
useEffect(() => {
  return () => {
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();

      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  };
}, []);


  return (
    <>
      <ScrollControls pages={3} damping={0.18}>
        <SceneContent
          setcurrSection={setcurrSection}
          playTransition={playTransition}
          onStartExplore={onStartExplore}
          setScrollOffset={setScrollOffset}
        />
      </ScrollControls>

      <ModelReadySignal onReady={onReady} />
    </>
  );
}
