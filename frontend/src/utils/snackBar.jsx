"use client";

import React from "react";

export default function SnackBar({ text, onClose, actionText, onAction }) {
  return (
    <div className="fixed bottom-10 left-0 z-9999 animate-slideUp">
      <div className="
        flex items-center gap-4
        px-6 py-3
        rounded-r-2xl
        bg-gradient-to-r from-[#f9f4e7] to-[#fffaf0]
        border-2 border-[#d6b36a]
        shadow-[0_0_20px_rgba(214,179,106,0.35)]
        text-[#6b4e16]
        min-w-[320px]
        max-w-[90vw]
      ">

        <p className="text-sm invictus-subheading w-75">
          {text}
        </p>

        {actionText && (
          <>
          {/* Vertical line sepeartion */}
          <button
            onClick={onAction}
            className="
              text-sm font-semibold
              px-3 py-1
              border-l-10
              bg-[#b19965]
              text-white
              hover:bg-[#c7a452]
              transition
            "
          >
            {actionText}
          </button>
          </>
        )}

        <button
          onClick={onClose}
          className="
            w-7 h-7
            flex items-center justify-center
            rounded-full
            border border-[#d6b36a]
            text-[#6b4e16]
            hover:bg-[#d6b36a]
            hover:text-white
            transition
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
}
