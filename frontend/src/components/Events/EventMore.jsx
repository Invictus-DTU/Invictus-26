import { useEffect, useState } from "react";

export default function EventMore({ open, onClose, event }) {
  const [tab, setTab] = useState("description");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  // if (!open) return null;

  return (
    <>
      {/* BACKDROP */}
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-40
        bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    />

      {/* DRAWER */}
    <div
      className={`
        fixed top-0 right-0 z-50
        h-full w-full max-w-2xl
        bg-[#000000] text-[#f3efe6]
        shadow-[-20px_0_60px_rgba(0,0,0,0.45)]
        border-l border-[rgba(201,164,76,0.25)]
        overflow-y-auto overflow-x-hidden
        transform-gpu
        transition-transform
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 z-99 left-4 text-xl text-[#f3efe6]/60 hover:text-[#c9a44c]"
        >
          ✕
        </button>

        <div className={`relative transition-opacity duration-300 delay-150 ${open ? "opacity-100" : "opacity-0"} h-full gap-12 p-12`}>
          {/* LEFT SECTION */}
          <div className="flex flex-col">
            {/* TITLE */}
            <h1 className="text-4xl invictus-heading font-bold tracking-widest mb-10 text-[#c9a44c]">
              {event?.name || "EVENT NAME"}
            </h1>

            {/* TABS */}
            <div className="space-y-4 invictus-subheading mb-10">
              {["description", "stages & timeline", "contacts"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`
                    w-64 text-left py-2 uppercase tracking-widest text-sm
                    transition
                    ${
                      tab === t
                        ? "text-[#c9a44c] border-b border-[#c9a44c]"
                        : "text-[#f3efe6]/60 hover:text-[#c9a44c]"
                    }
                  `}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* CONTENT */}
            <div className="flex-1 text-sm font-bold invictus-text leading-relaxed text-[#f3efe6]/80">
              {tab === "description" && (
                <p>{event?.description || "Event description goes here."}</p> 
              )}
              {tab === "stages & timeline" && (
                <p>{event?.stages || "Stages information goes here."}</p>
              )}
              {tab === "contacts" && (
                <p>{event?.contacts || "Contact details go here."}</p>
              )}
              <hr />
            </div>

            {/* PRIZE */}
            <div className="mt-12 invictus-text">
              <p className="text-xs tracking-widest text-[#f3efe6]/60">
                PRIZES WORTH
              </p>
              <p className="text-4xl font-bold text-[#c9a44c] mt-2">
                ₹ {event?.prize || "50,000"}*
              </p>
            </div>

            {/* CTA */}
            <div className="flex md:gap-6 gap-2 mt-6 invictus-text">
<button
  className="
    relative overflow-hidden
    px-6 py-2
    bg-[#7a2e3a]
    text-[#f3efe6]
    tracking-wide
    transition
    group
  "
>
  <span
    className="
      absolute inset-0
      bg-[#c9a44c]
      translate-y-full
      group-hover:translate-y-0
      transition-transform
      duration-300
      ease-out
    "
  ></span>

  <span className="relative z-10">
    REGISTER
  </span>
</button>


<button
  className="
    relative overflow-hidden
    px-3 py-2
    border border-[#c9a44c]/40
    text-[#c9a44c]
    tracking-wide
    transition
    group
  "
>
  <span
    className="
      absolute inset-0
      bg-[#c9a44c]/15
      -translate-x-full
      group-hover:translate-x-0
      transition-transform
      duration-300
      ease-out
    "
  ></span>

  <span className="relative z-10">
    VIEW IN DASHBOARD
  </span>
</button>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative pb-4 mt-10 rounded-xl w-fit h-fit max-h-3/5 bg-cover overflow-hidden border border-[#c9a44c]/20">
            <img
              src={event?.image || "/lock.svg"}
              alt="Event Image"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1a1815]/60 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}
