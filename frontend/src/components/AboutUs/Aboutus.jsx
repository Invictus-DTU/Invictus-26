import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";

const scrollerImg = "/scroller.png";

const aboutText = `Invictus is a flagship techfest that brings together innovation, creativity, and technology. Rooted in India's rich heritage and driven by a vision for the future, it provides a platform for students to ideate, build, and compete through hackathons, workshops, and technical events.`;

// Vertex Shader
const vertexShader = `
uniform float time;
uniform float angle;
uniform float progress;
uniform vec4 resolution;
varying vec2 vUv;
varying float vFrontShadow;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

void main() {
  vUv = uv;
  float pi = 3.14159265359;

  float finalAngle = angle;
  vec3 newposition = position;

  float rad = 0.1;
  float rolls = 8.;
  
  newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),-finalAngle) + vec3(-.5,.5,0.);

  float offs = (newposition.x + 0.5)/(sin(finalAngle) + cos(finalAngle)) ; 
  float tProgress = clamp( (progress - offs*0.99)/0.01 , 0.,1.);

  vFrontShadow = clamp((progress - offs*0.95)/0.05, 1.0 , 1.0);

  newposition.z =  rad + rad*(1. - offs/2.)*sin(-offs*rolls*pi - 0.5*pi);
  newposition.x =  - 0.5 + rad*(1. - offs/2.)*cos(-offs*rolls*pi + 0.5*pi);
  
  newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),finalAngle) + vec3(-.5,.5,0.);
  
  newposition = rotate(newposition - vec3(-.5,0.5,rad), vec3(sin(finalAngle),cos(finalAngle),0.), -pi*progress*rolls);
  newposition +=  vec3(
    -.5 + progress*cos(finalAngle)*(sin(finalAngle) + cos(finalAngle)), 
    0.5 - progress*sin(finalAngle)*(sin(finalAngle) + cos(finalAngle)),
    rad*(1.-progress/2.)
  );

  vec3 finalposition = mix(newposition,position,tProgress);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalposition, 1.0 );
}
`;

// Fragment Shader
const fragmentShader = `
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;

varying vec2 vUv;
varying float vFrontShadow;

void main() {
  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

  if(newUV.x < 0.0 || newUV.x > 1.0 || newUV.y < 0.0 || newUV.y > 1.0) {
    discard;
  }

  vec4 texColor = texture2D(texture1,newUV);
  
  // High-key brightness boost to match light/original look exactly
  vec3 finalColor = texColor.rgb * 1.05;
  finalColor = pow(finalColor, vec3(0.49)); // Strong lift for "peach-white" effect
  
  gl_FragColor = vec4(finalColor, texColor.a);
  gl_FragColor.a *= clamp(progress*5.0, 0.0, 1.0);
}
`;

const Scroller = ({ progressRef }) => {
  const { size, camera } = useThree();
  const texture = useTexture(scrollerImg);
  const meshRef = useRef();

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    progress: { value: 0 },
    angle: { value: 0.3 },
    texture1: { value: texture },
    resolution: { value: new THREE.Vector4(0, 0, 0, 0) }
  }), [texture]);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      const iWidth = texture.image.naturalWidth;
      const iHeight = texture.image.naturalHeight;
      const imageAspect = iHeight / iWidth;
      const canvasAspect = size.height / size.width;

      let a1, a2;
      if (canvasAspect > imageAspect) {
        a1 = 1;
        a2 = canvasAspect / imageAspect;
      } else {
        a1 = (size.width / size.height) * imageAspect;
        a2 = 1;
      }
      uniforms.resolution.value.set(size.width, size.height, a1, a2);
    }

    const cameraDistance = 400;
    camera.fov = 2 * Math.atan(size.height / (2 * cameraDistance)) * (180 / Math.PI);
    camera.aspect = size.width / size.height;
    camera.position.set(0, 0, cameraDistance);
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);

  }, [texture, size, uniforms, camera]);

  useFrame((state) => {
    if (uniforms && uniforms.progress && progressRef) {
      uniforms.time.value = state.clock.getElapsedTime();
      uniforms.progress.value = progressRef.current;
    }
  });

  return (
    <mesh ref={meshRef} scale={[size.width, size.height, size.width / 2]}>
      <planeGeometry args={[1, 1, 80, 80]} />
      <shaderMaterial
        transparent
        side={THREE.DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
      />
    </mesh>
  );
};

// Number animation hook
function useAnimatedNumber(target, duration = 2000, startAnimation = false) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCurrentValue(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentValue(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration, startAnimation]);

  return currentValue;
}

