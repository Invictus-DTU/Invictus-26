'use client';
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import CardComponent from './CardComponent';

// Reusable Dropdown Component
const CustomDropdown = ({ label, options, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

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
              onClick={() => { setSelected(opt); setIsOpen(false); }}
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
const SearchInput = () => {
  return (
    <div className="relative min-w-[250px]">
       <div className="bg-[#F9F4E8] border-3 border-[#C5A059]  rounded-md px-4 py-2 flex items-center text-[#7A6C45] font-bold shadow-sm">
          <Search size={18} className="text-[#C5A059] mr-2" />
          <input 
            type="text" 
            placeholder="EVENT NAME HERE" 
            className="bg-transparent outline-none w-full placeholder-[#C5A059] text-sm uppercase font-bold"
          />
       </div>
    </div>
  );
};

export default function Events() {
  return (
    <div 
      className="min-h-screen w-full relative overflow-x-hidden "

    >
      <div className="container mx-auto px-4 py-10  flex flex-col items-center relative z-10">
        
        {/* HEADER - Specs: Orbitron, 700 Bold, Gradient Text */}
        <h1 
          className="invictus-heading py-12 text-[7.7rem]"
          
        >
          EVENTS
        </h1>

        {/* FILTER SECTION */}
        {/* Grid for mobile, Flex row for desktop */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-4 justify-center items-start mb-16">
          
          {/* 1. Search Box */}
          <div className="w-full md:w-auto">
             <SearchInput />
          </div>

          {/* 2. Mode Dropdown */}
          <CustomDropdown 
            label="MODE" 
            options={['Online', 'Offline', 'Hybrid']} 
          />

          {/* 3. Category Dropdown */}
          <CustomDropdown 
            label="CATEGORY" 
            options={['Category 1', 'Category 2', 'Category 3']} 
          />

          {/* 4. Date Dropdown */}
          <CustomDropdown 
            label="DATE" 
            options={['Today', 'Tomorrow', 'This Weekend']} 
          />
        </div>

        {/* CARD CAROUSEL SECTION */}
        <div className="w-full max-w-6xl">
           <CardComponent />
        </div>

      </div>
    </div>
  );
}