import { useRouter } from "next/router";
import { useLoader } from "@/contexts/LoaderContext";

export default function Loader() {
  
  const router = useRouter();
  const { domReady, modelReady } = useLoader();

  const isModelRoute = router.pathname === "/model";
  const isReady = isModelRoute ? domReady && modelReady : domReady;
  
  return (
    <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0a0a0a] ${isReady ? "opacity-0 duration-1200 pointer-events-none" : "opacity-100"}`}>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="relative w-40 h-40 flex items-center justify-center">

        {/* LOGO */}
        <div className="absolute z-10 w-16 h-16 flex items-center justify-center">
          <img
            src="/invictuslogo.svg"
            alt="Logo"
            className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,160,60,0.6)]"
          />
        </div>

        {/* SVG LOADER */}
        <svg
          className="w-full h-full animate-spin"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ff4d4d" />
            </linearGradient>
          </defs>

          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#333"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Foreground arc */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#loaderGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80 180"
            className="drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          />
        </svg>
      </div>

      {/* TEXT */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-medium text-white tracking-[0.25em] uppercase opacity-80">
          Loading
        </h2>

        <div className="mt-4 opacity-50">
          <p className="text-[10px] uppercase tracking-widest text-gray-500">
            Tip 💡
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Click anywhere to enable background music!
          </p>
        </div>
      </div>
    </div>
  );
}
