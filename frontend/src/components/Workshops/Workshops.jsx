'use client';
import React, { useState } from 'react';
import CardComponent from '../Events/CardComponent';

export default function Workshops({setLotusClass, setLotusStyle}) {
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
           <CardComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle}/>
        </div>

      </div>
    </div>
  );
}