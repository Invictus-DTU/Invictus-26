"use client";
import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const unlockAndPlay = () => {
    if (unlocked) return;

    const audio = new Audio("/audio/bg-audio.mp3");
    audio.loop = true;
    audio.volume = muted ? 0 : 0.1;

    audio
      .play()
      .then(() => {
        audioRef.current = audio;
        setUnlocked(true);
      })
      .catch((err) => {
        console.warn("Audio unlock failed:", err);
      });
  };

  const toggleMute = () => {
    setMuted((prev) => {
      if (audioRef.current) {
        audioRef.current.volume = prev ? 0.1 : 0;
      }
      localStorage.setItem("bg-muted", (!prev).toString());
      return !prev;
    });
  };

  return (
    <AudioContext.Provider
      value={{
        muted,
        toggleMute,
        unlockAndPlay,
        unlocked,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
