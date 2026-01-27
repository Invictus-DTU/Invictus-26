import React, { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { Instagram } from 'lucide-react';

const CarouselCard = ({ personInfo, offset, isFlipped }) => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setScreenSize('mobile');
      else if (window.innerWidth < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gap = screenSize === 'mobile' ? 160 : screenSize === 'tablet' ? 210 : 260;
  
  const translateX = offset * gap
  const scale = offset === 0 ? 1.1 : Math.abs(offset) === 1 ? 0.95 : 0.85
  const zIndex = 10 - Math.abs(offset)
  const rotateFactor = offset > 0 ? -1 : 1;
  const opacity = Math.abs(offset) > 2 ? 0 : 1;

  return (
    <div 
      className="absolute w-[180px] sm:w-[220px] h-[260px] sm:h-[310px] transition-all duration-500 ease-in-out"
      style={{
        transform: `translateX(${translateX}px) scale(${scale})`,
        zIndex: zIndex,
        perspective: '1000px',
        opacity: opacity,
      }}
    >
      {/* rotation continer */}
      <div 
        className="relative w-full h-full transition-transform duration-700"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? `rotateY(${rotateFactor * 160}deg)` : "rotateY(0deg)"
        }}
      >
        
        {/* front side of card */}
        <div 
          className="absolute inset-0 w-full h-full shadow-xl flex flex-col justify-center items-center"
          style={{ 
            backfaceVisibility: "hidden",
            backgroundImage: "url('/Team/card.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center' }}>

          <div className="h-32 sm:h-40 flex flex-col items-center justify-end">
            <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full border-3 border-[#D4AF37]/60 brightness-105 saturate-125 
            flex items-center justify-center">
              
              <div className={`w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-cover`} style={{//no need to give it in tailwind specific only because tailwind will crash it
                backgroundImage: `url(${personInfo.avatar})`,
              }}></div>
            </div>
            <div
            className='w-40 h-4 mt-2'
            style={{ 
            backfaceVisibility: "hidden",
            backgroundImage: "url('/Team/divider.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center' }}></div>
          </div>

          <div className="text-center [font-family:'Montserrat',sans-serif] font-[900]">
            <p className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-[1em] sm:text-[1.3em] text-transparent">
              {personInfo.name}
            </p>
            <p className="py-2 sm:py-3 text-black opacity-70 text-[0.9em] sm:text-[1.1em]">
              {personInfo.designation}
            </p>
          </div>
          <div className="mb-4 flex justify-center gap-4">
          <div className="group p-1 rounded-lg border-2 border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:scale-110 transition-all 
          duration-300 cursor-pointer">
            <a href={personInfo.ln_link} target="_blank" rel="noopener noreferrer">
            {/* default state */}
            <Linkedin size={20} strokeWidth={2} color='#D4AF37' className="group-hover:hidden" />
            {/* hover state */}
            <Linkedin size={20} strokeWidth={0} className="fill-current text-white hidden group-hover:block" />
            </a>
          </div>
           { personInfo.ig_link && <div className="group p-1 rounded-lg border-2 border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:scale-110 transition-all 
          duration-300 cursor-pointer">
            <a href={personInfo.ig_link} target="_blank" rel="noopener noreferrer">
            {/* default state */}
            <Instagram size={20} strokeWidth={2} color='#D4AF37' className="group-hover:hidden" />
            {/* hover state */}
            <Instagram size={20} color='white' strokeWidth={2} className="hidden group-hover:block" />
            </a>
          </div> }
          </div>

        </div>

        {/* back side of card */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl bg-white border-3 border-[#D4AF37]/60 rounded-[20px]
          shadow-xl flex items-center justify-center text-white"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: `rotateY(${rotateFactor * 180}deg)`,
            backgroundImage: "url('/Team/pattern.webp')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center' }}>
          <div className="text-center">
          </div>
        </div>

      </div>
    </div>
  )
}

export default CarouselCard