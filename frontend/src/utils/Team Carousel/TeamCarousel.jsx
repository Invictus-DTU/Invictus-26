import React, { useState } from 'react'
import CarouselCard from './CarouselCard'
import TeamInfo from './TeamInfo.json'    //helper for team details

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
      <div className="flex w-full justify-center mt-12 gap-5">
        <button
          onClick={prev}
          className="
            cursor-pointer
            w-12 h-12 rounded-full 
            border border-[#C5A059] text-[#C5A059] 
            bg-white/80 hover:bg-[#C5A059] hover:text-white 
            transition-all shadow-lg flex items-center justify-center
          "
        >
          ←
        </button>

        <button
          onClick={next}
          className="
            cursor-pointer
            w-12 h-12 rounded-full 
            border border-[#C5A059] text-[#C5A059] 
            bg-white/80 hover:bg-[#C5A059] hover:text-white 
            transition-all shadow-lg flex items-center justify-center
          "
        >
          →
        </button>
      </div>
    </div>
  )
}

export default TeamCarousel