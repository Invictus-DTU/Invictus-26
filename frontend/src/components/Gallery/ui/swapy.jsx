"use client";

import { useEffect, useRef } from "react";
import { createSwapy } from "swapy";
import { cn } from "@/lib/utils";

/* ---------------- LAYOUT ---------------- */

export const SwapyLayout = ({
  id,
  onSwap,
  config = {},
  className,
  children,
}) => {
  const containerRef = useRef(null);
  const swapyRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ⛔ Prevent double init (React strict mode)
        if (window.innerWidth < 1100) {
      swapyRef.current?.destroy();
      swapyRef.current = null;
      return;
    }

    const swapy = createSwapy(container, config);
    swapyRef.current = swapy;

    if (onSwap) {
      swapy.onSwap(onSwap);
    }

    return () => {
      swapyRef.current?.destroy();
      swapyRef.current = null;
    };
  }, []); // ✅ RUN ONCE ONLY

  return (
    <div
      id={id}
      ref={containerRef}
      className={className}
      data-swapy-container
    >
      {children}
    </div>
  );
};

/* ---------------- DRAG HANDLE ---------------- */

export const DragHandle = ({ className }) => {
  return (
    <div
      data-swapy-handle
      className={cn(
        "absolute top-2 left-2 cursor-grab rounded-md text-gray-500 active:cursor-grabbing",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-80"
      >
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </div>
  );
};

/* ---------------- SLOT ---------------- */

export const SwapySlot = ({ id, className, children }) => {
  return (
    <div
      data-swapy-slot={id}
      className={cn(
        "transition-colors data-swapy-highlighted:bg-neutral-200 dark:data-swapy-highlighted:bg-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
};

/* ---------------- ITEM ---------------- */

const dragOpacityClassMap = {
  10: "data-swapy-dragging:opacity-10",
  20: "data-swapy-dragging:opacity-20",
  30: "data-swapy-dragging:opacity-30",
  40: "data-swapy-dragging:opacity-40",
  50: "data-swapy-dragging:opacity-50",
  60: "data-swapy-dragging:opacity-60",
  70: "data-swapy-dragging:opacity-70",
  80: "data-swapy-dragging:opacity-80",
  90: "data-swapy-dragging:opacity-90",
  100: "data-swapy-dragging:opacity-100",
};

export const SwapyItem = ({
  id,
  className,
  children,
  dragItemOpacity = 100,
}) => {
  const opacityClass =
    dragOpacityClassMap[dragItemOpacity] ??
    "data-swapy-dragging:opacity-50";

  return (
    <div
      data-swapy-item={id}
      className={cn("relative", opacityClass, className)}
    >
      {children}
    </div>
  );
};
