import React, { useState, useRef, useEffect, useContext } from 'react'
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  //sections and routes
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/Events" },
    { name: "Workshop", href: "/Workshops" },
    { name: "Team", href: "/Team" },
    { name: "Sponsor", href: "/Sponsors" },
    { name: "Gallery", href: "/Gallery" }
  ];

  //hindi/sanskrit numeric characters
  const nums = ['०१', '०२', '०३', '०४', '०५', '०६'];

  const [activeIndex, setActiveIndex] = useState(-1); //initialize -1, updated via router useEffect
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });
  const [open, setOpen] = useState(false);
  const itemsRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //syncing activeIndex with current route
  useEffect(() => {
    if (!router.isReady) return;
    
    let index = navItems.findIndex(i => i.href === router.pathname);
    
    if (index === -1 && router.pathname === '/login') {
        index = navItems.length;
    }

    setActiveIndex(index);
  }, [router.pathname, router.isReady]);

  //handle pill animation
  useEffect(() => {
    if (!mounted) return;
    if (activeIndex === -1) {
        setPillStyle({ width: 0, left: 0 });
        return;
    }
    const activeElement = itemsRef.current[activeIndex];
    if (activeElement) {
      setPillStyle({
        width: activeElement.offsetWidth,
        left: activeElement.offsetLeft,
      });
    }
  }, [activeIndex, mounted]);

  //helper to handle navigation
  const handleNavigation = (e, href) => {
      e.preventDefault();
      router.push(href);
      setOpen(false);
  };

  //helper for auth click (Logout or navigate to Login)
  const handleAuthClick = (e) => {
      e.preventDefault();
      if (user) {
          logout();
      } else {
          router.push('/login');
      }
      setOpen(false);
  }

  const authIndex = navItems.length;    //last index for auth button

  return (
    <div className="flex justify-center">
      <nav className="fixed top-4 right-0 w-[85vw] z-[50] bg-transparent backdrop-blur-md text-black rounded-l-4xl rounded-r-2xl border-3 border-[#D4AF37] 
      shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15)]">
        
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          
          {/*PLACEHOLDER (PH) for logo */}
          <div className="flex text-[#D4AF37] text-[1rem] md:text-[0.8rem] items-center space-x-3 md:space-x-4 cursor-pointer"
               onClick={() => router.push('/')}>
            <div className="flex flex-col border-r border-[#D4AF37] pr-3 md:pr-4 leading-tight">
              <span className="font-bold uppercase text-xl tracking-tighter">Logo(PH)</span>
            </div>
          </div>

          {/* desktop menu */}
          <div className="hidden md:flex md:text-[0.67rem] items-center space-x-1 lg:space-x-4 xl:space-x-5 relative text-[0.75rem] 
          lg:text-[0.9rem] xl:text-[1.1rem] uppercase tracking-wider">
            
            {/* selectd option pill */}
            { mounted && activeIndex !== -1 && (
              <div 
                className="absolute h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] 
                rounded-[0.8rem] border-2 border-[#D4AF37] brightness-115 saturate-90 z-0"
                style={{
                  width: `${pillStyle.width}px`,
                  transform: `translateX(${pillStyle.left}px)`,
                }}/>)
            }

            {/* nav items */}
            {navItems.map(({ name, href }, index) => (
              <a key={index} href={href} ref={(el) => (itemsRef.current[index] = el)}
                onClick={(e) => handleNavigation(e, href)}
                className={`relative z-10 px-2 lg:px-[0.6rem] xl:px-[0.8rem] py-[0.3rem] transition-colors duration-300 
                [font-family:'Montserrat',sans-serif] font-[600] whitespace-nowrap 
                ${activeIndex === index ? "text-white" 
                : "bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent brightness-105 saturate-115"} 
                ${activeIndex === index ? "hover:text-white" : "hover:text-[#D4AF37] hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"}`}>
                {name}</a>
            ))}

            {/* desktop auth btn */}
            <div className="border-l border-[#D4AF37]">
            <button 
                ref={(el) => (itemsRef.current[authIndex] = el)}
                onClick={handleAuthClick}
                className={`relative z-10 px-2 lg:px-[0.6rem] xl:px-[0.8rem] py-[0.3rem] transition-colors duration-300 
                [font-family:'Montserrat',sans-serif] font-[600] whitespace-nowrap ml-6 lg:ml-10 xl:ml-14 cursor-pointer
                ${activeIndex === authIndex ? "text-white" 
                : "bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent brightness-105 saturate-115"} 
                ${activeIndex === authIndex ? "hover:text-white" : "hover:text-[#D4AF37] hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"}`}
            >
                {user ? "LOGOUT" : "LOGIN"}
            </button>
            </div>

          </div>

          {/* mobile menu btn */}
          <button className="md:hidden relative focus:outline-none drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]" onClick={() => setOpen(!open)}>
            <div className={`w-6 h-0.5 bg-[#D4AF37] mb-1.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#D4AF37] mb-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* mobile menu overlay */}
      <div 
          className={`fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-transparent backdrop-blur-xl z-[45] 
          transform transition-transform duration-500 ease-in-out border-l-2 border-[#D4AF37] flex flex-col pt-32 px-10 space-y-8
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {navItems.map(({ name, href }, i) => (
            <button 
              key={i} 
              onClick={(e) => handleNavigation(e, href)} 
              className={`text-left text-2xl uppercase tracking-[0.2em] font-bold [font-family:'Montserrat',sans-serif] transition-all duration-300
              ${activeIndex === i 
                ? "text-[#D4AF37] translate-x-4 drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]" 
                : "text-white/40 hover:text-white hover:translate-x-2"
              }`}
            >
              <span className="text-s mr-4 text-[#D4AF37]/90">{nums[i]}</span>
              {name}
            </button>
          ))}

          {/* mobile auth button */}
          <div className="border-t border-[#D4AF37]/20 pt-4">
            <button onClick={handleAuthClick}
            className={`text-left text-2xl uppercase tracking-[0.2em] font-bold [font-family:'Montserrat',sans-serif] transition-all duration-300
            ${activeIndex === authIndex
                ? "text-[#D4AF37] translate-x-4 drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]" 
                : "text-white/40 hover:text-white hover:translate-x-2"
            }`}>
                {user ? "LOGOUT" : "LOGIN"}
            </button>
          </div>

          {/* PLACEHOLDER (PH) for mobile menu bottom */}
          <div className="relative top-0 border-t border-[#D4AF37]/20 pt-4">
              <div className="flex text-[#D4AF37] text-[1rem] md:text-[0.8rem] items-center space-x-3 md:space-x-4">
            <div className="flex flex-col border-r border-[#D4AF37] pr-3 md:pr-4 leading-tight">
              <span className="font-bold uppercase tracking-tighter">Invictus(PH)</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-medium uppercase tracking-[0.2em]">2026</span>
            </div>
            </div>
          </div>
        </div>

        {/* dim bg */}
        {open && (
          <div 
            className="fixed inset-0 bg-black/60 z-[40] md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

    </div>
  )
}