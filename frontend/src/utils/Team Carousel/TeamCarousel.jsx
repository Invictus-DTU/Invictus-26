import React, { useState } from 'react'
import CarouselCard from './CarouselCard'
import TeamInfo from './TeamInfo.json'    //helper for team details. using dummy data atm
import { ChevronLeft, ChevronRight } from "lucide-react";

const TeamCarousel = () => {
  const [active, setActive] = useState(0)
  const count = TeamInfo.items.length

  const prev = () => { setActive((prev) => (prev === 0 ? count - 1 : prev - 1)) }
  const next = () => { setActive((prev) => (prev === count - 1 ? 0 : prev + 1)) }

  return (
    <div className="relative w-full py-8 lg:py-20 overflow-x-hidden">
      <div className="flex justify-center items-center h-[50vh]">
        <div className="relative max-w-full h-full flex justify-center items-center">

          {TeamInfo && TeamInfo.items.map((item, i) => {

            let offset = i - active

            //wrap around for looping
            if (offset < -count / 2) offset += count
            if (offset > count / 2) offset -= count

            // Minor Optimization: Don't render cards that are too far away
            if (Math.abs(offset) > 3) return null

            const shouldBeFlipped = Math.abs(offset) > 1;

            return (
              <CarouselCard key={i} personInfo={item} offset={offset} isFlipped={shouldBeFlipped}/>
            )
          })}

        </div>
      </div>

      {/* controls */}
      <div className="flex w-full justify-center space-x-8 mt-10">
        <button onClick={prev}
        className="p-3 rounded-full border-3 border-[#D4AF37] hover:border-white text-[#D4AF37] bg-white hover:bg-[#D4AF37] hover:text-white transition-all 
        duration-300 group cursor-pointer hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]">
          <ChevronLeft className="w-8 h-8" strokeWidth={4} />
        </button>

        <button onClick={next}
        className="p-3 rounded-full border-3 border-[#D4AF37] hover:border-white text-[#D4AF37] bg-white hover:bg-[#D4AF37] hover:text-white transition-all 
        duration-300 group cursor-pointer hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.4)]">
          <ChevronRight className="w-8 h-8" strokeWidth={4} />
        </button>
      </div>
        
    </div>
  )
}

export default TeamCarousel