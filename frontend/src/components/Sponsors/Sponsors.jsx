import React, { useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

/* ---------------- 1. SPONSOR FRAME (YOUR STYLING) ---------------- */


const SponsorFrame = ({ sizeType = "small", sponsorImg, name }) => {

  const isLarge = sizeType === "large";

  return (
    <div className="flex flex-col items-center justify-end shrink-0 transition-all duration-500 ease-out">
      {/* Circle */}
      <div
        className={`
          relative z-10 flex items-center justify-center overflow-hidden rounded-full
          border-[3px] border-[#C5A059]
          bg-gradient-to-b from-white to-[#FFFBEB]
          shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]
          transition-all duration-500
          ${isLarge
            ? "w-[26vh] h-[26vh] max-w-[220px] max-h-[220px] min-w-[140px] min-h-[140px]"
            : "w-[18vh] h-[18vh] max-w-[150px] max-h-[150px] min-w-[100px] min-h-[100px]"}
        `}
      >
        {sponsorImg ? (
          <img
            src={sponsorImg}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.innerText = "NO IMAGE";
            }}
          />
        ) : (
          <span className="text-[#C5A059]/50 font-bold text-xs">PHOTO</span>
        )}
      </div>

      {/* Rectangle */}
      <div
        className={`
          relative z-20 -mt-6 flex items-center justify-center
          border-[3px] border-[#C5A059] bg-[#FDF8E2]
          shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]
          min-h-[35px] transition-all duration-500
          ${isLarge
            ? "w-[28vh] max-w-[240px] min-w-[150px] h-[6vh]"
            : "w-[20vh] max-w-[170px] min-w-[110px] h-[5vh]"}
        `}
      >
        <span
          className={`
            px-2 text-center font-bold uppercase tracking-[0.05em]
            text-[#8B6508] whitespace-nowrap overflow-hidden text-ellipsis
            ${isLarge
              ? "text-[clamp(10px,1.8vh,18px)]"
              : "text-[clamp(10px,1.4vh,18px)]"}
          `}
        >
          {name || "SPONSOR"}
        </span>
      </div>
    </div>
  );
};

