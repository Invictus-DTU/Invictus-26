'use client';
import React, { useState,useEffect } from 'react';
import { Search, ChevronDown, Navigation, Router } from 'lucide-react';
import CardComponent from './CardComponent';
import SnackBar from "@/utils/snackBar";
import { useRouter } from 'next/router';

// Reusable Dropdown Component
const CustomDropdown = ({ label, options, icon: Icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (opt) => {
    setSelected(opt);
    setIsOpen(false);
    onSelect?.(opt);
  };

  return (
    <div className="relative group min-w-[160px] md:min-w-[200px]">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F9F4E8] border-3 border-[#C5A059]  rounded-md px-4 py-2 flex items-center justify-between text-[#7A6C45] font-bold shadow-sm"
      >
        <div className="flex items-center gap-2">
           {Icon && <Icon size={18} className="text-[#C5A059]  " />}
           <span className="uppercase text-sm truncate">{selected || label}</span>
        </div>
        <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#F9F4E8] border-2 border-[#C5A059]  rounded-md shadow-lg z-50 overflow-hidden">
          {options.map((opt, idx) => (
            <div 
              key={idx} 
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-[#C5A059] hover:text-white cursor-pointer text-[#C5A059]  font-semibold text-sm uppercase transition-colors"
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
      <div className="bg-[#F9F4E8] border-3 border-[#C5A059] rounded-md px-4 py-2 flex items-center text-[#7A6C45] font-bold shadow-sm">
        <Search size={18} className="text-[#C5A059] mr-2" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="EVENT NAME HERE"
          className="bg-transparent outline-none w-full placeholder-[#C5A059] text-sm uppercase font-bold"
        />
      </div>
    </div>
  );
};


export default function Events({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
    const [show, setShow] = useState(true);
    const SNACKBAR_TIMEOUT = 3000;
    const router = useRouter();
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
      if (Date.now() - lastShown < SNACKBAR_TIMEOUT || localStorage.getItem("ModelSeen") ) {
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
        w-[120px]
        md:w-[140px]
        lg:w-[190px]
        pointer-events-none
        z-[30]
        opacity-90
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
        
        <h1 
          className="invictus-heading pt-12 text-[4.7rem] lg:text-[7rem]"
        >
          EVENTS
        </h1>

        <div className="invictus-subheading pb-15 text-[0.8em] md:text-[1.1em]">
          The passionate minds and dedicated leaders driving Invictus forward.
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-4 justify-center items-start mb-16">
          
          {/* 1. Search Box */}
          <div className="w-full md:w-auto">
             <SearchInput
                value={filters.search}
                onChange={(val) =>
                  setFilters((prev) => ({ ...prev, search: val }))
                }
             />
          </div>

          {/* 2. Mode Dropdown */}
          <CustomDropdown 
            label="MODE" 
            options={['ONLINE', 'OFFLINE']} 
              onSelect={(mode) =>
                setFilters((prev) => ({ ...prev, mode }))
              }
          />

          {/* 3. Category Dropdown */}
            <CustomDropdown
              label="CATEGORY"
              options={["TECH", "NON_TECH", "CORE", "FIELD", "OTHER"]}
              onSelect={(category) =>
                setFilters((prev) => ({ ...prev, category }))
              }
            />

            <CustomDropdown
              label="DATE"
              options={["TODAY", "TOMORROW", "THIS_WEEKEND"]}
              onSelect={(date) =>
                setFilters((prev) => ({ ...prev, date }))
              }
            />
        </div>

        {/* CARD CAROUSEL SECTION */}
        <div className="w-full max-w-6xl">
           <CardComponent  filters={filters} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle}/>
        </div>

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