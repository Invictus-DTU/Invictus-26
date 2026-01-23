import { useState, useEffect } from "react";
import faqs from "./faqs.json";

export default function FAQ() {
  const [open, setOpen] = useState([]);

  const toggleFAQ = (i) => {
    setOpen((prev) =>
      prev.includes(i)
        ? prev.filter((x) => x !== i)
        : [...prev, i]
    );
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-sans pt-28 pb-12 px-6">
      
      {/* BACKGROUNDS */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* TITLE */}
        <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-widest mb-12 drop-shadow-lg">
          <span className="invictus-heading text-5xl md:text-7xl ">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </h1>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open.includes(i);

            return (
              <div 
                key={i} 
                className={`
                  rounded-xl border transition-all duration-300 ease-in-out
                  ${isOpen ? 'border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.3)]' : 'border-[#6E5616] hover:border-[#D4AF37]/60'}
                `}
              >
                
                {/* --- QUESTION HEADER --- */}
                <div
                  onClick={() => toggleFAQ(i)}
                  className={`
                    flex items-center justify-between p-5 md:p-6 cursor-pointer transition-all duration-300
                    ${isOpen 
                      ? 'bg-gradient-to-r from-[#FFFDF5] to-[#F3E3B6] rounded-t-xl text-[#423212]' 
                      : 'bg-[#2A2112]/80 backdrop-blur-sm rounded-xl text-[#F3E3B6] hover:bg-[#3E2D0B]/80'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Lotus Icon */}
                    <img
                      src="/lotus.svg"
                      alt="lotus"
                      className={`w-6 h-6 transition-all duration-300 ${isOpen ? 'opacity-100 brightness-75 sepia' : 'opacity-70 brightness-150'}`}
                    />
                    
                    {/* Question Text */}
                    <span className={`text-lg md:text-xl font-bold tracking-wide ${isOpen ? 'text-[#423212]' : 'text-[#F3E3B6]'}`}>
                      {item.q}
                    </span>
                  </div>

                  {/* Rotating Wheel Icon */}
                  <img
                    src="/wheel.svg"
                    alt="toggle"
                    className={`w-8 h-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      ${isOpen ? 'rotate-180 brightness-0 opacity-80' : 'rotate-0 brightness-0 invert opacity-60'}
                    `}
                  />
                </div>

                {/* --- ANSWER BODY --- */}
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out bg-[#FFFBEB]
                    ${isOpen ? 'max-h-[500px] opacity-100 rounded-b-xl' : 'max-h-0 opacity-0'}
                  `}
                >
                  <p className="p-6 text-[#5C450E] text-base md:text-lg leading-relaxed font-medium border-t border-[#D4AF37]/30">
                    {item.a}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}