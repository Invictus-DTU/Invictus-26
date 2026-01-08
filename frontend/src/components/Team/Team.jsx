import React from 'react'
import TeamCarousel from '@/utils/Team Carousel/TeamCarousel'

export default function Team() {
  return (
    <>
      <img src="/Team/feathers.webp" alt="Decorative Feathers"
      className="fixed z-[10] pointer-events-none w-[400px] md:w-[500px] xl:w-[600px] bottom-0 right-0 
      translate-x-[35%] translate-y-[35%] brightness-125 saturate-125 transition-all duration-500 opacity-100"/>

      <img src="/Team/peacock.webp" alt="Decorative Feathers"
      className="fixed z-[10] pointer-events-none w-[300px] md:w-[400px] xl:w-[550px] bottom-0 left-0 
      translate-x-[-30%] translate-y-[15%] brightness-125 saturate-125 transition-all duration-500 opacity-100"/>

      <div className="px-6 lg:pt-8 md:pt-4 md:pl-10 text-center md:text-left">

        <span className="[font-family:'Orbitron',sans-serif] font-[1000] lg:text-[7rem] text-[5.7rem] 
        bg-gradient-to-b from-[#E2AA38] to-[#473C24] bg-clip-text 
        text-transparent opacity-90 drop-shadow-[8px_8px_2px_rgb(0_0_0_/_0.25)]
        [-webkit-text-stroke:1px_rgba(255,217,138,1)] brightness-105 saturate-115
        leading-tight block">TEAM</span>

        <div className="[font-family:'Montserrat',sans-serif] font-[600] text-[0.8em] md:text-[1.1em]
        bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text 
        text-transparent opacity-100 brightness-105 saturate-115 mt-2">
          The passionate minds and dedicated leaders driving Invictus forward.
        </div>

      </div>

      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <TeamCarousel />
      </div>
    </>
  )
}
