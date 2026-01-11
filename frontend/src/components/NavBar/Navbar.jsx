import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

/* ---------- DASHBOARD + LOGOUT (STYLED) ---------- */
const DashboardOption = ({ onDashboard, onLogout, active }) => {
  return (
    <div className="flex items-center gap-4 pl-5 border-l border-[#D4AF37]">
      {/* Dashboard */}
      <button
        onClick={onDashboard}
        className={`
          flex items-center gap-2 uppercase tracking-wider font-[600]
          transition-all duration-300
          ${active
            ? "text-[#c6aa57]"
            : "bg-gradient-to-b from-[#c6aa58] to-[#6E5B1D] bg-clip-text text-transparent hover:text-[#D4AF37]"
          }
        `}
      >
        <img src="/user.svg" alt="User" className="w-4 h-4" />
        &nbsp; Profile
      </button>

      {/* Divider */}
      <span className="h-4 w-px bg-[#D4AF37]/40" />

      {/* Logout */}
      <button
        onClick={onLogout}
        className="
          uppercase tracking-wider font-[600]
          text-[#D4AF37]/70
          hover:text-red-500
          transition-all duration-300
        "
      >
        LOGOUT
      </button>
    </div>
  );
};

export default function Navbar() {
  const { user, logout, authLoading } = useContext(AuthContext);
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/Events" },
    { name: "Workshop", href: "/Workshops" },
    { name: "Team", href: "/Team" },
    { name: "Sponsor", href: "/Sponsors" },
    { name: "Gallery", href: "/Gallery" },
  ];

  const nums = ["०१", "०२", "०३", "०४", "०५", "०६"];

  const [activeIndex, setActiveIndex] = useState(-1);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });
  const [open, setOpen] = useState(false);
  const itemsRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true) , []);

  useEffect(() => {

    if (!router.isReady) return;
    const index = navItems.findIndex(i => i.href === router.pathname);
    setActiveIndex(index);
  }, [router.pathname, router.isReady]);

  useEffect(() => {
    if (!mounted || activeIndex === -1) return;
    const el = itemsRef.current[activeIndex];
    if (el) {
      setPillStyle({ width: el.offsetWidth, left: el.offsetLeft });
    }
  }, [activeIndex, mounted]);

  const handleNavigation = (href) => {
    router.replace(href );
    setOpen(false);
  };

  return (
    <div className="flex justify-center">
      <nav className="
        fixed top-4 right-0 mr-10 w-[85vw] z-[50]
        bg-transparent backdrop-blur-md
        rounded-l-4xl rounded-r-2xl
        border-3 border-[#D4AF37]
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15)]
      ">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex text-[#D4AF37] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="font-bold uppercase text-xl tracking-tighter">
              Logo(PH)
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="
            hidden md:flex relative items-center
            uppercase tracking-wider
            md:text-[0.7rem] lg:text-[0.9rem] xl:text-[1.1rem]
          ">
            {mounted && activeIndex !== -1 && (
              <div
                className="
                  absolute h-full z-0
                  bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D]
                  rounded-[0.8rem] border-2 border-[#D4AF37]
                  transition-all duration-300
                "
                style={{
                  width: pillStyle.width,
                  transform: `translateX(${pillStyle.left}px)`,
                }}
              />
            )}

            {navItems.map(({ name, href }, i) => (
              <button
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                onClick={() => handleNavigation(href)}
                className={`
                  relative z-10 px-3 py-[0.3rem]
                  font-[600] transition-all duration-300
                  ${activeIndex === i
                    ? "text-white"
                    : "bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent hover:text-[#D4AF37]"
                  }
                `}
              >
                {name}
              </button>
            ))}

            {/* AUTH AREA */}
            {user ? (
              <DashboardOption
                active={router.pathname === "/Dashboard"}
                onDashboard={() => handleNavigation("/Dashboard")}
                onLogout={() => {
                  logout();
                  router.replace("/login");
                }}
              />
            ) : (
              <button
                onClick={() => handleNavigation("/login")}
                className="
                  pl-5 border-l border-[#D4AF37]
                  font-[600] uppercase tracking-wider
                  bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D]
                  bg-clip-text text-transparent
                  hover:text-[#D4AF37]
                "
              >
                LOGIN
              </button>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-full sm:w-[400px]
          backdrop-blur-xl z-[45]
          transform transition-transform duration-500
          border-l-2 border-[#D4AF37]
          pt-32 px-10
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {navItems.map(({ name, href }, i) => (
          <button
            key={i}
            onClick={() => handleNavigation(href)}
            className="text-left text-2xl font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white mb-6"
          >
            <span className="mr-4 text-[#D4AF37]">{nums[i]}</span>
            {name}
          </button>
        ))}

        <div className="border-t border-[#D4AF37]/30 pt-6">
          {user ? (
            <DashboardOption
              onDashboard={() => handleNavigation("/Dashboard")}
              onLogout={() => {
                logout();
                router.replace("/login");
              }}
            />
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="text-white text-2xl uppercase"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[40]"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
