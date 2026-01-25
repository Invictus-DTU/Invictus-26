import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { useEffect } from "react";

export default function MuteButton() {
  const { muted, toggleMute, unlockAndPlay, unlocked } = useAudio();

  useEffect(() => {
    const handler = () => {
      unlockAndPlay();
    };

    // iOS needs touchstart
    window.addEventListener("touchstart", handler, { once: true });
    window.addEventListener("click", handler, { once: true });

    return () => {
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("click", handler);
    };
  }, [unlockAndPlay]);

  return (
    <button
      onClick={() => {
        unlockAndPlay();
        toggleMute();
      }}
      className="
        fixed top-6 left-6 z-[10000]
        w-9 h-9 rounded-full
        bg-black/50 backdrop-blur
        flex items-center justify-center
        text-white
      "
    >
      {muted || !unlocked ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
