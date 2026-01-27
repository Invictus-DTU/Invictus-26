"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GlitchIntro({ trigger, currSection }) {
  const [stage, setStage] = useState("idle");

  useEffect(() => {
    if (!trigger) return;

    setStage("idle");

    const timers = [];

    timers.push(setTimeout(() => setStage("one"), 570));
    timers.push(setTimeout(() => setStage("two"), 800));
    timers.push(setTimeout(() => setStage("done"), 960));

    return () => timers.forEach(clearTimeout);
  }, [trigger]);

  if (stage === "idle" || stage === "done") return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden">
      {stage === "one" && (
        <Image
          src={`/model/gltich${1 + currSection}.png`}
          alt="glitch layer 1"
          fill
          priority
          className="mix-blend-screen w-full opacity-80"
        />
      )}

      {stage === "two" && (
        <Image
          src={`/model/gltich${2 + currSection}.png`}
          alt="glitch layer 2"
          fill
          priority
          className="mix-blend-difference w-full opacity-70"
        />
      )}
    </div>
  );
}


