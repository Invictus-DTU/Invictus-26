import React from 'react'

export default function landingFigure({ className, style }) {
  return (
        <div
      style={style}
      className={`
        fixed -bottom-200 left-1/2
        ${className}
      `}
    >
      <img
        src="/figure.png"
        alt="Lotus"
        className="w-full h-full object-contain"
      />
    </div>
  )
}
