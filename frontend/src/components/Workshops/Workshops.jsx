'use client';
import React, { useState, useEffect } from 'react';
import CardComponent from '../Events/CardComponent';
import { motion } from "framer-motion";
import { Navigation } from 'lucide-react';
import { useRouter } from 'next/router';
import SnackBar from "@/utils/snackBar";

export default function Workshops({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {

  const router = useRouter();
  const [show, setShow] = useState(true);
  const SNACKBAR_TIMEOUT = Number(process.env.NEXT_PUBLIC_SNACKBAR_TIMEOUT_ONE);

      useEffect(() => {
        if (typeof window === "undefined") return;
  
        const shown = localStorage.getItem("SnackbarShownWorkshop");
        if(!shown){
          setShow(true);
          return;
        }
        const lastShown = Number(shown);
        // console.log(Date.now() - lastShown);
        // console.log(SNACKBAR_TIMEOUT);
        
        if (Date.now() - lastShown < SNACKBAR_TIMEOUT ) {
          setShow(false);
        }
      }, []);

          const handleClose = () => {
      setShow(false);
      localStorage.setItem("SnackbarShownWorkshop",  Date.now().toString());
    };

  useEffect(() => {
    if (!setFigureClass || !setFigureStyle) return;
  
    setFigureStyle({
      left: "0px",
      bottom: "0px",
      transform: "translate(10%, 10%)",
    });
  
    setFigureClass(`
      fixed
      w-[100px]
        md:w-[120px]
        lg:w-[175px]
        pointer-events-none
        z-[30]
        opacity-60
      drop-shadow-[0_0_30px_rgba(255,215,138,0.4)]
      transition-all duration-700 ease-out
    `);
  }, [setFigureClass, setFigureStyle]);

    const [filters, setFilters] = useState({
          tag: "Workshop",
    });

  return (
    <div 
      className=" w-full relative overflow-x-hidden "

    >
      <div className="container mx-auto px-4 pt-10 flex flex-col items-center relative z-10">
        
       <motion.h1
  initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1 ,y: 0, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="invictus-heading pt-12 mb-5  text-[3rem] lg:text-[7rem]"
>
  WORKSHOPS
</motion.h1>


         <motion.div
  initial={{ opacity: 0, y:40 }}
  whileInView={{ opacity: 1 ,y: 0, scale: 1  }}
  transition={{  duration: 0.6 }}
  className="invictus-subheading pb-15 text-[0.8em] md:text-[1.2em]"
>
  Exciting Workshops across multiple domains, promoting maximum learning.
</motion.div>
        {/* CARD CAROUSEL SECTION */}
       <motion.div
  initial={{ opacity: 0, scale: 0.97 }}
  whileInView={{ opacity: 1, y:0,scale: 1 }}
  transition={{ delay: 0.35, duration: 0.6 }}
  whileHover={{ y: -6 }}
  className="w-full max-w-6xl"
>

           <CardComponent filters={filters} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle}/>
        </motion.div>

      </div>

      {show && (
          <SnackBar
            text="See live locations of Workshops/Events in your Profile"
            actionText={
              <span className="flex h-6 items-center">
              <Navigation />
              </span>
            }
            onAction={() => router.replace("/Dashboard")}
            onClose={handleClose}
          />
        )}
    </div>
  );
}