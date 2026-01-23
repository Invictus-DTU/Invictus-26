import React, { useState, useRef, useEffect, useContext } from 'react'
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

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
      <nav className={`${className} fixed top-4 right-0 w-auto md:w-fit z-[50] flex bg-transparent backdrop-blur-md text-black rounded-l-2xl rounded-r-2xl md:rounded-l-4xl border-3 border-[#D4AF37] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15)]`}>
        <div className="px-4 py-3 flex items-center">

          {/* desktop menu */}
          <div className="hidden w-fit md:flex md:text-[0.67rem] items-center space-x-1 lg:space-x-4 xl:space-x-5 relative text-[0.75rem] lg:text-[0.9rem] xl:text-[1.1rem] uppercase tracking-wider">

            {/* selected option pill */}
            {mounted && activeIndex !== -1 && (
              <div
                className="absolute h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] rounded-[0.8rem] border-2 border-[#D4AF37] brightness-115 saturate-90 z-0"
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
                  relative z-10 px-[0.3rem] lg:px-[0.45rem] xl:px-[0.7rem] xl:py-[0.3rem] lg:px-[0.5rem] py-[0.1rem]
                  transition-colors duration-300
                  [font-family:'Montserrat',sans-serif] font-[600] whitespace-nowrap
                  ${activeIndex === index
                    ? "text-white"
                    : "bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent brightness-105 saturate-115"
                  }
                  ${activeIndex === index
                    ? "hover:text-white"
                    : "hover:text-[#D4AF37] hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"
                  }
                `}
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
                  transition-colors duration-300 cursor-pointer
                  [font-family:'Montserrat',sans-serif] font-[600] whitespace-nowrap
                  ${activeIndex === authIndex
                    ? "text-white"
                    : "bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent brightness-105 saturate-115"
                  }
                  ${activeIndex === authIndex
                    ? "hover:text-white"
                    : "hover:text-[#D4AF37] hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"
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
                className="ml-2 p-2 transition-colors duration-300 rounded-md hover:bg-[#D4AF37] group cursor-pointer"
                title="Logout">
                <LogOut size={20} strokeWidth={2.5} className="text-[#D4AF37] group-hover:text-white transition-colors duration-300" />
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
            <div className={`w-6 h-0.5 bg-[#D4AF37] mb-1.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#D4AF37] mb-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
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
                ? "text-[#D4AF37] translate-x-4 drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]"
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
              className="transition-colors duration-300 rounded-md hover:bg-[#D4AF37] group"
              title="Logout">
              <LogOut size={30} strokeWidth={2.5} className="text-[#D4AF37]" />
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

      {/* menu bottom text */}
        <div className=" border-t border-[#D4AF37]/20 pt-4">
            <div className="flex text-[1.5rem] md:text-[1.2rem] items-center space-x-3 md:space-x-4">
          <div className="flex flex-col border-r border-[#D4AF37] pr-2 md:pr-3 leading-tight">
            <span className="invictus-heading font-bold uppercase tracking-[0.15em]">Invictus</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="invictus-heading font-bold uppercase tracking-[0.1em]">2026</span>
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
  );
}