import React, { useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const DTU_CENTER = { lat: 28.7501, lng: 77.1177 };

export default function Events3DMapModal({
  open,
  onClose,
  mapId,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const clusterRef = useRef(null);
  const rotateInterval = useRef(null);
  const directionsRendererRef = useRef(null);
const directionsServiceRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const backend_url =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3004";

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
        setError("Unable to fetch events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [open]);

  /* ---------------- INITIALIZE MAP ---------------- */

  useEffect(() => {
    if (!open || !window.google || !mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: DTU_CENTER,
        zoom: 18,
        mapTypeId: "satellite",
        mapId,
        tilt: 67.5,
        heading: 45,
        gestureHandling: "greedy",
      });

      // Auto rotating preview
rotateInterval.current = setInterval(() => {
  if (!mapInstance.current) return;

  const heading = mapInstance.current.getHeading() || 0;
  mapInstance.current.setHeading(heading + 0.5); // slower
}, 60); // slower interval

    }

    return () => {
      clearInterval(rotateInterval.current);
    };

  }, [open, mapId]);

  const enforce3DView = () => {
  if (!mapInstance.current) return;

  mapInstance.current.setTilt(67.5);
  mapInstance.current.setHeading(45);
};


  /* ---------------- ADD MARKERS + CLUSTER ---------------- */

  useEffect(() => {
    if (!mapInstance.current || !events.length) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    if (clusterRef.current) clusterRef.current.clearMarkers();

    const filteredEvents =
      selectedCategory === "ALL"
        ? events
        : events.filter((e) => e.category === selectedCategory);

    const markers = [];

    filteredEvents.forEach((event) => {
      const lat = Number(event.latitude);
      const lng = Number(event.longitude);
      if (isNaN(lat) || isNaN(lng)) return;

      const position = { lat, lng };

      const marker = new window.google.maps.Marker({
        position,
        title: event.name,
        icon: {
          path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 8,
          fillColor: "#d4af37",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#000",
          rotation: 0,
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2416 100%);
        color: #d4af37;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #d4af37;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        max-width: 240px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          ">
        ${
          event.imagePath
            ? `<img src="${event.imagePath}" 
           style="width: 100%; height: 80px; object-fit: contain; border-radius: 6px; margin-bottom: 8px; border: 1px solid #564d37;" />`
            : ""
        }
        <div style="font-weight: 600; font-size: 14px; line-height: 1.4;">
          ${event.name}
        </div>
        <div style="margin-top: 6px; font-size: 12px; color: #a89041;">
          ${event.category}
        </div>
        <div style="
          margin-top: 6px;
          font-weight: 600;
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          background: ${
            event.status === "ACTIVE"
          ? "rgba(22, 163, 74, 0.2)"
          : event.status === "UPCOMING"
          ? "rgba(37, 99, 235, 0.2)"
          : "rgba(220, 38, 38, 0.2)"
          };
          color: ${
            event.status === "ACTIVE"
          ? "#4ade80"
          : event.status === "UPCOMING"
          ? "#60a5fa"
          : "#f87171"
          };
          text-align: center;
        ">
          ${event.status}
        </div>
          </div>
        `,
      });


      marker.addListener("mouseover", () => {
        infoWindow.open({
          anchor: marker,
          map: mapInstance.current,
        });
        clearInterval(rotateInterval.current);

      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
            rotateInterval.current = setInterval(() => {
            const heading = mapInstance.current.getHeading() || 0;
            mapInstance.current.setHeading(heading + 0.5);
          }, 5500);

  setTimeout(() => {

    enforce3DView();
  }, 5500);

      });


      marker.addListener("click", () => {
       
        drawRoute(position);
          setTimeout(() => {
    enforce3DView();
  }, 500);
      });

      markers.push(marker);
    });

    clusterRef.current = new MarkerClusterer({
      map: mapInstance.current,
      markers,
    });

    markersRef.current = markers;

  }, [events, selectedCategory]);

  /* ---------------- ROUTE DRAWING ---------------- */

const drawRoute = (destination) => {
  if (!window.google || !mapInstance.current) return;

  // Stop rotation when navigating
  if (rotateInterval.current) {
    clearInterval(rotateInterval.current);
  }

  if (!navigator.geolocation) {
    alert("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const origin = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      // Initialize once
      if (!directionsServiceRef.current) {
        directionsServiceRef.current =
          new window.google.maps.DirectionsService();
      }

      if (!directionsRendererRef.current) {
        directionsRendererRef.current =
          new window.google.maps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#d4af37",
              strokeWeight: 6,
            },
          });

        directionsRendererRef.current.setMap(mapInstance.current);
      } else {
        directionsRendererRef.current.setDirections({ routes: [] });
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

            // Smooth zoom to fit route
            const bounds = new window.google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach((p) =>
              bounds.extend(p)
            );
            mapInstance.current.fitBounds(bounds);

              setTimeout(() => {
    enforce3DView();
  }, 500);
          } else {
            console.error("Directions failed:", status);
            alert("Unable to calculate route.");
          }
        }
      );

       new window.google.maps.Marker({
          position: origin,
          map: mapInstance.current,
          icon: {
            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: "#1d4ed8",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "white",
          },
          title: "You",
        });

        new window.google.maps.Marker({
          position: destination,
          map: mapInstance.current,
          title: "Destination",
        });
    },
    (error) => {
      console.error("Geolocation error:", error);
      alert("Please allow location access to navigate.");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  );
};

useEffect(() => {
  if (!open) {
    // Stop rotation
    if (rotateInterval.current) {
      clearInterval(rotateInterval.current);
      rotateInterval.current = null;
    }

    // Clear directions
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }

    // Clear cluster
    if (clusterRef.current) {
      clusterRef.current.clearMarkers();
      clusterRef.current = null;
    }

    // Clear markers
    markersRef.current.forEach((m) => {
      if (m.setMap) m.setMap(null);
    });
    markersRef.current = [];

    // Destroy map instance
    mapInstance.current = null;
  }
}, [open]);


  if (!open) return null;

  const categories = [
    "ALL",
    ...new Set(events.map((e) => e.category)),
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md">
      <div className="absolute inset-6 bg-gradient-to-br from-black to-[#3a2f0b] rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-14 right-4 z-22
          bg-[#7c7047] text-black px-4 py-1 rounded-full font-bold"
        >
          ✕
        </button>

        {/* Category Filter */}
        <div className="absolute top-24 left-4 z-50 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm font-bold border ${
                selectedCategory === cat
                  ? "bg-[#a89041] text-black"
                  : "bg-black text-[#d4af37] border-[#94803d]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20 text-[#d4af37] font-bold">
            Loading Invictus Map...
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20 text-red-500">
            {error}
          </div>
        )}

        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: "500px" }}
        />
      </div>
    </div>
  );
}
