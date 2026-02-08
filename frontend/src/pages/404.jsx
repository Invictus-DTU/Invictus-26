import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0f1011] font-['Montserrat'] flex items-center justify-center">
      
      {/* WRAPPER - Controlled width for large screens, flex-col on mobile */}
      <main className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-0 h-full max-w-7xl">
        
        {/* LEFT SECTION: CONTENT & WHEEL */}
        <section className="relative flex-1 flex flex-col items-center justify-center text-center py-10 lg:py-0">
          
          {/* ROTATING BACKGROUND WHEEL */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <img
              src="/wheel.svg"
              alt=""
              className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] animate-spin-slow invert object-contain"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="font-['Orbitron'] text-7xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#8a6d1d] drop-shadow-2xl">
              404
            </h1>
            
            <h2 className="mt-4 text-[#F6F1D4] text-xl md:text-2xl font-bold uppercase tracking-[0.2em]">
              Lost in the Void
            </h2>
            
            <p className="mt-4 text-[#F6F1D4]/60 text-sm md:text-base max-w-xs md:max-w-md leading-relaxed italic">
              The page you seek has ascended or never existed.
            </p>

            <button
              onClick={() => router.push('/')}
              className="mt-10 px-10 py-3 bg-transparent border-2 border-[#D4AF37] rounded-full text-[#D4AF37] font-bold text-lg uppercase tracking-widest transition-all duration-500 hover:bg-[#D4AF37] hover:text-[#0f1011] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Return Home
            </button>
          </div>
        </section>

        {/* RIGHT SECTION: THE BEAM & FIGURE */}
        <section className="relative flex-1 flex flex-col items-center justify-end h-[50vh] lg:h-[80vh] w-full">
          
          <div className="relative w-full max-w-[400px] h-full flex flex-col items-center">
            
            {/* HOVERING BEAM EFFECT */}
            <div 
              className="absolute top-0 w-full h-[90%] z-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0.05) 80%, transparent 100%)',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)'
              }}
            />

            {/* GLOWING BASE */}
            <div className="absolute bottom-0 w-[80%] h-12 bg-[#D4AF37] rounded-[100%] blur-3xl opacity-40 z-10" />

            {/* FIGURE IMAGE */}
            <img
              src="/figure1.png"
              alt="Ascended Figure"
              className="relative z-20 w-auto h-[80%] lg:h-[90%] object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            />
          </div>
        </section>

      </main>

      {/* TAILWIND CUSTOM ANIMATION & UTILITIES */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}