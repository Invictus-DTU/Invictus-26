import React from "react";

export default function commonLotus({ className, style }) {
  return (
    <div
      style={style}
      className={`
        fixed bottom-10 left-1/2 transform -translate-x-1 
        ${className}
      `}
    >
      <img
        src="/lotus.svg"
        alt="Lotus"
        className="w-full h-full object-contain drop-shadow-md"
      />
    </div>
  );
}
