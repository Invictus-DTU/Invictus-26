import React, { useEffect, useRef, useState } from "react";
import { DTU_LOCATIONS } from "./locations";

export default function MapModal({ open, onClose, destination }) {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open || !window.google) return;

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
        });

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
          map,
          suppressMarkers: true,
        });

        directionsService.route(
          {
            origin: userLocation,
            destination,
            travelMode: window.google.maps.TravelMode.WALKING,
          },
          (result, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(result);
              setLoading(false); // map fully ready
            }
          }
        );

        new window.google.maps.Marker({
          position: userLocation,
          map,
            icon: {
            path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: "#1d4ed8", // blue
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "white",
            rotation: 0, // later you can rotate with heading
          },
          title: "You"
        });

        new window.google.maps.Marker({
          position: destination,
          map,
          title: "Destination",
        });

      },
      () => {
        setLoading(false); // geolocation failed
      }
    );
  }, [open, destination]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black/60">
      <div className="absolute inset-4 bg-white rounded-xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-14 right-2 z-20
            bg-[#bfa14a] text-white px-4 py-1 rounded-full font-bold"
        >
          ✕
        </button>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">
              Loading map...
            </p>
          </div>
        )}

        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
