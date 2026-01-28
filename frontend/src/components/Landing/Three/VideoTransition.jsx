"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoTransition({ play, onEnd }) {
  const videoRef = useRef(null);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    if (!play || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Video autoplay blocked", err);
      }
    };

    tryPlay();
  }, [play]);

  if (!play) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        ref={videoRef}
        src="/intro/transition.mp4"
        muted
        playsInline
        preload="auto"
        className={`
          w-full h-full object-cover
          mix-blend-screen
          transition-opacity duration-700
          ${ending ? "opacity-0" : "opacity-100"}
        `}
        onEnded={() => {
          setEnding(true);
          setTimeout(onEnd, 700); // wait for fade
        }}
      />
    </div>
  );
}
