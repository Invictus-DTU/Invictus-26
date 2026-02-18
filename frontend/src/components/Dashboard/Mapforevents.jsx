import React, { useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const DTU_CENTER = { lat: 28.7501, lng: 77.1177 };
const DEFAULT_TILT = 67.5;
const DEFAULT_HEADING = 0;
const DEFAULT_ZOOM = 18;

// --- ICONS ---
const ICONS = {
  EVENT: {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#FFD700", 
    fillOpacity: 1,
    strokeWeight: 1.5,
    strokeColor: "#000",
    scale: 2,
    anchor: { x: 12, y: 22 },
  },
  WORKSHOP: {
    path: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z",
    fillColor: "#00BFFF",
    fillOpacity: 1,
    strokeWeight: 1.5,
    strokeColor: "#000",
    scale: 1.5,
    anchor: { x: 12, y: 12 },
  },
  USER: {
    path: "M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z",
    scale: 0.7, 
    fillColor: "#4285F4",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
    anchor: { x: 12, y: 12 },
  },
};

export default function Events3DMapModal({ open, onClose, mapId }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const clusterRef = useRef(null);

  // Navigation & Logic Refs
  const directionsRendererRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const watchIdRef = useRef(null);
  const userMarkerRef = useRef(null);
  
  // Interaction Logic
  const activeInfoWindowRef = useRef(null);
  const activeMarkerIdRef = useRef(null); // Tracks which marker is currently "locked" by click
  const hoverTimeoutRef = useRef(null); 

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isNavigating, setIsNavigating] = useState(false);
  const [navData, setNavData] = useState({ distance: "", duration: "" });
  const [navigationStatus, setNavigationStatus] = useState("");

  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3004";

  /* ---------------- FETCH EVENTS ---------------- */
  useEffect(() => {
    if (!open) return;
    const getEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backend_url}/events`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data || []);
      } catch {
        setError("Unable to load map data");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, [open, backend_url]);

  /* ---------------- MAP INITIALIZATION & CLEANUP ---------------- */
  useEffect(() => {
    // CLEANUP WHEN CLOSED
    if (!open) {
      if (mapInstance.current) {
         // Clear listeners to prevent leaks
         window.google?.maps?.event?.clearInstanceListeners(mapInstance.current);
         mapInstance.current = null;
      }
      return;
    }

    if (!window.google || !mapRef.current) return;

    // INIT MAP
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: DTU_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeId: "satellite",
        mapId: mapId,
        tilt: DEFAULT_TILT,
        heading: DEFAULT_HEADING,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
      });

      // Click on map background closes any locked info window
      mapInstance.current.addListener("click", () => {
        if (activeInfoWindowRef.current) {
          activeInfoWindowRef.current.close();
          activeInfoWindowRef.current = null;
          activeMarkerIdRef.current = null;
        }
      });

      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        map: mapInstance.current,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#00BFFF",
          strokeWeight: 6,
          strokeOpacity: 0.8,
        },
      });
    }

    return () => stopNavigation();
  }, [open, mapId]);

  /* ---------------- MARKERS & WINDOW LOGIC ---------------- */
  useEffect(() => {
    if (!mapInstance.current || !events.length) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    if (clusterRef.current) clusterRef.current.clearMarkers();

    const filteredEvents = selectedCategory === "ALL"
        ? events
        : events.filter((e) => e.category === selectedCategory);

    const markers = [];

    filteredEvents.forEach((event) => {
      const lat = Number(event.latitude);
      const lng = Number(event.longitude);
      if (isNaN(lat) || isNaN(lng)) return;

      const position = { lat, lng };
      const icon = event.isWorkshop ? ICONS.WORKSHOP : ICONS.EVENT;

      const marker = new window.google.maps.Marker({
        position,
        title: event.name,
        icon: icon,
        map: mapInstance.current,
        animation: window.google.maps.Animation.DROP,
      });

      // --- HTML CONTENT ---
      // Note the ID for the button to attach listener later
      const contentString = `
        <div class="map-info-card" style="
            width: 240px;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid ${event.isWorkshop ? '#00BFFF' : '#FFD700'};
            border-radius: 12px;
            overflow: hidden;
            font-family: system-ui, -apple-system, sans-serif;
            box-shadow: 0 8px 32px rgba(0,0,0,0.8);
        ">
          ${event.imagePath ? `
            <div style="width: 100%; height: 100px; overflow: hidden; border-bottom: 1px solid #333;">
               <img src="${event.imagePath}" style="width: 100%; height: 100%; object-fit: contain;" />
            </div>
          ` : ''}
          
          <div style="padding: 12px;">
            <div style="
               display: inline-block;
               padding: 2px 6px;
               background: ${event.isWorkshop ? 'rgba(0, 191, 255, 0.2)' : 'rgba(255, 215, 0, 0.2)'};
               color: ${event.isWorkshop ? '#00BFFF' : '#FFD700'};
               font-size: 10px; font-weight: 800; letter-spacing: 1px; border-radius: 4px; margin-bottom: 6px;
            ">
              ${event.isWorkshop ? "WORKSHOP" : event.category.toUpperCase()}
            </div>
            
            <h3 style="margin: 0 0 4px; color: #fff; font-size: 15px; font-weight: 700; line-height: 1.2;">
               ${event.name}
            </h3>
            
            <button id="go-btn-${event.id}" style="
              width: 100%; margin-top: 10px;
              background: ${event.isWorkshop ? 'linear-gradient(90deg, #007bff, #00bfff)' : 'linear-gradient(90deg, #b8860b, #ffd700)'}; 
              color: #000; border: none; padding: 10px; border-radius: 6px; 
              font-weight: 800; font-size: 12px; cursor: pointer; text-transform: uppercase;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            ">
              Go Here 📍
            </button>
          </div>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: true, 
        pixelOffset: new window.google.maps.Size(0, -5),
      });

      // --- HELPER: OPEN WINDOW & ATTACH LISTENERS ---
      const openWindow = () => {
        if (activeInfoWindowRef.current && activeInfoWindowRef.current !== infoWindow) {
           // Close other window if it's not the same one
           activeInfoWindowRef.current.close();
           activeMarkerIdRef.current = null;
        }

        infoWindow.open({ anchor: marker, map: mapInstance.current });
        activeInfoWindowRef.current = infoWindow;
        
        // Use a timeout to ensure DOM is ready for button click
        setTimeout(() => {
            const btn = document.getElementById(`go-btn-${event.id}`);
            if (btn) {
                // Remove old listeners to be safe (clone node trick or just reassign)
                btn.onclick = (e) => {
                    e.stopPropagation(); // Prevent map click
                    startNavigation(position);
                    infoWindow.close();
                    activeMarkerIdRef.current = null;
                };
            }
        }, 50); // Small delay to wait for Google Maps to render DOM
      };

      // 1. HOVER: Open, but don't lock
      marker.addListener("mouseover", () => {
        // If we have a locked marker that isn't this one, don't interfere
        if (activeMarkerIdRef.current && activeMarkerIdRef.current !== event.id) return;
        
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        openWindow();
      });

      // 2. MOUSEOUT: Close after delay (unless locked)
      marker.addListener("mouseout", () => {
        hoverTimeoutRef.current = setTimeout(() => {
           // Only close if NOT locked
           if (activeMarkerIdRef.current !== event.id) {
               infoWindow.close();
               if (activeInfoWindowRef.current === infoWindow) {
                   activeInfoWindowRef.current = null;
               }
           }
        }, 400); // 400ms grace period to move mouse to window
      });

      // 3. CLICK: Open & LOCK
      marker.addListener("click", () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        activeMarkerIdRef.current = event.id; // LOCK THIS ID
        openWindow();
      });

      // 4. DomReady Listener (Backup for button)
      infoWindow.addListener("domready", () => {
         const btn = document.getElementById(`go-btn-${event.id}`);
         if (btn) {
             btn.onclick = () => {
                 startNavigation(position);
                 infoWindow.close();
                 activeMarkerIdRef.current = null;
             };
         }
      });

      markers.push(marker);
    });

    markersRef.current = markers;
  }, [events, selectedCategory]);

  /* ---------------- NAVIGATION LOGIC ---------------- */
  const startNavigation = (destination) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setIsNavigating(true);
    setNavigationStatus("LOCATING...");

    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const origin = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setNavigationStatus("LIVE TRACKING");

        if (!userMarkerRef.current) {
          userMarkerRef.current = new window.google.maps.Marker({
            position: origin,
            map: mapInstance.current,
            icon: ICONS.USER,
            title: "You",
            zIndex: 999,
          });
        } else {
          userMarkerRef.current.setPosition(origin);
        }

        directionsServiceRef.current.route(
          {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.WALKING,
          },
          (result, status) => {
            if (status === "OK") {
              directionsRendererRef.current.setDirections(result);
              const leg = result.routes[0].legs[0];
              setNavData({
                distance: leg.distance.text,
                duration: leg.duration.text,
              });
            }
          }
        );
      },
      (err) => {
          console.error(err);
          setNavigationStatus("GPS LOST");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setNavigationStatus("");
    setNavData({ distance: "", duration: "" });

    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    if (directionsRendererRef.current) directionsRendererRef.current.setDirections({ routes: [] });
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }
    
    // Reset View
    if (mapInstance.current) {
       mapInstance.current.setZoom(DEFAULT_ZOOM);
       mapInstance.current.setCenter(DTU_CENTER);
       mapInstance.current.setTilt(DEFAULT_TILT);
       mapInstance.current.setHeading(DEFAULT_HEADING);
    }
  };

  if (!open) return null;

  const categories = ["ALL", ...new Set(events.map((e) => e.category))];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center">
      
      {/* MAP CONTAINER - Restored to 'inset-6' size but with Cyber UI */}
      <div className="absolute inset-4 md:inset-6 bg-[#121212] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-[#d4af37]/30 flex flex-col">
        
        {/* --- HEADER UI --- */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/90 to-transparent pointer-events-none flex justify-between items-start">
          
          {/* CATEGORIES */}
          <div className="pointer-events-auto flex flex-wrap gap-2 max-w-[80%]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300
                  ${selectedCategory === cat 
                    ? "bg-[#d4af37] text-black shadow-[0_0_10px_#d4af37] scale-105" 
                    : "bg-black/60 text-gray-400 border border-[#d4af37]/30 hover:bg-[#d4af37]/20 hover:text-[#d4af37] backdrop-blur-md"}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* CLOSE BTN */}
          <button
            onClick={onClose}
            className="pointer-events-auto w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black/50 border border-[#d4af37]/50 text-[#d4af37] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all backdrop-blur-md"
          >
            ✕
          </button>
        </div>

        {/* --- NAVIGATION HUD --- */}
        {isNavigating && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-sm animate-in slide-in-from-bottom-5">
            <div className="bg-black/80 backdrop-blur-xl border border-[#00BFFF]/30 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BFFF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BFFF]"></span>
                  </span>
                  <span className="text-[10px] font-bold text-[#00BFFF] uppercase tracking-widest">{navigationStatus}</span>
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-xl font-bold text-white font-mono">{navData.duration || "--"}</span>
                   <span className="text-xs text-gray-400 font-mono">({navData.distance || "--"})</span>
                </div>
              </div>

              <button
                onClick={stopNavigation}
                className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all"
              >
                Exit
              </button>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]">
            <div className="w-10 h-10 border-4 border-[#333] border-t-[#d4af37] rounded-full animate-spin mb-4"></div>
            <p className="text-[#d4af37] font-mono text-xs tracking-[0.2em] animate-pulse">LOADING DATA...</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
           <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90">
             <div className="text-red-500 text-3xl mb-2">⚠️</div>
             <p className="text-red-400 font-mono text-sm">{error}</p>
           </div>
        )}

        <div ref={mapRef} className="w-full h-full bg-[#1a1a1a]" />
      </div>
    </div>
  );
}