const Aboutus = ({ setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) => {
  const [showContent, setShowContent] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  const router = useRouter();
  const progress = useRef(0);

  // Stats numbers - animated
  const footfallValue = useAnimatedNumber(20000, 1500, showContent);
  const collegesValue = useAnimatedNumber(200, 1500, showContent);
  const eventsValue = useAnimatedNumber(80, 1500, showContent);

  useEffect(() => {
    // Scroll animation
    gsap.to(progress, {
      delay: 0.5,
      duration: 3.5,
      current: 1,
      ease: "power2.inOut",
    });

    // Text reveal
    gsap.to({}, {
      delay: 1.6,
      duration: 0.3,
      onStart: () => {
        let startTime = null;
        const animateText = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const p = Math.min(elapsed / 1500, 1);
          setTextOpacity(Math.pow(p, 3));
          if (p < 1) requestAnimationFrame(animateText);
          else setTimeout(() => setShowContent(true), 300);
        };
        requestAnimationFrame(animateText);
      }
    });
  }, []);

  useEffect(() => {
    if (!setLotusClass || !setLotusStyle) return;
    const anchor = document.querySelector("[data-about-lotus-anchor]");
    if (!anchor) return;
    const parent = anchor.offsetParent;
    if (!parent) return;

    const updateLotus = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      setLotusStyle({
        left: anchorRect.left - parentRect.left + anchorRect.width + 120,
        top: anchorRect.top - parentRect.top + anchorRect.height / 2,
        transform: "translate(-50%, -50%)",
      });

      setLotusClass(`
        absolute w-[80px] md:w-[110px] lg:w-[130px] opacity-80 transition-all duration-700 ease-in-out
      `);
    };

    updateLotus();
    window.addEventListener('resize', updateLotus);
    return () => window.removeEventListener('resize', updateLotus);
  }, [setLotusClass, setLotusStyle]);

  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;

    setFigureStyle({
      left: "-50px",
      bottom: "-20px",
      transform: "none",
    });

    setFigureClass('fixed !left-0 !bottom-0 w-[150px] md:w-[220px] lg:w-[280px] opacity-90 transition-all duration-700 ease-out pointer-events-none z-[30] drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]');

    return () => {
      setFigureClass('opacity-0');
      setFigureStyle({});
    };
  }, [setFigureClass, setFigureStyle]);

  return (
    <main className="w-full min-h-screen relative overflow-x-hidden bg-transparent">
      <div className="w-full flex flex-col items-center pb-10 px-4 pt-28">

        {/* TITLE */}
        <div className="flex justify-center w-full mb-0 relative">
          <div className="relative inline-flex items-center">
            <div
              data-about-lotus-anchor
              className="absolute top-[90%] mt-15 ml-240 -translate-y-1/2 w-24 h-24 pointer-events-none"
            />
            <h1 className="invictus-heading text-[3.8rem] md:text-[5.2rem] tracking-[0.1em] relative -mt-7 z-10 text-center py-[20px]">
              ABOUT US
            </h1>
          </div>
        </div>

        {/* SCROLLER AREA */}
        <div id="scroller-area" className="relative mx-auto z-10 flex items-center justify-center -mt-10 w-[min(150vw,900px)] h-[min(75vh,500px)] bg-transparent">
          <div className="absolute inset-0 pointer-events-none z-[5] w-full h-full bg-transparent overflow-hidden">
            <Canvas key={router.asPath} gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}>
              <Scroller progressRef={progress} />
            </Canvas>
          </div>

          {/* Text Content Overlay */}
          <div
            className="absolute inset-0 z-[100] flex items-start justify-center px-[22%] pt-[14%] -ml-[1%] pointer-events-none transition-opacity duration-[1200ms] ease-out"
            style={{ opacity: textOpacity }}
          >
            <p className="invictus-subheading text-center leading-relaxed font-black italic !text-[#8B6914] !bg-none !bg-clip-border text-[clamp(1rem,1.4vw,1.8rem)] max-w-[450px] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
              {aboutText}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className={`flex flex-col items-center w-full z-10 relative -mt-8 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-center gap-20 mb-8 flex-wrap w-[90%] max-w-[1000px] items-center">

            {/* Footfall */}
            <div className="flex flex-col items-center min-w-[150px]">
              <div className="invictus-heading text-[3.2rem] leading-none mb-1 text-center">
                {footfallValue.toLocaleString()}+
              </div>
              <div className="flex gap-1 mb-2 text-4xl text-[#8B6914] drop-shadow-sm">
                <i className="fa-solid fa-users"></i>
              </div>
              <div className="invictus-subheading font-bold text-xl uppercase tracking-widest !text-[#675743ff] !bg-none !bg-clip-border mt-0">
                FOOTFALL
              </div>
            </div>

            {/* Colleges */}
            <div className="flex flex-col items-center min-w-[150px]">
              <div className="invictus-heading text-[3.2rem] leading-none mb-1 text-center">
                {collegesValue.toLocaleString()}+
              </div>
              <div className="flex gap-1 mb-2 text-4xl text-[#8B6914] drop-shadow-sm">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <div className="invictus-subheading font-bold text-xl uppercase tracking-widest !text-[#675743ff] !bg-none !bg-clip-border mt-0">
                COLLEGES
              </div>
            </div>

            {/* Events */}
            <div className="flex flex-col items-center min-w-[150px]">
              <div className="invictus-heading text-[3.2rem] leading-none mb-1 text-center">
                {eventsValue.toLocaleString()}+
              </div>
              <div className="flex gap-1 mb-2 text-4xl text-[#8B6914] drop-shadow-sm">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <div className="invictus-subheading font-bold text-xl uppercase tracking-widest !text-[#675743ff] !bg-none !bg-clip-border mt-0">
                EVENTS
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-20 justify-center mt-3 flex-wrap relative z-[50]">
            <button
              className="font-['Montserrat'] font-bold text-lg px-12 py-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:scale-105 active:scale-95 border-2 !bg-white text-[#8B6914] border-[#B89C3B]"
              onClick={() => router.push("/Gallery")}
            >
              View Gallery
            </button>
            <button
              className="font-['Montserrat'] font-bold text-lg px-12 py-4 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:scale-105 active:scale-95 border-2 !bg-white text-[#8B6914] border-[#B89C3B]"
              onClick={() => router.push("/Events")}
            >
              View Events
            </button>
          </div>
        </div>
        <div className="h-[10vh]" />
      </div>
    </main>
  );
};

export default Aboutus;