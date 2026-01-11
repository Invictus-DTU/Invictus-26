import React, { useEffect, useRef } from "react";
import { DTU_LOCATIONS } from "./locations";

export default function MapModal({ open, onClose, destination }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!open || !window.google) return;

    navigator.geolocation.getCurrentPosition((pos) => {
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
          }
        }
      );

      new window.google.maps.Marker({
        position: destination,
        map,
        title: "Destination",
      });
    });
  }, [open, destination]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60">
      <div className="absolute inset-4 bg-white rounded-xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10
            bg-[#bfa14a] text-white px-4 py-1 rounded-full font-bold"
        >
          ✕
        </button>

        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
