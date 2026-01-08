import React, { useState, useEffect } from 'react'

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
          className="absolute inset-0 w-full h-full rounded-xl shadow-xl flex flex-col justify-center items-center"
          style={{ 
            backfaceVisibility: "hidden",
            backgroundImage: "url('/Team/card.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center' }}>


          {/* individual picture will be rendered here (personInfo.avatar) */}
          <div className="h-32 sm:h-40 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full border-3 border-[#D4AF37]/60 brightness-105 saturate-125 
            flex items-center justify-center">
              <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-[#808080]"></div>
            </div>
          </div>

          <div className="text-center [font-family:'Montserrat',sans-serif] font-[900]">
            <p className="bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-[1.1em] sm:text-[1.4em] text-transparent">
              {personInfo.name}
            </p>
            <p className="py-2 sm:py-3 text-black opacity-70 text-[0.9em] sm:text-[1.2em]">
              {personInfo.designation}
            </p>
          </div>

        </div>

        {/* back side of card */}
        <div 
          className="absolute inset-0 w-full h-full rounded-xl bg-white border-3 border-[#D4AF37]/60 
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