import React from 'react'

export default function landingFigure({ className, style }) {
  return (
        <div
      style={style}
      className={`
        fixed -bottom-200 left-2/5
        ${className}
      `}
    >
      <img
        src="/figure1.png"
        alt="Lotus"
        className="w-full h-full object-contain"
      />
    </div>
  )
}
