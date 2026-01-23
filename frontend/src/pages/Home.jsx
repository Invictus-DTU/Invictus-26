import React, { useRef } from "react";
import Landing from "@/components/Landing/Landing";
import Aboutus from "@/components/AboutUs/Aboutus";
import FAQ from "@/components/FAQ/faq";
import Footer from "@/components/Footer/footer";
import { useFigureBySection } from "@/lib/useFigureBySection";
import { useLoader } from "@/contexts/LoaderContext";

export default function Home({
  setFigureClass,
  setFigureStyle,
  setLotusClass,
  setLotusStyle,
  setDisplayNavbar, 
  displayLogo, 
  setDisplayLogo
}) {  
  const landingRef = useRef(null);
  const contentRef = useRef(null);
  const { domReady } = useLoader();

  useFigureBySection({
    enabled: domReady,
    landingRef,
    contentRef, 
    setLotusClass,
    setLotusStyle,
    setFigureClass,
    setFigureStyle,
  });
  
  if (!domReady) return null;

  return (
    <>
      {/* LANDING */}
      <section ref={landingRef}>
        <Landing setDisplayNavbar={setDisplayNavbar} displayLogo={displayLogo} setDisplayLogo={setDisplayLogo}/>
      </section>

      <section ref={contentRef}>
        <Aboutus />
        <FAQ />
        <Footer />
      </section>
    </>
  );
}
