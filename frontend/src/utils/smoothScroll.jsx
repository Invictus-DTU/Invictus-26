"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isHome = router.pathname === "/Home";

    const lenis = new Lenis({
      duration: isHome ? 3.0 : 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [router.pathname]); // 👈 important

  return <>{children}</>;
}
