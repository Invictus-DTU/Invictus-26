import React, { useState, useEffect, useContext, use } from "react";
import MapPreview from "./MapPreview";
import { DTU_LOCATIONS } from "./locations";
import MapModal from "./MapModal";
import SnackBar from "@/utils/snackBar";
import { AuthContext } from "@/contexts/AuthContext";
import Drawer from "./Drawer"
import { motion } from "framer-motion";

import Button from "@/utils/Button"

export default function Dashboard({ setLotusClass, setLotusStyle }) {
  const [activeTab, setActiveTab] = useState("EVENTS");
  const [mapOpen, setMapOpen] = useState(false);
  const [mapDestination, setMapDestination] = useState(DTU_LOCATIONS.DTU);
  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3004';
  const { fetchUserEvents, loading, user , setLoading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [singleEvent, setSingleEvent] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const SNACKBAR_TIMEOUT_1 = Number(process.env.NEXT_PUBLIC_SNACKBAR_TIMEOUT_ONE);

  function openDrawer(event) {
    setSingleEvent(event);
    setDrawerOpen(!drawerOpen);
  }

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

      if (Date.now() - lastShown < SNACKBAR_TIMEOUT_1 ) {
        setShow(false);
      }
    }, []);

    const handleClose = () => {
      setShow(false);
      localStorage.setItem("SnackbarShownDashboard",  Date.now().toString());
    }

    useEffect(() => {
       const fetchData = async () => {
        setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch logged-in user
        const userRes = await fetch(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error("Failed to fetch user");

        const userData = await userRes.json();
        const data = await fetchUserEvents(token, userData.email);
        // console.log(data);
        setEvents(data);

        // Fetch all workshops
        const workshopsRes = await fetch(`${API_BASE_URL}/events`);
        if (workshopsRes.ok) {
          const allEvents = await workshopsRes.json();
          const workshopsList = allEvents.filter(ev => ev.isWorkshop);
          setWorkshops(workshopsList);
        }

      } catch (error) {
        console.error("Error fetching user events:", error);
        setEvents([]);
        setError(true);
      }finally{
        setLoading(false);
      }
    }

    fetchData();
    }, []);

    useEffect(() => {
  // console.log("Events state updated:", events);
}, [events]);

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
      position: "absolute",
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
      
     <motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="mt-4 hidden lg:block absolute top-14 right-8 w-[400px] h-[240px] bg-[#f9f6ef]/70 border-4 border-[#b19965] rounded-xl z-10"
  style={{ boxShadow: "0 2px 12px rgba(191,161,74,0.12)" }}
>
        <MapPreview center={DTU_LOCATIONS.DTU} />

      </motion.div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto">

        {/* WELCOME SECTION */}
       <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="mt-8"
>

          <div className="relative inline-block">
          <motion.h1
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 0.15, duration: 0.5 }}
  className="text-4xl sm:text-4xl md:text-6xl invictus-heading"
>
 


              WELCOME BACK, {user ? user.split(" ")[0].toUpperCase() : "USER"}
          </motion.h1>

            {/* 🌸 LOTUS ANCHOR */}
            <span
              data-lotus-anchor
              className="
                absolute
                right-[9.5rem] md:right-[20.5rem]
                top-40 -translate-y-1/2
                w-0 h-0
              "
            />
          </div>

         <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.25, duration: 0.6 }}
  className="mt-4 text-lg sm:text-xl md:text-2xl invictus-subheading"
>
            Your journey with Invictus — a path to innovation continues.
          </motion.p>

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
              invictus-text
              flex items-center gap-2
              border-2 border-[#b19965]
              transition hover:bg-[#6b6140] active:scale-95
            "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            Open Map
          </button>
        </motion.div>

        {/* DASHBOARD CARD */}
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.35, duration: 0.7 }}
  className="mt-12 rounded-2xl p-4 sm:p-6 bg-white/80 border-[3px] border-[#b19965]"
