'use client'
import React, { useEffect } from 'react'
import { useState } from "react";
import SnackBar from "@/utils/snackBar";

export default function Landing({ setLotusClass, setLotusStyle }) {

    const [show, setShow] = useState(true);
    const SNACKBAR_TIMEOUT = 5000;

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
    if (!setLotusClass || !setLotusStyle) return

    // Position lotus slightly above bottom
    setLotusStyle({
      left: '50%',
      bottom: '140px',
      transform: 'translateX(-50%)',
    })

    setLotusClass(`fixed
      w-[140px] md:w-[160px] lg:w-[200px]
      opacity-90
      drop-shadow-[0_0_25px_rgba(255,215,138,0.8)]
      transition-all duration-1000 ease-in-out
    `)
  }, [setLotusClass, setLotusStyle])

  

  return (
    
    <div className="min-h-screen w-full flex flex-col items-center justify-items-center pt-24 pb-10 relative overflow-hidden">

      <div className="text-center mt-6">
        <h1
          className="
            invictus-heading
            text-[2rem] md:text-[6rem] lg:text-[7rem]
            tracking-widest
          "
        >
          INVICTUS'26
        </h1>
      </div>

      <div className="w-full flex flex-col items-center justify-center h-[400px]">
        <div className="text-center space-y-4 p-8 border-4 border-[#C5A059] rounded-2xl bg-[#FFF8E7] shadow-xl">
          <h2 className="text-[#C5A059] text-4xl md:text-7xl font-bold font-serif tracking-widest">
            COMING SOON
          </h2>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto rounded-full" />
          <p className="text-[#7A6C45] font-bold uppercase tracking-widest mt-4">
            Stay tuned for amazing events
          </p>
        </div>
      </div>

      <img
        src="/robothand.svg"
        alt="Robotic Hand"
        className="
          pointer-events-none
          absolute bottom-0
          left-1/2
          -translate-x-1/2
          w-[260px] md:w-[360px] lg:w-[420px]
          opacity-90
          transition-all duration-700
        "
      />

      {show && (
        <SnackBar
          text="Do you wish to see the live 3d model on your next visit as well?"
          actionText="No"
          onAction={() => {
            localStorage.setItem("ModelSeen", "true");
            handleClose();
          }}
          onClose={() => handleClose()}
        />
      )}
    </div>
  )
}
