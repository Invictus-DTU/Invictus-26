import React, { useRef } from "react";
import Landing from "@/components/Landing/Landing";
import Aboutus from "@/components/AboutUs/Aboutus";
import FAQ from "@/components/FAQ/faq";
import Footer from "@/components/Footer/footer";
import { useFigureBySection } from "@/lib/useFigureBySection";

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

  useFigureBySection({
    landingRef,
    contentRef, 
    setLotusClass,
    setLotusStyle,
    setFigureClass,
    setFigureStyle,
  });

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
