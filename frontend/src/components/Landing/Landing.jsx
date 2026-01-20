'use client'
import React, { useEffect } from 'react'
import { useState } from "react";
import SnackBar from "@/utils/snackBar";

export default function Landing({ setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {

    const [show, setShow] = useState(true);
    const SNACKBAR_TIMEOUT = 10000;

    useEffect(() => {
      if(localStorage.getItem("ModelSeen")){
      const shown = localStorage.getItem("SnackbarShownLanding");
      if(!shown){
        setShow(true);
        return;
      }
      const lastShown = Number(shown);
        if(Date.now() - lastShown > SNACKBAR_TIMEOUT) {
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
      if (Date.now() - lastShown < SNACKBAR_TIMEOUT || localStorage.getItem("ModelSeen") ) {
        setShow(false);
      }
    }, []);

    const handleClose = () => {
      setShow(false);
      localStorage.setItem("SnackbarShownLanding",  Date.now().toString());
    }
    useEffect(() => {
    if (!setLotusClass || !setLotusStyle) return;

    setLotusStyle({
      left: "50%",
    animation: "lotusFloat 5s ease-in-out infinite",
    filter: "drop-shadow(0 0 22px rgba(255,215,138,0.65))",
    willChange: "transform",
    });

    setLotusClass(`
      fixed
      max-[380px]:bottom-[20%]
      bottom-[22%]
      md:bottom-[29%]
      w-[80px] md:w-[100px] lg:w-[110px]
      opacity-100
      pointer-events-none
      z-[60]
      transition-all duration-1000 ease-in-out

    `);
  }, [setLotusClass, setLotusStyle]);


  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;

    setFigureStyle({
      left: "49%",
      bottom: "0px",
      transform: "translateX(-50%)",
    });

    setFigureClass(`
      fixed bottom-0
      w-[240px]
      max-[380px]:w-[160px]
      max-[400px]:w-[280px]
      md:w-[280px]
      lg:w-[17.625vw]
      drop-shadow-[0_0_30px_rgba(255,215,138,0.55)]
      transition-all duration-1000 ease-in-out
      z-[40]
    `);
  }, [setFigureClass, setFigureStyle]);


  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-6 relative overflow-hidden bg-transparent">

      {/* WORD ART */}
      <div className="relative z-10 px-4 w-full flex justify-center">
        <img
          src="/wordArt.svg"
          alt="Invictus 26"
          className="
            w-full max-w-[320px] md:max-w-[560px] lg:max-w-[680px]
            drop-shadow-[0_8px_30px_rgba(255,215,138,0.4)]
            select-none
            animate-float
          "
        />
      </div>

      {/* TAGLINE */}
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
      </h1>

      {/* GOLD SEPARATOR */}
      <div className="mt-4 h-[2px] w-[60%] md:w-[40%] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />

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
        "
        style={{
          textShadow: "0px 0px 15px rgba(197, 160, 89, 0.6)",
        }}
      >
        9-11
        <sup className="text-[0.5em] ml-1 text-[#D4AF37]">TH</sup>
        <span className="ml-3">FEB'26</span>
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-24 mt-10 md:mt-12 w-full px-8 md:px-0 justify-center items-center">
        
        {/* JOIN GROUP - Darker Gold/Bronze Style */}
        <button
          className="
            group relative
            w-full md:w-auto
            px-6 py-3.5
            rounded-full
            font-bold tracking-widest uppercase text-sm md:text-base
            text-[#FFEeb0]
            
            bg-gradient-to-b from-[#8E6E24] via-[#684F16] to-[#45330B]
            border border-[#A88732]
            
            shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
            
            transition-all duration-300 ease-out
            hover:scale-105
            hover:shadow-[0_0_25px_rgba(197,160,89,0.5)]
            hover:border-[#FFD700]
            active:scale-95
          "
        >
          <span className="relative z-10">Join Group</span>
        </button>

        {/* REGISTER - Lighter Cream/Gold Style */}
        <button
          className="
            group relative
            w-full md:w-auto
            px-10 py-3.5
            min-w-[180px]
            rounded-full
            font-bold tracking-widest uppercase text-sm md:text-base
            text-[#5C450E]
            bg-gradient-to-b from-[#FFFBEB] via-[#F3E3B6] to-[#D4AF37]
            border border-[#FDE68A]
            
            shadow-[0_4px_20px_rgba(212,175,55,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]
            
            transition-all duration-300 ease-out
            hover:scale-105
            hover:shadow-[0_0_30px_rgba(255,215,138,0.6)]
            hover:brightness-110
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
  )
}
