import React, { useState } from 'react'
import CarouselCard from './CarouselCard'
import TeamInfo from './TeamInfo.json'    //helper for team details. using dummy data atm

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
        className="p-3 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all 
        duration-300 group cursor-pointer hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button onClick={next}
        className="p-3 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all 
        duration-300 group cursor-pointer hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.4)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
  </div>
        
    </div>
  )
}

export default TeamCarousel