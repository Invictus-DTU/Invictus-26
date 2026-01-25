"use client";

import React, { useEffect } from "react";

const Footer = ({}) => {

  return (
    <footer className="relative w-full border-t-[3px] border-[#D4AF37] shadow-[0_-4px_20px_rgba(212,175,55,0.15)] font-sans text-[#423212] overflow-hidden">

      {/* ---------------- BACKGROUND LAYERS ---------------- */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('/backdrop.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#68665f] via-[#FCEEB5] to-[#b4a97d] opacity-95" />

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-6 md:py-4">

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">

          {/* ---------- LEFT : LOGO ---------- */}
          <div className="flex justify-center md:justify-start">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-[#D4AF37]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="/invictuslogo.svg"
                alt="Invictus Logo"
                className="relative h-14 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
              />
            </div>
            <div className=" relative group my-auto ml-4">
              <p onClick={() => {window.open('https://docs.google.com/document/d/1DcqBkRaoUgag0jVh_zRzh5Twr4LGYZIucaaO2ge_e5M/edit?tab=t.0','_blank')}} className=" cursor-pointer opacity-75 hover:opacity-100 underline">privacy policy</p>
            </div>
          </div>

          {/* ---------- CENTER : CREDITS (TRUE CENTER) ---------- */}
          <div className="flex flex-col items-center text-center">
            <p className="text-sm md:text-[15px] font-medium tracking-wide text-[#6D5627] leading-tight">
              Designed & Developed with
              <span className="text-[#C0392B] mx-1.5 text-lg inline-block">❤</span>
              by
            </p>
            <p className="font-bold text-lg tracking-[0.12em] uppercase bg-gradient-to-r from-[#8B6E28] to-[#5C450E] bg-clip-text text-transparent mt-1">
              Invictus Team
            </p>
          </div>

          {/* ---------- RIGHT : SOCIALS & CONTACT ---------- */}
          <div className="flex flex-col items-center md:items-end gap-3">

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a
                href="https://linkedin.com/company/invictus-dtu"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#5C450E] hover:text-[#0077b5] transition-all duration-300"
              >
                <img
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  className="w-5 h-5 opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
                <span className="text-sm font-semibold hidden lg:block opacity-80 group-hover:opacity-100">
                  Invictus DTU
                </span>
              </a>

              <span className="hidden lg:block w-1 h-1 bg-[#D4AF37] rounded-full" />

              <a
                href="https://instagram.com/invictus_dtu"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[#5C450E] hover:text-[#E1306C] transition-all duration-300"
              >
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  className="w-5 h-5 opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all"
                />
                <span className="text-sm font-semibold hidden lg:block opacity-80 group-hover:opacity-100">
                  @invictus_dtu
                </span>
              </a>
            </div>

            {/* Help Pill */}
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm bg-white/60 border border-[#D4AF37]/30 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              <span className="font-bold text-[#8B6E28]">Help:</span>
              <span className="font-[sans] text-xs">Jahan Sharma (Website-Lead)</span>
              <span className="hidden md:inline text-[#D4AF37]">•</span>
              <a
                href="mailto:zahansharma123@gmail.com"
                className="font-semibold text-[#5C450E] hover:text-[#C0392B] underline decoration-[#D4AF37]/40 underline-offset-2 transition-colors"
              >
                zahansharma123@gmail.com
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
