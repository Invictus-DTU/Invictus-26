import React from 'react'
import TeamCarousel from '@/utils/Team Carousel/TeamCarousel'

export default function TeamComponent() {
  return (
    <>
      <img src="/Team/feathers.webp" alt="Decorative Feathers"
      className="fixed z-[10] pointer-events-none w-[400px] md:w-[500px] xl:w-[600px] bottom-0 right-0 
      translate-x-[35%] translate-y-[35%] brightness-125 saturate-125 transition-all duration-500 opacity-100"/>

      <img src="/Team/peacock.webp" alt="Decorative Feathers"
      className="fixed z-[10] pointer-events-none w-[300px] md:w-[400px] xl:w-[550px] bottom-0 left-0 
      translate-x-[-30%] translate-y-[15%] brightness-125 saturate-125 transition-all duration-500 opacity-100"/>

      <img src="/Team/peacock-shadow.webp" alt="Decorative Feathers"
      className="fixed z-[9] pointer-events-none w-[300px] md:w-[400px] xl:w-[550px] bottom-0 left-0 
      translate-x-[-27%] translate-y-[15%] brightness-125 saturate-125 transition-all duration-500 opacity-100"/>

      <div className="px-6 mt-16 lg:pt-8 md:pt-4 md:pl-10 text-center md:text-left">

        <span className="invictus-heading text-[5.7rem] lg:text-[7rem]">TEAM</span>

        <div className="invictus-subheading text-[0.8em] md:text-[1.1em]">
          The passionate minds and dedicated leaders driving Invictus forward.
        </div>

      </div>

      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <TeamCarousel />
      </div>
    </>
  )
}
