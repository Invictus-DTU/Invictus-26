import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = router.pathname;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/Events" },
    { name: "Workshop", href: "/Workshops" },
    { name: "Team", href: "/Team" },
    { name: "Sponsor", href: "/Sponsors" },
    { name: "Gallery", href: "/Gallery" }
  ];

  const nums = ["०१", "०२", "०३", "०४", "०५", "०६", "०७"];

  const [open, setOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });
  const itemsRef = useRef([]);

  useEffect(() => {
    const index = navItems.findIndex(i => i.href === pathname);
    const el = itemsRef.current[index];
    if (el) {
      setPillStyle({
        width: el.offsetWidth,
        left: el.offsetLeft
      });
    }
  }, [pathname]);

  return (
    <div className="flex justify-center ">
      <nav className="fixed top-4 right-0 w-[85vw] z-50 bg-transparent backdrop-blur-md text-black 
        rounded-l-4xl rounded-r-2xl border-3 border-[#D4AF37]
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15)]"
        >

        <div className="w-full py-3 flex justify-around items-center">

          {/* Logo */}
          <div className="flex text-[#D4AF37] items-center">
            <div className="flex flex-col border-r border-[#D4AF37] pr-4 leading-tight">
              <span className="font-bold text-xl uppercase tracking-tighter">
                LOGO
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4 xl:space-x-6 relative uppercase tracking-wider">

            <div
              className="absolute h-full transition-all duration-300 ease-in-out 
              bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D]
              rounded-[0.8rem] border-2 border-[#D4AF37] z-0"
              style={{
                width: pillStyle.width,
                transform: `translateX(${pillStyle.left}px)`
              }}
            />

            {navItems.map(({ name, href }, i) => (
              <a
                key={href}
                ref={el => (itemsRef.current[i] = el)}
                href={href}
                onClick={e => {
                  e.preventDefault();
                  router.push(href);
                }}
                className={`relative z-10 px-2 lg:px-[0.6rem] xl:px-[0.8rem] py-[0.3rem]
                  font-semibold whitespace-nowrap transition-colors
                  ${pathname === href
                    ? "text-white"
                    : "bg-linear-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent hover:text-[#D4AF37] hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"
                  }`}
              >
                {name}
              </a>
            ))}
          </div>

          {/* Desktop Login / User */}
          <div className="hidden md:block">
            {user ? (
              <button onClick={logout} className="text-[#D4AF37] font-semibold">
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="font-semibold bg-linear-to-b from-[#D4AF37] to-[#6E5B1D] 
                bg-clip-text text-transparent hover:cursor-pointer hover:drop-shadow-[0_0_1rem_rgba(212,175,55,0.8)]"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden drop-shadow-[0_0_0.5rem_rgba(212,175,55,1)]"
            onClick={() => setOpen(!open)}
          >
            <div className={`w-6 h-0.5 bg-[#D4AF37] mb-1.5 ${open && "rotate-45 translate-y-2"}`} />
            <div className={`w-6 h-0.5 bg-[#D4AF37] mb-1.5 ${open && "opacity-0"}`} />
            <div className={`w-6 h-0.5 bg-[#D4AF37] ${open && "-rotate-45 -translate-y-2"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[400px] bg-transparent backdrop-blur-xl z-[45]
        border-l-2 border-[#D4AF37] flex flex-col pt-32 px-10 space-y-8
        transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {navItems.map(({ name, href }, i) => (
          <button
            key={href}
            onClick={() => {
              setOpen(false);
              router.push(href);
            }}
            className={`text-left text-2xl uppercase tracking-[0.2em] font-bold transition-all
              ${pathname === href
                ? "text-[#D4AF37] translate-x-4"
                : "text-white/40 hover:text-white hover:translate-x-2"
              }`}
          >
            <span className="mr-4 text-[#D4AF37]/90">{nums[i]}</span>
            {name}
          </button>
        ))}

        {/* Mobile Login / User */}
        <div className="pt-10 border-t border-[#D4AF37]/20">
          {user ? (
            <button onClick={logout} className="text-[#D4AF37] font-semibold">
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="text-[#D4AF37] font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[40] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
