import { useRouter } from "next/router";
import { useLoader } from "@/contexts/LoaderContext";

export default function Loader() {
  const router = useRouter();
  const { domReady, modelReady } = useLoader();

  const isModelRoute = router.pathname === "/model";
  const isReady = isModelRoute ? domReady && modelReady : domReady;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        isReady ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md px-8 text-center">
        {/* Elegant Typography */}
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600 mb-8 animate-pulse">
          Loading Experience
        </h2>

        {/* Custom Progress Bar */}
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-white blur-[2px] animate-[slide_1.5s_ease-in-out_infinite]"></div>
        </div>

        {/* Tip Section */}
        <div className="mt-12 opacity-60">
           <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Tip 💡</p>
           <p className="text-sm text-gray-300">
             Click anywhere to enable background music!
           </p>
        </div>
      </div>

      {/* Add this custom animation in your globals.css or tailwind config if not present */}
      <style jsx>{`
        @keyframes slide {
          0% { left: -40%; }
          100% { left: 140%; }
        }
      `}</style>
    </div>
  );
}