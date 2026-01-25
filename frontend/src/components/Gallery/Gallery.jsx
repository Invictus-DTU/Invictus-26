"use client";

import { useState, useEffect } from "react";
import {
  SwapyItem,
  SwapyLayout,
  SwapySlot,
} from "@/components/Gallery/ui/swapy";

/* ---------------- IMAGE CARD ---------------- */

function ImageCard({ src }) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border-[3px] border-[#d9b85c] shadow-[6px_6px_0_rgba(120,100,40,0.45)]">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}

/* ---------------- CATEGORY IMAGES ---------------- */

const IMAGES = {
  FUN: Array.from({ length: 9 }, (_, i) => `/Gallery-pics/cat1/cat1_${i + 1}.jpeg`),
  CULTURAL: Array.from({ length: 9 }, (_, i) => `/Gallery-pics/cat2/cat2_${i + 1}.jpeg`),
  WORKSHOP: Array.from({ length: 9 }, (_, i) => `/Gallery-pics/cat3/cat3_${i + 1}.jpeg`),
};

/* ---------------- GRID CONFIG ---------------- */

const GRID_CLASSES = [
  "lg:col-span-5 sm:col-span-12 col-span-12 h-[22rem]",
  "lg:col-span-4 sm:col-span-6 col-span-12 h-[18rem]",
  "lg:col-span-3 sm:col-span-6 col-span-12 h-[22rem]",

  // ROW 2 
  "lg:col-span-3 sm:col-span-6 col-span-12 h-[25rem]",
  "lg:col-span-6 sm:col-span-12 col-span-12 h-[26rem]",
  "lg:col-span-3 sm:col-span-6 col-span-12 h-[24rem]",

  // ROW 3
  "lg:col-span-4 sm:col-span-6 col-span-12 h-[21rem]",
  "lg:col-span-4 sm:col-span-6 col-span-12 h-[21rem]",
  "lg:col-span-4 sm:col-span-12 col-span-12 h-[24rem]",
];

/* ---------------- COMPONENT ---------------- */

export default function Gallery({ setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {
  const [category, setCategory] = useState("FUN");

  /* 🌸 LOTUS POSITION — RELATIVE TO GALLERY HEADING */
  useEffect(() => {
    if (!setLotusClass || !setLotusStyle) return;

    const anchor = document.querySelector("[data-gallery-lotus-anchor]");
    if (!anchor) return;

    const parent = anchor.offsetParent;
    if (!parent) return;

    const anchorRect = anchor.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    setLotusStyle({
      left: anchorRect.left - parentRect.left + anchorRect.width / 2,
      top: anchorRect.top - parentRect.top + anchorRect.height / 2,
      transform: "translate(-50%, -50%)",
    });

    setLotusClass(`
      absolute
      w-[90px] md:w-[120px] lg:w-[150px]
      opacity-80
      transition-all duration-700 ease-in-out
    `);
  }, [setLotusClass, setLotusStyle]);

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

  return (
    <div className="relative w-full bg-transparent">
      <div className="max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div
          className="
            flex flex-col md:flex-row justify-between items-start
            gap-10
            mt-[90px] md:mt-[120px]
            mb-10
            px-5 md:px-10
            pt-5
          "
        >
          {/* TITLE BLOCK */}
          <div className="max-w-full md:max-w-[70%] relative">
            <h1
              className="
                text-[48px] md:text-[72px] lg:text-[96px]
                invictus-heading
              "
            >
              GALLERY
            </h1>

            {/* 🌸 LOTUS ANCHOR */}
            <span
              data-gallery-lotus-anchor
              className="
                absolute
                right-[2rem] md:right-[3.5rem] lg:right-[4.5rem]
                top-5/6
                -translate-y-1/2
                w-0 h-0
              "
            />

            <p
              className="
                mt-4 md:mt-[18px]
                invictus-subheading
                text-[20px] md:text-[24px]
              "
            >
              Moments that capture the energy, innovation, and unforgettable
              experiences of Invictus.
            </p>
          </div>

          {/* CATEGORY BOX */}
          <div
            className="
              w-full md:w-[290px] mt-5
              bg-[#f6f2d9]
              border-[3px] border-[#d9b85c]
              rounded-[10px]
              px-4 pt-3 pb-4
              shadow-[6px_6px_0_rgba(120,100,40,0.45)]
            "
          >
            <div className="flex justify-between items-center">
              <span className="font-[Montserrat] text-[18px] tracking-[2px] font-semibold text-[#8f8457]">
                VIEW GLANCES
              </span>
              <span className="text-[16px] font-bold text-[#8f8457]">⌄</span>
            </div>

            <div className="h-[2px] bg-[#d9b85c] my-[10px]" />

            <div className="flex flex-col gap-2.5">
              {["FUN", "CULTURAL", "WORKSHOP"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`
                    text-left text-[16px] tracking-[1px]
                    px-3 py-1.5 rounded-md transition-all
                    ${
                      category === cat
                        ? "bg-[linear-gradient(180deg,rgba(225,200,125,0.95),rgba(190,160,80,0.95))] text-[#6d5b1f] font-semibold"
                        : "text-[#9b8a3d]"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="px-5 md:px-8">
          <SwapyLayout id="swapy" className="w-full" config={{ swapMode: "hover" }}>
            <div className="grid w-full grid-cols-12 gap-6 py-6">
              {IMAGES[category].map((src, index) => (
                <SwapySlot
                  key={index}
                  id={`slot-${index}`}
                  className={GRID_CLASSES[index]}
                >
                  <SwapyItem id={`item-${index}`} className="w-full h-full">
                    <ImageCard src={src} />
                  </SwapyItem>
                </SwapySlot>
              ))}
            </div>
          </SwapyLayout>
        </div>
      </div>
    </div>
  );
}
