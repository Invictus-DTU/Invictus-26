'use client'
import React, { useEffect, useRef, useState } from 'react'
import SnackBar from "@/utils/snackBar";
import { useRouter } from 'next/router';

export default function Landing({ setDisplayNavbar, displayLogo, setDisplayLogo }) {

  const [show, setShow] = useState(true);
  const wordArtRef = useRef(null);
  const SNACKBAR_TIMEOUT_1 = process.env.SNACKBAR_TIMEOUT_ONE;//for cross
  const SNACKBAR_TIMEOUT_2 = process.env.SNACKBAR_TIMEOUT_TWO;//for no
  const route = useRouter();

  useEffect(() => {
    if(localStorage.getItem("ModelSeen")){
    const shown = localStorage.getItem("SnackbarShownLanding");
    if(!shown){
      setShow(true);
      return;
    }
    const lastShown = Number(shown);
      if(Date.now() - lastShown > SNACKBAR_TIMEOUT_2) {
        localStorage.removeItem("ModelSeen");
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shown = localStorage.getItem("SnackbarShownLanding");
    if(!shown){
      setShow(true);
      return;
    }
    const lastShown = Number(shown);
    // console.log(Date.now() - lastShown);
    if (Date.now() - lastShown < SNACKBAR_TIMEOUT_1 || localStorage.getItem("ModelSeen") ) {
      setShow(false);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("SnackbarShownLanding",  Date.now().toString());
  }

  useEffect(() => {
    if (!wordArtRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        setDisplayNavbar(!visible);
        setDisplayLogo(!visible);
      },
      { threshold: 0.1 }
    );

    observer.observe(wordArtRef.current);

    //safety check in case observer fails
    const rect = wordArtRef.current.getBoundingClientRect();
    const outOfView = rect.bottom < 0 || rect.top > window.innerHeight;

    if (outOfView) {
      setDisplayNavbar(true);
      setDisplayLogo(true);
    }

    return () => observer.disconnect();
  }, [setDisplayNavbar, setDisplayLogo]);

  return (
    <>
    <div className="min-h-screen w-full flex flex-col items-center pt-6 relative overflow-hidden bg-transparent">

      {/* WORD ART */}
      <div className="relative z-10 px-4 w-full flex justify-center">
        <img
          ref={wordArtRef}
          src="/wordArt.svg"
          alt="Invictus 26"
          className={`
            w-full max-w-[320px] md:max-w-[560px] lg:max-w-[680px]
            drop-shadow-[0_8px_30px_rgba(255,215,138,0.4)]
            select-none animate-float
            transition-all duration-500 ease-in-out
            ${displayLogo ? "opacity-0 scale-95" : "opacity-100 scale-100"}
          `}
        />
      </div>

      {/* TAGLINE
      <h1
        className="
          mt-6 md:mt-4
          text-center
          text-xl md:text-4xl lg:text-5xl
          font-extrabold
          tracking-wider
          bg-gradient-to-b from-[#e0bd4a] to-[#8f7326]
          bg-clip-text text-transparent
          invictus-outline-text
          drop-shadow-sm
          px-4
        "
      >
        Technology, Threaded in Tradition
      </h1> */}

      {/* GOLD SEPARATOR */}
      {/* <div className="mt-4 h-[2px] w-[60%] md:w-[40%] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" /> */}

      {/* DATE */}
        <p
          className="
            mt-4
            text-center
            text-3xl md:text-6xl
            font-bold
            tracking-[0.15em]
            text-[#FFF6E0]
            font-['Orbitron']
            relative z-10
            [text-shadow:_-1px_-1px_0_#8B6914,1px_-1px_0_#8B6914,-1px_1px_0_#8B6914,1px_1px_0_#8B6914,-2px_0_0_#8B6914,2px_0_0_#8B6914,0_-2px_0_#8B6914,0_2px_0_#8B6914]
          "
        >
          27
          <sup className="text-[0.5em] ml-1 text-[#FFF6E0]">TH</sup>
          <span className="ml-3">FEB - 1
          </span>
              <sup className="text-[0.5em] ml-1 text-[#FFF6E0]">st</sup>
              <span className="ml-3">MAR
          </span>
        </p>

        {/* BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-24 mt-10 md:mt-12 w-full px-8 md:px-0 justify-center items-center">
        
        {/* JOIN GROUP - Darker Gold/Bronze Style */}
        <button
  onClick={() => window.open('https://t.me/joinchat/Invictus26','_blank')}
  className="
    group relative
    w-full md:w-auto
    px-8 py-3.5
    rounded-full
    invictus-text
    font-bold tracking-widest uppercase text-sm md:text-base
    text-[#FFF1B8]
    z-30

    bg-gradient-to-b from-[#8E6E24] via-[#6F5418] to-[#4A360D]

    /* ❌ removed border */
    shadow-[0_6px_25px_rgba(0,0,0,0.45),inset_0_1.5px_0_rgba(255,255,255,0.25)]

    transition-all duration-300 ease-out
    hover:scale-[1.04]
    hover:shadow-[0_0_35px_rgba(197,160,89,0.45)]
    active:scale-95
  "
>
  <span className="relative z-10">Join Group</span>
</button>

<button
  onClick={() => route.push('/login')}
  className="
    group relative
    w-full md:w-auto
    px-10 py-3.5
    min-w-[180px]
    invictus-text
    rounded-full
    font-bold tracking-widest uppercase text-sm md:text-base
    text-[#5C450E]
    z-30

    bg-gradient-to-b from-[#FFFEF5] via-[#F3E6BF] to-[#D6B44C]

    /* ❌ removed border */
    shadow-[0_6px_25px_rgba(212,175,55,0.35),inset_0_2px_0_rgba(255,255,255,0.9)]

    transition-all duration-300 ease-out
    hover:scale-[1.04]
    hover:shadow-[0_0_40px_rgba(255,215,138,0.6)]
    hover:brightness-105
    active:scale-95
  "
>
  <span className="relative z-10">Register</span>
</button>

      </div>

      {/* SNACKBAR */}
      {show && (
        <SnackBar
          text="Do you wish to see the live 3d model on your next visit as well?"
          actionText="No"
          onAction={() => {
            localStorage.setItem("ModelSeen", "true");
            document.cookie = "seenModel=true; path=/; max-age=10";
            handleClose();
          }}
          onClose={() => handleClose()}
        />
      )}
    </div>

    <div className="absolute bottom-0 h-1 w-full bg-linear-to-r from-transparent via-[#615030] to-transparent opacity-100" />
    </>
  )
}
