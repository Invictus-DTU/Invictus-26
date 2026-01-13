"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Html } from "@react-three/drei";

export function AnimatedTextSections() {
  const scroll = useScroll();
  const section1Ref = useRef();
  const section2Ref = useRef();
  const section3Ref = useRef();

  useFrame(() => {
    const totalSections = 2; // 3 camera positions = 2 transitions
    const progress = scroll.offset * totalSections; // 0 to 2

    // Section 1: First camera position (progress 0 to 1)
    if (section1Ref.current) {
      const opacity = progress < 0.7 ? 1 : 
                      progress < 1 ? Math.max(0, 1 - (progress - 0.7) * 3.33) : 0;
      section1Ref.current.style.opacity = opacity;
      section1Ref.current.style.display = opacity > 0 ? 'block' : 'none';
    }

    // Section 2: Second camera position (progress 1 to 2)
    if (section2Ref.current) {
      const opacity = progress < 0.7 ? 0 : 
                      progress < 1 ? (progress - 0.7) * 3.33 :
                      progress < 1.7 ? 1 :
                      progress < 2 ? Math.max(0, 1 - (progress - 1.7) * 3.33) : 0;
      section2Ref.current.style.opacity = Math.min(1, opacity);
      section2Ref.current.style.display = opacity > 0 ? 'block' : 'none';
    }

    // Section 3: Third camera position (progress 2+)
    if (section3Ref.current) {
      const opacity = progress < 1.7 ? 0 : 
                      progress < 2 ? (progress - 1.7) * 3.33 : 1;
      section3Ref.current.style.opacity = Math.min(1, opacity);
      section3Ref.current.style.display = opacity > 0 ? 'block' : 'none';
    }
  });

  return (
    <>
      <Html center style={{ position: "sticky",  width: '100vw', height: '100vh', top: "-50%" }}>
        <div>
          <div ref={section1Ref} style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          }}>
            <h1>Majestic Temple View</h1>
            <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
              Experience the beauty from above
            </p>
          </div>

          <div ref={section2Ref} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            opacity: 0,
          }}>
            <h2>Architectural Wonder</h2>
            <p style={{ fontSize: '1.3rem', marginTop: '1rem' }}>
              Witness the intricate details
            </p>
          </div>

          <div ref={section3Ref} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            pointerEvents: 'none',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            opacity: 0,
          }}>
            <h1>Grand Entrance</h1>
            <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
              Step into history and culture
            </p>
          </div>
        </div>
      </Html>
    </>
  );
}
