'use client';
import React, { useState, useEffect } from 'react';
import CardComponent from '../Events/CardComponent';

export default function Workshops({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {

  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;
  
    setFigureStyle({
      left: "0px",
      bottom: "0px",
      transform: "translate(10%, 10%)",
    });
  
    setFigureClass(`
      fixed
      w-[120px]
      md:w-[140px]
      lg:w-[190px]
      pointer-events-none
      z-[30]
      opacity-90
      drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
      transition-all duration-700 ease-out
    `);
  }, [setFigureClass, setFigureStyle]);

    const [filters, setFilters] = useState({
          tag: "Workshop",
    });

  return (
    <div 
      className=" w-full relative overflow-x-hidden "

    >
      <div className="container mx-auto px-4 pt-10 flex flex-col items-center relative z-10">
        
        <h1 
          className="invictus-heading pt-12 text-[3rem] lg:text-[7rem]"
        >
          WORKSHOPS
        </h1>

         <div className="invictus-subheading pb-15 text-[0.8em] md:text-[1.1em]">
          The passionate minds and dedicated leaders driving Invictus forward.
        </div>
        {/* CARD CAROUSEL SECTION */}
        <div className="w-full max-w-6xl">
           <CardComponent filters={filters} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle}/>
        </div>

      </div>
    </div>
  );
}