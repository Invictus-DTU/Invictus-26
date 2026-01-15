"use client";

import { useEffect, useRef } from "react";

export default function VideoTransition({ play, onEnd }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (play && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [play]);

  if (!play) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/model/transition.mp4"   
        muted
        playsInline
        preload="auto" 
        onEnded={onEnd}
      />
    </div>
  );
}
