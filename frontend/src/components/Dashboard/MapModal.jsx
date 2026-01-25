import React, { useEffect, useRef, useState } from "react";

export default function MapModal({ open, onClose, destination }) {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!open || !window.google) return;

    setLoading(true);
    setLocationError(null);

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
              setLoading(false);
            }
          }
        );

        new window.google.maps.Marker({
          position: userLocation,
          map,
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
          map,
          title: "Destination",
        });
      },
      (error) => {
        setLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location permission was denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError("Unable to fetch your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
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
          className="absolute top-14 right-2 z-22
            bg-[#bfa14a] text-white px-4 py-1 rounded-full font-bold"
        >
          ✕
        </button>

        {/* Loading */}
        {loading && !locationError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">
              Loading map...
            </p>
          </div>
        )}

        {/* Location Error UI */}
        {locationError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white text-center p-6">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Location Access Required
            </h2>
            <p className="text-gray-600 mb-4 max-w-sm">
              {locationError}
              <br />
              Please enable location access to see directions.
            </p>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-[#bfa14a] text-white font-bold hover:brightness-110 transition"
            >
              Open in Google Maps
            </a>
          </div>
        )}

        {/* Map */}
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
