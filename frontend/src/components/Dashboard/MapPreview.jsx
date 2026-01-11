import React, { useEffect, useRef } from "react";

export default function MapPreview({ center }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 16,
      disableDefaultUI: true,
      gestureHandling: "none",
    });

    new window.google.maps.Marker({
      position: center,
      map,
    });
  }, [center]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl border-2 border-[#bfa14a]"
    />
  );
}
