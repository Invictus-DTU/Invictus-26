"use client";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Intro() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  const goToModel = () => {
    router.replace("/model");
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setReady(true);
      } catch (err) {
        console.warn("Autoplay blocked", err);
      }
    };

    video.currentTime = 0;
    video.addEventListener("canplaythrough", playVideo, { once: true });

    return () => {
      video.pause();
      video.removeEventListener("canplaythrough", playVideo);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/intro/startVideo.mp4"
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        onEnded={goToModel}
      />

      {/* SKIP BUTTON */}
      <button
        onClick={goToModel}
        className="
          absolute top-6 right-0 z-[10000]
          px-4 py-1.5 w-60
          invictus-text
          font-[800]
          text-xl tracking-widest uppercase
          text-white/80
          hover:text-3xl hover:text-amber-500
          rounded-full
          transition
        "
      >
        Skip &gt;&gt;
      </button>
    </div>
  );
}
