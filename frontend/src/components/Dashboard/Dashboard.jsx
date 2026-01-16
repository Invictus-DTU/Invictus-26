import React, { useState, useEffect, useContext } from "react";
import MapPreview from "./MapPreview";
import { DTU_LOCATIONS } from "./locations";
import MapModal from "./MapModal";
import SnackBar from "@/utils/snackBar";

export default function Dashboard({ setLotusClass, setLotusStyle }) {
  const [activeTab, setActiveTab] = useState("EVENTS");
  const [mapOpen, setMapOpen] = useState(false);
  const [mapDestination, setMapDestination] = useState(DTU_LOCATIONS.DTU);
  const [show, setShow] = useState(true);
  const SNACKBAR_TIMEOUT = 5000;

    useEffect(() => {
      if (typeof window === "undefined") return;

    const neverBar = localStorage.getItem("NeverShow")
    if(neverBar){
      setShow(false);
      return;
    }

      const shown = localStorage.getItem("SnackbarShownDashboard");
      if(!shown){
        setShow(true);
        return;
      }

      const lastShown = Number(shown);

      if (Date.now() - lastShown < SNACKBAR_TIMEOUT || localStorage.getItem("ModelSeen") ) {
        setShow(false);
      }
    }, []);

    const handleClose = () => {
      setShow(false);
      localStorage.setItem("SnackbarShownDashboard",  Date.now().toString());
    }

  /* 🌸 POSITION LOTUS NEXT TO WELCOME TEXT */
  useEffect(() => {
    if (!setLotusClass || !setLotusStyle) return;

    const anchor = document.querySelector("[data-lotus-anchor]");
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
      w-[80px] sm:w-[100px] md:w-[130px]
      opacity-80
      transition-all duration-700 ease-in-out
    `);
  }, [setLotusClass, setLotusStyle]);

  return (
    <>
    <div className="relative mt-20 font-montserrat text-[#7c6a3c] pt-28 pb-16 px-4 md:px-10">
      
      <div className="mt-4 hidden lg:block
          absolute top-14 right-8
          w-[400px] h-[240px]
          bg-[#f9f6ef]/70
          border-4 border-[#b19965]
          rounded-xl z-10"
          style={{ boxShadow: "0 2px 12px rgba(191,161,74,0.12)" }}
          >
        <MapPreview center={DTU_LOCATIONS.DTU} />

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto">

        {/* WELCOME SECTION */}
        <div className="mt-8">

          <div className="relative inline-block">
            <h1
              className="
                text-4xl sm:text-4xl md:text-6xl
                invictus-heading
              "
            >
              WELCOME BACK, USER
            </h1>

            {/* 🌸 LOTUS ANCHOR */}
            <span
              data-lotus-anchor
              className="
                absolute
                right-[9.5rem] md:right-[27.5rem]
                top-40 -translate-y-1/2
                w-0 h-0
              "
            />
          </div>

          <p
            className="
              mt-4
              text-lg sm:text-xl md:text-2xl
              invictus-subheading
            "
          >
            Your journey with Invictus — a path to innovation continues.
          </p>

          <button
            type="button"
            onClick={() => {
              setMapDestination(DTU_LOCATIONS.DTU);
              setMapOpen(true);
            }}
            className="
              mt-6
              bg-[#b19965] text-white font-semibold
              rounded-lg px-5 py-2
              flex items-center gap-2
              border-2 border-[#b19965]
              transition hover:bg-[#d4af37] active:scale-95
            "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            Open Map
          </button>
        </div>

        {/* DASHBOARD CARD */}
        <div
          className="
            mt-12
            rounded-2xl p-4 sm:p-6
            bg-white/80
            border-[3px] border-[#b19965]
          "
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <span className="font-bold text-[#b19965] text-lg">HOME</span>
            <button
              className="
                text-[#7A6C45] font-bold uppercase tracking-widest rounded-lg
                px-4 py-1
                border-2 border-[#b19965]
                transition hover:bg-[#ffffff] active:scale-95
              "
            >
              YOUR {activeTab}
            </button>
          </div>

          {/* TABS */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {["EVENTS", "WORKSHOPS"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  rounded-lg px-3 py-1 font-semibold border-2 border-[#b19965]
                  transition
                  ${
                    activeTab === tab
                      ? "bg-[#b19965] text-white"
                      : "bg-[#e7d7b1] text-[#7c6a3c]"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* EVENT LIST */}
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-4
                border rounded-xl p-4 mb-4
                bg-[#f9f6ef]
              "
              style={{ border: "2px solid #e7d7b1" }}
            >
              <div>
                <div className="font-bold mb-2">EVENT NAME</div>
                <div className="flex gap-2 flex-wrap">
                  <button className="bg-[#b19965] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#b19965] transition hover:bg-[#d4af37] active:scale-95"   onClick={() => {
                    setMapDestination(DTU_LOCATIONS.SPS_18);
                    setMapOpen(true);
                  }}>
                    VIEW VENUE ON MAP
                  </button>
                  <button className="bg-[#b19965] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#b19965] transition hover:bg-[#d4af37] active:scale-95">
                    EDIT TEAM {/* registration link redirect */}
                  </button>
                </div>
              </div>
              <div className="font-semibold text-[#b19965]">Team Name</div>
             <div className="font-semibold text-[#b19965]">Team Member</div>   {/*member or leader will fetch from backend three things to fetch here event/workshops name user has registered for there member status and unstop registration link*/}
            </div>
          ))}
        </div>
      </div>
    </div>

              <MapModal
      open={mapOpen}
      onClose={() => setMapOpen(false)}
      destination={mapDestination}
    />

          {show && (
            <SnackBar
              text="Please log in with the email used on Unstop to get your Events/Workshops"
              actionText="I have"
              onAction={() => {
                localStorage.setItem("NeverShow", "true");
                handleClose();
              }}
              onClose={() => handleClose()}
            />
          )}
    </>
  );
}
