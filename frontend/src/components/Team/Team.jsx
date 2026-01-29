'use client'
import React, { useEffect } from 'react'
import TeamCarousel from '@/utils/Team Carousel/TeamCarousel'

export default function TeamComponent({ setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {

  useEffect(() => {
    if (!setLotusStyle || !setLotusClass) return;

    const isMobile = window.innerWidth < 768;

    const anchor = document.querySelector(
      isMobile
        ? "[data-lotus-anchor-mobile]"
        : "[data-lotus-anchor]"
    );

    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();

    setLotusStyle({
      left: isMobile
        ? window.innerWidth / 2
        : rect.left + rect.width / 2,

      top: isMobile ? rect.top + 30 : rect.top,
      position: "absolute",
      transform: "translate(-50%, -50%)",
    });

    setLotusClass(`absolute
      w-[15vw]
      md:w-[8vw]
      opacity-100
      pointer-events-none
      z-[30]
      transition-all duration-1000 ease-in-out

    `);
  }, [setLotusStyle, setLotusClass]);

  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;
  
    setFigureStyle({
      left: "-20px",
      bottom: "0px",
      transform: "translate(10%, 10%)",
    });
  
    setFigureClass(`
      fixed
      w-[100px]
        md:w-[120px]
        lg:w-[175px]
        pointer-events-none
        z-[30]
        opacity-60
      drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
      transition-all duration-700 ease-out
    `);
  }, [setFigureClass, setFigureStyle]);


  return (
    <>
      <div className="px-6 mt-22 lg:pt-8 md:pt-4 md:pl-10 text-center md:text-left">

        <div className="relative inline-block">
          <span className="invictus-heading mr-2 text-[3.7rem] lg:text-[7rem]">
            TEAM
          </span>

          <span
            data-lotus-anchor
            className=' 
            absolute
            right-[-4.8rem]    
            top-1/2
            -translate-y-1/2
            w-1 h-1'
          />
        </div>

        <div className="invictus-subheading text-[0.8em] md:text-[1.1em]">
          The passionate minds and dedicated leaders driving Invictus forward.
        </div>

        <span
          data-lotus-anchor-mobile
          className='absolute top-[25%] left-[30%]'
        />

      </div>

      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <TeamCarousel />
      </div>
    </>
  )
}
