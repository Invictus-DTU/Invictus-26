import { useEffect } from "react";

export function useFigureBySection({
  enabled,
  landingRef,
  contentRef,
  setLotusClass,
  setLotusStyle,
  setFigureClass,
  setFigureStyle,
}) {
  useEffect(() => {
     if (!enabled) return;
    if (!setFigureClass || !setFigureStyle) return;
    if (!setLotusClass || !setLotusStyle) return;

    const landingObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setLotusStyle({
        left: "50%",
        animation: "lotusFloat 5s ease-in-out infinite",
        filter: "drop-shadow(0 0 22px rgba(255,215,138,0.65))",
        willChange: "transform",
        });

        setLotusClass(`
        fixed
        max-[380px]:bottom-[20%]
        bottom-[22%]
        md:bottom-[29%]
        w-[80px] md:w-[100px] lg:w-[110px]
        opacity-100
        pointer-events-none
        z-[30]
        transition-all duration-1000 ease-in-out

        `);

        setFigureStyle({
          left: "49%",
          bottom: "0px",
          transform: "translateX(-50%)",
        });

        setFigureClass(`
          fixed bottom-0
          w-[240px]
          max-[380px]:w-[160px]
          max-[400px]:w-[280px]
          md:w-[280px]
          lg:w-[17.625vw]
          drop-shadow-[0_0_30px_rgba(255,215,138,0.55)]
          transition-all duration-1000 ease-in-out
          z-[20]
        `);
      },
      { threshold: 0.6 }
    );

    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        
        setLotusClass(`
        opacity-0    
        `)

        setLotusStyle({})

        setFigureStyle({
          left: "0px",
          bottom: "0px",
          transform: "translate(10%, 10%)",
        });

        setFigureClass(`
          fixed
          w-[120px]
          md:w-[140px]
          lg:w-[190px]
          pointer-events-none
          z-[30]
          opacity-60
          drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
          transition-all duration-700 ease-out
        `);
      },
      { threshold: 0.1 }
    );

    if (landingRef?.current) landingObserver.observe(landingRef.current);
    if (contentRef?.current) contentObserver.observe(contentRef.current);

    return () => {
      landingObserver.disconnect();
      contentObserver.disconnect();
    };
  }, [enabled, landingRef, contentRef, setFigureClass, setFigureStyle, setLotusClass, setLotusStyle]);
}
