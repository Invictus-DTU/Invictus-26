"use client";

import { useEffect, useRef, useState } from "react";

export default function introVideo({ play, onEnd }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !play) return;

    const handleCanPlay = async () => {
      try {
        await video.play();

        requestAnimationFrame(() => {
          setVisible(true);
        });
      } catch (e) {
        console.warn("Autoplay blocked");
      }
    };

    video.currentTime = 0;
    video.addEventListener("canplaythrough", handleCanPlay, { once: true });

    return () => {
      video.pause();
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, [play]);

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-black
        transition-opacity duration-700 ease-out
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      <video
        ref={videoRef}
        src="/intro/startVideo.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
        onEnded={onEnd}
      />

      {/* SKIP */}
      <button
        onClick={onEnd}
        className="
          absolute top-6 right-6
          px-4 py-1.5
          text-xs tracking-widest uppercase
          text-white/80 hover:text-white
          bg-black/40 backdrop-blur
          rounded-full
          transition
        "
      >
        Skip &gt;&gt;
      </button>
    </div>
  );
}