>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <span className="invictus-text font-bold text-lg">HOME</span>
            <Button></Button>
            <button
              onClick={() => setActiveTab(activeTab === "EVENTS" ? "WORKSHOPS" : "EVENTS")}
              className="
                invictus-text font-bold uppercase tracking-widest rounded-lg
                px-4 py-1
                border-2 border-[#b19965]
                transition hover:bg-[#ffffff] active:scale-95
              "
            >
              YOUR {activeTab}
            </button>
          </div>

          {activeTab === "EVENTS" && events.length === 0 && (
            <div
              className="
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-4
                border rounded-xl p-4 mb-4
                bg-[#f9f6ef] opacity-50
              "
              style={{ border: "2px solid #e7d7b1" }}
            >
              <div>
                <div className="invictus-text font-bold mb-2 opacity-50">No events registered</div>
                <div className="flex gap-2 flex-wrap">
                  <button disabled className="bg-gray-300 invictus-text text-gray-500 rounded-lg px-4 py-1 font-semibold border-2 border-gray-300 cursor-not-allowed">
                    VIEW VENUE ON MAP
                  </button>
                  <button disabled className="bg-gray-300 invictus-text text-gray-500 rounded-lg px-4 py-1 font-semibold border-2 border-gray-300 cursor-not-allowed">
                    EDIT TEAM
                  </button>
                </div>
              </div>
              <div className="invictus-text font-semibold opacity-50">—</div>
              <div className="invictus-text font-semibold opacity-50">—</div>
            </div>
          )}

          {activeTab === "WORKSHOPS" && workshops.length === 0 && (
            <div
              className="
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-4
                border rounded-xl p-4 mb-4
                bg-[#f9f6ef] opacity-50
              "
              style={{ border: "2px solid #e7d7b1" }}
            >
              <div>
                <div className="invictus-text font-bold mb-2 opacity-50">No workshops available</div>
                <div className="flex gap-2 flex-wrap">
                  <button disabled className="bg-gray-300 invictus-text text-gray-500 rounded-lg px-4 py-1 font-semibold border-2 border-gray-300 cursor-not-allowed">
                    VIEW VENUE ON MAP
                  </button>
                </div>
              </div>
              <div className="invictus-text font-semibold opacity-50">—</div>
              <div className="invictus-text font-semibold opacity-50">—</div>
            </div>
          )}

          {/* EVENT LIST */}
          {activeTab === "EVENTS" && events.map((ev, idx) => (
          <motion.div
  key={idx}
  variants={{
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }}
  whileHover={{ scale: 1.01 }}
  transition={{ duration: 0.3 }}
  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4 mb-4 bg-[#f9f6ef]"
  style={{ border: "2px solid #e7d7b1" }}
>
              <div>
                <div className="invictus-text font-bold uppercase mb-2">{ev.event.name}</div>
                <div className="flex gap-2 invictus-text flex-wrap">
                  <button className="bg-[#b19965] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#6b6140] transition hover:bg-[#6b6140] active:scale-95"   onClick={() => {
                    if (
                      ev.event.latitude == null ||
                      ev.event.longitude == null
                    ) {
                      alert("Venue location not available");
                      return;
                    }

                    setMapDestination({
                      name: ev.event.name,
                      lat: Number(ev.event.latitude),
                      lng: Number(ev.event.longitude),
                    });
                    setMapOpen(true);
                  }}>
                    VIEW VENUE ON MAP
                  </button>
                  <button onClick={() => openDrawer(ev)} className="bg-[#b19965] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#b19965] transition hover:bg-[#6b6140] active:scale-95">
                    EDIT TEAM {/* registration link redirect */}
                  </button>
                </div>
              </div>
              <div className="invictus-text font-semibold">{ev.teamName == "" ? "Solo Event" : ev.teamName}</div>
             <div className="invictus-text font-semibold">{ev.attendace === false ? "Attended" : "Yet to Attend"}</div>   {/*member or leader will fetch from backend three things to fetch here event/workshops name user has registered for there member status and unstop registration link*/}

            </motion.div>
          
          ))}

          {/* WORKSHOPS LIST */}
          {activeTab === "WORKSHOPS" && workshops.map((workshop, idx) => (
          <motion.div
  key={idx}
  variants={{
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }}
  whileHover={{ scale: 1.01 }}
  transition={{ duration: 0.3 }}
  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4 mb-4 bg-[#f9f6ef]"
  style={{ border: "2px solid #e7d7b1" }}
>
              <div>
                <div className="invictus-text font-bold uppercase mb-2">{workshop.name}</div>
                <div className="flex gap-2 invictus-text flex-wrap">
                  <button className="bg-[#b19965] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#6b6140] transition hover:bg-[#6b6140] active:scale-95"   onClick={() => {
                    if (
                      workshop.latitude == null ||
                      workshop.longitude == null
                    ) {
                      alert("Venue location not available");
                      return;
                    }

                    setMapDestination({
                      name: workshop.name,
                      lat: Number(workshop.latitude),
                      lng: Number(workshop.longitude),
                    });
                    setMapOpen(true);
                  }}>
                    VIEW VENUE ON MAP
                  </button>
                </div>
              </div>
              <div className="invictus-text font-semibold">{workshop.date ? new Date(workshop.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : "TBA"}</div>
             <div className="invictus-text font-semibold">{workshop.mode || "Mode TBA"}</div>

            </motion.div>
          
          ))}
        </motion.div>
      </div>
    </div>

       {drawerOpen && (
          <Drawer event={singleEvent} onClose={openDrawer} />
        )}

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