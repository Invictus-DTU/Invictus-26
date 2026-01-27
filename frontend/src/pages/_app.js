import { useState, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/NavBar/Navbar";
import CommonLotus from "@/utils/commonLotus";
import LandingFigure from "@/utils/landingFigure";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { useLoader } from "@/contexts/LoaderContext";
import Loader from "@/utils/loader";
import { AudioProvider } from "@/contexts/AudioContext";
import MuteButton from "@/utils/MuteButton";
import "@/styles/globals.css";
import GlobalBirdCanvas from "@/components/Landing/Three/GlobalBirdCanvas";
import { useRouter } from "next/router";
import Script from "next/script";

function DomReady() {
  const { setDomReady } = useLoader();

  useEffect(() => {
      setDomReady(true);
  }, []);

  return null;
}

export default function App({ Component, pageProps }) {
  const [lotusStyle, setLotusStyle] = useState({});
  const [lotusClass, setLotusClass] = useState(
    "top-0 left-0 w-[180px] opacity-0",
  );
  const [figureStyle, setFigureStyle] = useState({});
  const [figureClass, setFigureClass] = useState(
    "top-0 left-0 w-[180px] opacity-0",
  );
  const router = useRouter();

  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [displayLogo, setDisplayLogo] = useState(false);

  useEffect(() => {
    //always show navbar by default when route changes
    if (router.pathname !== "/Home" && router.pathname !== "/model") {
      setDisplayNavbar(true);
    }

    //on home reset first, observer will correct it
    if (router.pathname === "/Home") {
      setDisplayNavbar(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    //for any route except home fixed wordArt must be visible
    if (router.pathname !== "/Home" && router.pathname !== "/model") {
      setDisplayLogo(true);
    }

    //on home observer decides (start hidden)
    if (router.pathname === "/Home") {
      setDisplayLogo(false);
    }
  }, [router.pathname]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`}
        strategy="beforeInteractive"
      />
      <AuthProvider>
        <LoaderProvider>
          <AudioProvider>
          <DomReady />
          <Loader />
          <MuteButton />
          {router.pathname !== "/model" && (
            <Navbar
              className={`
            fixed z-50
            transform transition-all duration-700 ease-in-out
            ${
              displayNavbar
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-full opacity-0 pointer-events-none"
            }
          `}
            />
          )}
          {router.pathname !== "/model" && (
            <img
              src="/invictuslogo.svg"
              alt="Invictus'26 Logo"
              onClick={() => router.push("/")}
              className={`
          fixed top-1 left-2 z-60
          w-[100px] md:w-[150px] cursor-pointer
          md:hidden
          transform transition-all duration-700 ease-in-out

          drop-shadow-[0_0_2rem_rgba(212,175,55,0.9)]
          hover:drop-shadow-[0_0_4rem_rgba(212,175,55,0.95)]
          hover:scale-105

          ${displayLogo ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}
        `}
            />
          )}
          {router.pathname === "/model" ? null : (
            <CommonLotus className={lotusClass} style={lotusStyle} />
          )}
          {router.pathname === "/model" ? null : (
            <LandingFigure className={figureClass} style={figureStyle} />
          )}
          
          <GlobalBirdCanvas />

          <Component
            {...pageProps}
            setLotusClass={setLotusClass}
            setLotusStyle={setLotusStyle}
            setFigureClass={setFigureClass}
            setFigureStyle={setFigureStyle}
            setDisplayNavbar={setDisplayNavbar}
            displayLogo={displayLogo}
            setDisplayLogo={setDisplayLogo}
          />

          
          </AudioProvider>
        </LoaderProvider>
      </AuthProvider>
    </>
  );
}