/* ---------------- 2. PARABOLIC ROW LOGIC ---------------- */
const ParabolicRow = ({ leftSponsor, rightSponsor, containerRef, isMobile }) => {
  const rowRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!rowRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const rowRect = rowRef.current.getBoundingClientRect();

      // Calculate distance from center of viewport
      const dist = Math.abs(
        containerRect.top + containerRect.height / 2 - 
        (rowRect.top + rowRect.height / 2)
      );

      const maxDist = containerRect.height / 2;
      const normalized = Math.min(dist / maxDist, 1);

      // Math for the curve: Push out (120px) and scale down (0.85)
      setOffset(normalized * 120);
      setScale(1 - normalized * 0.15);
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Init

    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, isMobile]);

  return (
    <div
      ref={rowRef}
      className="w-full flex justify-center items-center h-[45vh] md:h-[50vh] shrink-0 snap-center"
    >
      <div
        className="flex w-full max-w-6xl items-center justify-between px-[2vw] transition-transform duration-100 ease-out will-change-transform"
        style={!isMobile ? { transform: `scale(${scale})` } : {}}
      >
        {/* Left Side - Pushes Left */}
        <div style={!isMobile ? { transform: `translateX(-${offset}px)` } : {}}>
          {leftSponsor && (
            <SponsorFrame
              name={leftSponsor.name}
              sponsorImg={leftSponsor.img}
              sizeType={!isMobile && offset < 50 ? "large" : "small"}
            />
          )}
        </div>

        {/* Right Side - Pushes Right */}
        <div style={!isMobile ? { transform: `translateX(${offset}px)` } : {}}>
          {rightSponsor && (
            <SponsorFrame
              name={rightSponsor.name}
              sponsorImg={rightSponsor.img}
              sizeType={!isMobile && offset < 50 ? "large" : "small"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- 3. MAIN PAGE ---------------- */



export default function Sponsors({ setLotusClass, setLotusStyle }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("GOLD SPONSORS");
  const router = useRouter();



  useEffect(() => {
  if (!setLotusClass) return;
  setLotusStyle({});
  // Sponsors page lotus position
  setLotusClass(`
    fixed
    top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    w-[100px] md:w-[240px]
    opacity-80
    transition-all duration-700 ease-in-out
  `);

}, [router.pathname, setLotusClass]);


  // --- DATA SETUP ---
  const tiers = useMemo(() => [
    {
      id: "gold",
      title: "GOLD SPONSORS",
      items: [
        { name: "Gold 1", img: "" }, { name: "Gold 2", img: "" },
        { name: "Gold 3", img: "" }, { name: "Gold 4", img: "" },
      ]
    },
    {
      id: "silver",
      title: "SILVER SPONSORS",
      items: [
        { name: "Silver 1", img: "" }, { name: "Silver 2", img: "" },
        { name: "Silver 3", img: "" }, { name: "Silver 4", img: "" },
        { name: "Silver 5", img: "" }, { name: "Silver 6", img: "" },
      ]
    },
    {
      id: "bronze",
      title: "BRONZE SPONSORS",
      items: [
        { name: "Bronze 1", img: "" }, { name: "Bronze 2", img: "" },
        { name: "Bronze 3", img: "" }, { name: "Bronze 4", img: "" },
      ]
    }
  ], []);

  // --- RESIZE HANDLER ---
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // --- SECTION DETECTION (SCROLL SPY) ---
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.clientHeight;
      const scrollCenter = containerTop + (containerHeight / 2);

      // Find which section div is currently in the middle of the screen
      tiers.forEach((tier) => {
        const el = document.getElementById(`section-${tier.id}`);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollCenter >= offsetTop && scrollCenter <= offsetTop + offsetHeight) {
            setActiveSection(tier.title);
          }
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Run once on mount
      handleScroll();
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [tiers]);

  const scrollNext = () => {
    containerRef.current?.scrollBy({
      top: window.innerHeight * 0.5,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center relative overflow-hidden bg-white/10">
      
      

      {/* --- HEADER (FIXED TOP OVERLAY) --- */}
      {/* We use absolute positioning with z-20 to make sure the sponsors 
         scroll BEHIND the header visuals, but the header stays visible.
         Gradient fade at bottom makes the transition smooth.
      */}
      <div className="absolute top-0 left-0 w-full z-20 flex flex-col items-center pt-[4vh] pb-8 bg-gradient-to-b from-white via-white/95 to-transparent pointer-events-none">
        
        {/* 1. Main Heading */}
        <h1 className="invictus-heading mt-18 text-[3.7rem] lg:text-[7rem] leading-none drop-shadow-sm">
          SPONSORS
        </h1>

        {/* 2. Blue Line (Your exact style) */}
        <div className="w-[50vw] max-w-[600px] h-[2px] bg-[#4A90E2] shadow-[0_0_8px_#4A90E2] my-[1.5vh]" />

        {/* 3. Subtext (Your exact style) */}
        <p className="
            font-['Montserrat',sans-serif]
            text-[clamp(0.9rem,1.8vh,1.2rem)]
            font-semibold text-center
            max-w-[90vw] px-[10px]
            bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D]
            bg-clip-text text-transparent
        ">
          Our valued partners who power Invictus by supporting innovation and excellence.
        </p>

        {/* 4. DYNAMIC SECTION LABEL (New Feature) */}
        <div className="mt-6 pointer-events-auto transition-all duration-300 transform">
           <span className="px-6 py-2 rounded-full border border-[#C5A059] bg-[#FFFBEB] text-[#8B6508] font-bold text-sm tracking-widest shadow-sm">
             {activeSection}
           </span>
        </div>
      </div>

      {/* --- SCROLL CONTAINER --- */}
      <div
        ref={containerRef}
        className="
          relative z-10 w-full h-full
          overflow-y-auto snap-y snap-mandatory scroll-smooth
          pt-[45vh] pb-[20vh]
        "
      >
        {tiers.map((tier) => {
          // Break items into pairs for the Parabolic Rows
          const pairs = [];
          for (let i = 0; i < tier.items.length; i += 2) {
            pairs.push([tier.items[i], tier.items[i + 1]]);
          }

          return (
            <div key={tier.id} id={`section-${tier.id}`} className="flex flex-col">
              {/* Render rows for this tier */}
              {pairs.map((pair, index) => (
                <ParabolicRow
                  key={`${tier.id}-${index}`}
                  leftSponsor={pair[0]}
                  rightSponsor={pair[1]}
                  containerRef={containerRef}
                  isMobile={isMobile}
                />
              ))}
              
              {/* Small gap between tiers to prevent sudden jumps */}
              <div className="h-[10vh] w-full snap-center" /> 
            </div>
          );
        })}
      </div>

      {/* --- FLOATING ARROW --- */}
      <div className="absolute bottom-8 z-30 pointer-events-none">
        <button
          onClick={scrollNext}
          className="
            pointer-events-auto
            w-12 h-12 rounded-full 
            border border-[#C5A059] text-[#C5A059] 
            bg-white/80 hover:bg-[#C5A059] hover:text-white 
            transition-all animate-bounce shadow-lg flex items-center justify-center
          "
        >
          ↓
        </button>
      </div>
    </div>
  );
}