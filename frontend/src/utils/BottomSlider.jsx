import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 1. Add props for easy adjustment
export default function BottomSlider({ 
  velocityFactor = 0.1, // Higher = Faster reaction to scroll
  damping = 0.92        // Higher (0.99) = Slippery/Long slide; Lower (0.8) = Stops quickly
}) {
  const x = useMotionValue(0);
  const opacity = useMotionValue(1);

  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef(null);

  const baseX = useRef(0);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  const measure = () => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* =======================
      Scroll → Velocity
  ======================= */
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // 2. Use velocityFactor prop here
      // We limit 'diff' to avoid super-fast jumps on rapid scrolling
      const velocityDelta = Math.max(-20, Math.min(20, diff)) * velocityFactor;
      
      scrollVelocity.current += velocityDelta;
      lastScrollY.current = currentY;

      // ... existing fade logic ...
      const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - currentY;
      const fadeStart = 260; 
      const fadeEnd = 60;
      if (scrollBottom < fadeStart) {
        opacity.set(Math.max(0, Math.min(1, (scrollBottom - fadeEnd) / (fadeStart - fadeEnd))));
      } else {
        opacity.set(1);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [opacity, velocityFactor]); // Add velocityFactor to dependency array

  /* =======================
      Animation Loop
  ======================= */
  useAnimationFrame((t, delta) => {
    if (!contentWidth) return;

    // 3. Use damping prop here
    scrollVelocity.current *= damping;

    if (Math.abs(scrollVelocity.current) < 0.01) {
      scrollVelocity.current = 0;
    }

    // Base speed (0.5) + Scroll Boost
    let moveBy = 0.5 + scrollVelocity.current; 
    
    // Reverse direction (optional: change -= to += to flip)
    baseX.current -= moveBy;

    const loopedX = ((baseX.current % contentWidth) + contentWidth) % contentWidth;
    x.set(-loopedX);
  });

  const SliderContent = () => (
    <>
      <img src="/slider.png" className="h-14 opacity-70 mix-blend-multiply flex-shrink-0" onLoad={measure} />
      <img src="/slider.png" className="h-14 opacity-70 mix-blend-multiply flex-shrink-0" />
      <img src="/slider.png" className="h-14 opacity-70 mix-blend-multiply flex-shrink-0" />
      <img src="/slider.png" className="h-14 opacity-70 mix-blend-multiply flex-shrink-0" />
    </>
  );

  return (
    <motion.div style={{ opacity }} className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#9b875e] via-[#c8b480] to-[#f4e8c3] shadow-[0_-8px_20px_rgba(0,0,0,0.18)]" />
      <div className="absolute inset-x-0 bottom-12 h-10 bg-gradient-to-t from-[#f4e8c3] to-transparent" />

      <div className="relative h-14 overflow-hidden">
        <motion.div style={{ x }} className="flex min-w-max">
          <div ref={contentRef} className="flex"> <SliderContent /> </div>
          <div className="flex"> <SliderContent /> </div>
        </motion.div>
      </div>
    </motion.div>
  );
}