import React, { useEffect, useState } from "react";

export default function Drawer({ event, onClose }) {
  const [loading, setLoading] = useState(false);
  const [soloEvent, setSoloEvent] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cleanTeamName = event.teamName.trim();
    if (!event.teamName || event.teamName.trim() === "") {
        // SOLO EVENT — do NOT call backend
        setSoloEvent(true);
        setLoading(false);
        return;
    }
    setLoading(true);
    const fetchTeamDetails = async () => {
      try {
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${event.eventId}/team/${cleanTeamName}`,
        );
        // SOLO EVENT
        if (res.status === 201) {
          setSoloEvent(true);
          setTeamMembers([]);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch team");
        }

        const data = await res.json();
        // console.log(data);
        setTeamMembers(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load team details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [event]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      {/* Drawer */}
      <div className="w-full sm:w-[420px] h-full bg-white shadow-2xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-[#7c6a3c]">
            {event.event.name}
          </h2>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 mt-6 overflow-y-auto">
          {loading && (
            <p className="text-center text-[#7c6a3c] font-semibold">
              Loading team details...
            </p>
          )}

          {error && (
            <p className="text-center text-red-500 font-semibold">{error}</p>
          )}

          {/* SOLO EVENT */}
          {!loading && (soloEvent || teamMembers.length == 0) && (
            <div className="text-center mt-10">
              <p className="text-lg font-bold text-[#7c6a3c]">
                Solo Event
              </p>
              <p className="text-sm text-[#7c6a3c]/70 mt-2">
                No team members for this event
              </p>
            </div>
          )}

          {/* TEAM MEMBERS */}
          {!loading && !soloEvent && teamMembers.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-[#7c6a3c] uppercase">
                Team: {event.teamName}
              </p>

              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center border rounded-lg p-4 bg-[#f9f6ef]"
                >
                  <div>
                    <p className="font-semibold text-[#7c6a3c]">
                      {member.candidateName}
                    </p>
                    <p className="text-sm text-[#7c6a3c]/70">
                      {member.email}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      member.memberStatus === "LEADER"
                        ? "bg-[#da3737] text-white"
                        : "bg-[#e7d7b1] text-[#7c6a3c]"
                    }`}
                  >
                    {member.memberStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t pt-4">
          <button
            disabled={!event?.event?.unstopLink}
            className="
                relative mx-[23%] overflow-hidden
                px-6 py-2
                bg-[#7a2e3a]
                text-[#f3efe6]
                tracking-wide
                transition
                group
            "
            onClick={() => {
                if (event?.event?.unstopLink) {
                window.open(event.event.unstopLink, "_blank", "noopener,noreferrer");
                }
            }}
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

            <span className="relative invictus-text z-10">
                VIEW_ON_UNSTOP
            </span>
            </button>
        </div>
      </div>
    </div>
  );
}
