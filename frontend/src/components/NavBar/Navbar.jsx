import React, { useState, useRef, useEffect, useContext } from 'react'
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import Image from "next/image";

export default function Navbar({ className = "" }) {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const router = useRouter();

  //sections and routes
  const navItems = [
    { name: "Home", href: "/Home" },
    { name: "Events", href: "/Events" },
    { name: "Workshop", href: "/Workshops" },
    { name: "Team", href: "/Team" },
    { name: "Sponsor", href: "/Sponsors" },
    { name: "Gallery", href: "/Gallery" }
  ];

  //hindi/sanskrit numeric characters
  const nums = ['०१', '०२', '०३', '०४', '०५', '०६'];

  const authIndex = navItems.length; // PROFILE / LOGIN pill index

  const [activeIndex, setActiveIndex] = useState(-1);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });
  const [open, setOpen] = useState(false);
  const itemsRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  //handling pill position and size
  const updatePill = () => {
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
  };

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => { setOpen(false); };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  //syncing activeIndex with current route
  useEffect(() => {
    if (!router.isReady) return;

    let index = navItems.findIndex(i => i.href === router.pathname);

    if (
      router.pathname === "/login" ||
      router.pathname === "/Dashboard" ||
      router.pathname === "/Admin"
    ) {
      index = authIndex;
    }

    setActiveIndex(index);
  }, [router.pathname, router.isReady]);

  //handle pill animation
  useEffect(() => {
    if (!mounted) return;
    updatePill();
  }, [activeIndex, mounted]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) { setOpen(false); }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => { requestAnimationFrame(updatePill); };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, mounted]);

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  //helper to handle navigation
  const handleNavigation = (e, href) => {
    e.preventDefault();
    router.push(href);
    setOpen(false);
  };

  return (
    <div className="flex justify-center">
      <nav className={`${className} fixed top-4 right-0 md:right-auto w-auto md:w-fit z-[50] flex bg-transparent backdrop-blur-md text-black rounded-l-2xl rounded-r-2xl border-3 border-[#897b4b] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15)]`}>
        <div className="px-4 py-3 flex items-center">

          {/* desktop menu */}
          <div className="hidden w-fit md:flex md:text-[0.67rem] items-center space-x-1 lg:space-x-4 xl:space-x-5 relative text-[0.75rem] lg:text-[0.9rem] xl:text-[1.1rem] uppercase tracking-wider">

            {/* logo + word art */}
            <div className="hidden md:flex relative z-10 items-center cursor-pointer select-none">
              <Image onClick={() => router.push("/")} src="/invictuslogo.svg" alt="Logo" width={70} height={50} priority
              className="w-[80px] sm:w-[10px] md:w-[50px] lg:w-[60px]  xl:w-[75px] h-auto object-contain mr-2"/>
            </div>

            {/* selected option pill */}
            {mounted && activeIndex !== -1 && (
              <div
                className="absolute h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-[#e0c465d2] to-[#937c2f] rounded-[0.8rem] border-2 border-[#8b7737] brightness-115 saturate-90 z-0"
                style={{
                  width: `${pillStyle.width}px`,
                  transform: `translateX(${pillStyle.left}px)`
                }}/>)}

            {/* nav items */}
            {navItems.map(({ name, href }, index) => (
              <a
                key={index}
                href={href}
                ref={(el) => (itemsRef.current[index] = el)}
                onClick={(e) => handleNavigation(e, href)}
                className={`
                  relative z-10 px-[0.3rem] lg:px-[0.45rem] xl:px-[0.7rem] lg:px-[0.5rem]
                  transition-colors duration-500
                  [font-family:'Orbitron',sans-serif] font-[800] whitespace-nowrap z-100
                  bg-gradient-to-b from-[#69644d] to-[#745548] bg-clip-text text-transparent brightness-105 saturate-115
                  ${activeIndex === index
                    ? "hover:bg-gradient-to-b from-[#FFFFFF] to-[#ffffff] "
                    : "hover:text-[#000000] hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"
                  }`}
              >
                {name}
              </a>
            ))}

            {/* PROFILE / LOGIN (PILL PARTICIPANT) */}
            <div className="border-l border-[#D4AF37]">
              <button
                ref={(el) => (itemsRef.current[authIndex] = el)}
                onClick={(e) => {
                  e.preventDefault();
                  if (user) {
                    router.push("/Dashboard");
                  } else if (isAdmin) {   
                    router.push("/Admin");
                  } else {
                    router.push("/login");
                  }
                }}
                className={`
                  relative z-10 ml-1 px-2 lg:px-[0.6rem] xl:px-[0.8rem] py-[0.3rem]
                  transition-colors duration-500 cursor-pointer
                  [font-family:'Orbitron',sans-serif] font-[800]  whitespace-nowrap
                  ${activeIndex === authIndex
                    ? "text-white"
                    : "bg-gradient-to-b from-[#69644d] to-[#745548] bg-clip-text text-transparent brightness-105 saturate-115"
                  }
                  ${activeIndex === authIndex
                    ? "hover:text-white"
                    : "hover:text-[#000000] hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"
                  }
                `}>
                {user || isAdmin ? "PROFILE" : "LOGIN"} 
              </button>
            </div>

            {/* LOGOUT (NOT PART OF PILL) */}
            {user && (
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="ml-2 p-2 transition-colors duration-300 rounded-md hover:bg-[#000000] group cursor-pointer"
                title="Logout">
                <LogOut size={20} strokeWidth={2.5} className="text-[#7f664c] group-hover:text-white transition-colors duration-300" />
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="ml-2 p-2 transition-colors duration-300 rounded-md hover:bg-[#D4AF37] group cursor-pointer"
                title="Logout">
                <LogOut size={20} strokeWidth={2.5} className="text-[#D4AF37] group-hover:text-white transition-colors duration-300" />
              </button>
            )}
          </div>

          {/* mobile menu btn */}
          <button
            className="md:hidden relative focus:outline-none drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]"
            onClick={() => setOpen(!open)}>
            <div className={`w-6 h-0.5 bg-[#7d5e5b] mb-1.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#583c3a] mb-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#9f716e] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* mobile menu overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-transparent backdrop-blur-xl z-[45]
        transform transition-transform duration-500 ease-in-out border-l-2 border-[#D4AF37]
        flex flex-col pt-32 px-10 space-y-8 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {navItems.map(({ name, href }, i) => (
          <button
            key={i}
            onClick={(e) => handleNavigation(e, href)}
            className={`
              text-left text-2xl uppercase tracking-[0.2em] font-bold
              [font-family:'Montserrat',sans-serif] transition-all duration-300
              ${activeIndex === i
                ? "text-[#c0895c] translate-x-4 drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]"
                : "text-white/40 hover:text-white hover:translate-x-2"
              }
            `}>
            <span className="text-s mr-4 text-[#D4AF37]/90">{nums[i]}</span>
            {name}
          </button>
        ))}

        {/* mobile profile / logout */}
        <div className="border-t border-[#D4AF37]/20 pt-4 flex justify-between space-x-20">
          <button
            onClick={() => {
              if (user) router.push("/Dashboard");
              else if (isAdmin) router.push("/Admin");
              else router.push("/login");
              setOpen(false);
            }}
            className={`
            text-left text-2xl uppercase tracking-[0.2em] font-bold
            [font-family:'Montserrat',sans-serif] transition-all duration-300
            ${activeIndex === authIndex
              ? "text-[#D4AF37] translate-x-4 drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]"
              : "text-white/40 hover:text-white hover:translate-x-2"
            }
          `}>
            {user || isAdmin ? "PROFILE" : "LOGIN"}
          </button>

          {user && (
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="transition-colors duration-300 rounded-md hover:bg-[#8e8159] group"
              title="Logout">
              <LogOut size={30} strokeWidth={2.5} className="text-[#ca8647]" />
            </button>
          )}

          {isAdmin && ( 
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="transition-colors duration-300 rounded-md hover:bg-[#D4AF37] group"
              title="Logout">
              <LogOut size={30} strokeWidth={2.5} className="text-[#D4AF37]" />
            </button>
          )}
        </div>

        {/* menu bottom wordart */}
        <div className="border-t border-[#D4AF37]/20 pt-6 flex justify-center">
          <Image src="/wordArt.svg" alt="Invictus 2026" width={400} height={70} priority
          className="object-contain drop-shadow-[0_0_1.2rem_rgba(212,175,55,0.6)]"/>
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
  );
}