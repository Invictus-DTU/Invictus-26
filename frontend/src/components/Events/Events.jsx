'use client';
import React, { useState,useEffect } from 'react';
import { Search, ChevronDown, Navigation, Router } from 'lucide-react';
import CardComponent from './CardComponent';
import SnackBar from "@/utils/snackBar";
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";


// Reusable Dropdown Component
const CustomDropdown = ({ label, options, icon: Icon, onSelect, reset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (opt) => {
    setSelected(opt);
    setIsOpen(false);
    onSelect?.(opt);
  };

  useEffect(() => {
    if (reset) {
      setSelected(null);
    }
  }, [reset]);

  return (
    <div className="relative group min-w-[160px] md:min-w-[200px]">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F9F4E8] border-3 border-[#a69153]  rounded-md px-4 py-2 flex items-center justify-between text-[#7A6C45] font-bold shadow-sm"
      >
        <div className="flex items-center gap-2">
           {Icon && <Icon size={18} className="text-[#C5A059]  " />}
           <span className="uppercase text-sm truncate">{selected || label}</span>
        </div>
        <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#F9F4E8] border-2 border-[#a69153]  rounded-md shadow-lg z-50 overflow-hidden">
          {options.map((opt, idx) => (
            <div 
              key={idx} 
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-[#a69153] hover:text-white cursor-pointer text-[#a69153]  font-semibold text-sm uppercase transition-colors"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Search Input Component (Specific design from image)
const SearchInput = ({ value, onChange }) => {
  return (
    <div className="relative min-w-[250px]">
      <div className="bg-[#F9F4E8] border-3 border-[#a69153] rounded-md px-4 py-2 flex items-center text-[#7A6C45] font-bold shadow-sm">
        <Search size={18} className="text-[#a69153] mr-2" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="EVENT NAME HERE"
          className="bg-transparent outline-none w-full placeholder-[#a69153] text-sm uppercase font-bold"
        />
      </div>
    </div>
  );
};


export default function Events({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
    const [show, setShow] = useState(true);
    const SNACKBAR_TIMEOUT = Number(process.env.NEXT_PUBLIC_SNACKBAR_TIMEOUT_ONE);
    const router = useRouter();
    const [reset, setReset] = useState(false);
    const [filters, setFilters] = useState({
      search: "",
      mode: null,
      category: null,
      date: null,
    });


    useEffect(() => {
      if (typeof window === "undefined") return;

      const shown = localStorage.getItem("SnackbarShownEvents");
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

    const handleClose = () => {
      setShow(false);
      localStorage.setItem("SnackbarShownEvents",  Date.now().toString());
    };


  return (
    <div 
      className=" w-full relative overflow-x-hidden "

    >
      <div className="container mx-auto px-4 pt-10 flex flex-col items-center relative z-10">
        
        <motion.h1
  initial={{ opacity: 0, y: 40 }}
   whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="invictus-heading pt-12 text-[4.7rem] lg:text-[7rem]"
>
          EVENTS
        </motion.h1>

       <motion.div
  initial={{ opacity: 0 }}
   whileInView={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="invictus-subheading pb-15 text-[0.8em] md:text-[1.1em]"
>
         Exciting events across every domain, where ideas turn into real innovation.
        </motion.div>

        

     <motion.div
  initial={{ opacity: 0, y: 30 }}
   whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.7 }}
  className="bg-white/40 backdrop-blur-md border border-[#c5a059]/30 rounded-xl p-6 shadow-xl w-full max-w-5xl mb-16"
>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-4 justify-center items-start">
            
            <SearchInput
              value={filters.search}
              onChange={(val) =>
                setFilters((prev) => ({ ...prev, search: val }))
              }
            />

            <CustomDropdown 
              label="MODE" 
              options={['ONLINE', 'OFFLINE']} 
              onSelect={(mode) => {
                setFilters((prev) => ({ ...prev, mode }))
                setReset(false);
              }}
              reset={reset}
            />

            <CustomDropdown
              label="CATEGORY"
              options={["TECH", "NON_TECH", "CORE", "FIELD", "OTHER"]}
              onSelect={(category) =>{
                setFilters((prev) => ({ ...prev, category }))
                setReset(false);
              }}
              reset={reset}
            />

            <CustomDropdown
              label="DATE"
              options={["27th_FEB", "28th_FEB", "1st_MARCH"]}
              onSelect={(date) => {
                setFilters((prev) => ({ ...prev, date }))
                setReset(false);
              }}
              reset={reset}
            />

            <button 
              title="RESET FILTERS"
              style={{ transition: 'transform 0.5s ease-in-out' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(45deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
              className='mt-2 border-[#a69153] text-[#39362d] transition-transform duration-500 cursor-pointer'
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  search: "",
                  mode: null,
                  category: null,
                  date: null,
                }))
                setReset(true);
              }}
            >
              <RefreshCw />
            </button>
          </div>
        </motion.div>

        {/* CARD CAROUSEL SECTION */}
         <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
   whileInView={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.6, duration: 0.6 }}
  whileHover={{ y: -8 }}
  className="w-full max-w-6xl  rounded-4xl transition-all duration-300  hover:shadow-amber-100 hover:shadow-2xl"
>
          <CardComponent filters={filters} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle}/>
        </motion.div>

      </div>
        {show && (
          <SnackBar
            text="See your registered events or workshops in your Profile"
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