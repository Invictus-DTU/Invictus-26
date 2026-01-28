import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-[#0f1011] font-[Montserrat]">

      {/* MAIN CONTAINER */}
      <div className="relative w-[1440px] max-w-full h-[1024px] max-h-screen flex justify-between items-center px-5 
                      max-[1200px]:flex-col-reverse max-[1200px]:h-auto">

        {/* LEFT SECTION */}
        <div className="relative w-[874px] h-[842px] flex flex-col justify-center items-center text-center 
                        max-[1200px]:w-full max-[1200px]:max-w-[600px] max-[1200px]:h-[600px] max-[1200px]:mb-[50px]">

          {/* ROTATING WHEEL */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                          w-[874px] h-[842px] flex justify-center items-center 
                          invert opacity-10 pointer-events-none 
                          max-[1200px]:w-full max-[1200px]:h-full">

            <img
              src="NotFound/wheel.svg"
              alt=""
              className="w-full h-full object-contain animate-spin-slow"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="relative z-10 flex flex-col items-center justify-center ml-5">

            <h1 className="font-[Orbitron] text-[120px] font-bold leading-none mb-[5px] 
                           text-stroke-gold
                           drop-shadow-[0_0_2px_rgba(212,175,55,0.3)]">
              404
            </h1>

            <h2 className="text-[#F6F1D4] text-[28px] font-bold mb-[15px] lowercase tracking-wide">
              oops! page not found
            </h2>

            <p className="text-[#F6F1D4] text-[13px] font-normal mb-[35px] max-w-[450px] leading-relaxed">
              Lost? Go back to home {`->`}
            </p>

            <button
              onClick={() => router.push('/')}
              className="w-[200px] h-[50px] flex justify-center items-center 
                         bg-transparent border-[5px] border-[#D4AF37CC] rounded-[15px]
                         text-[#D4AF37CC] font-bold text-[28px] tracking-wide
                         transition-all duration-300
                         hover:bg-[rgba(212,175,55,0.1)]
                         hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                         hover:-translate-y-[2px]"
            >
              Home
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative w-[40%] h-full flex justify-center items-end 
                        max-[1200px]:w-full max-[1200px]:h-[60vh]">

          <div className="relative w-[352px] h-[842px] flex justify-center items-end">

            {/* BEAM */}
            <div className="absolute top-0 left-0 w-full h-full z-[1]
                            bg-[linear-gradient(to_bottom,rgba(212,175,55,0.8)_0%,rgba(212,175,55,0.1)_70%,transparent_100%)]
                            [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]">
            </div>

            {/* BEAM BASE */}
            <div className="absolute bottom-0 w-full h-[80px] bg-[#ffd98b] rounded-full 
                            blur-[5px] z-[2]">
            </div>

            {/* GOD IMAGE */}
            <img
              src="/figure.png"
              alt="God"
              className="absolute z-[3] bottom-0 left-1/2 -translate-x-1/2 
                         w-[70%] max-w-none h-auto block"
            />
          </div>
        </div>

      </div>
    </div>
  )
}