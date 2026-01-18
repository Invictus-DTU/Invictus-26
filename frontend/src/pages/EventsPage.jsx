import { useState } from "react";
import EventMore from "@/components/Events/EventMore";

export default function EventsPage() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  return (
    <>
      {/* Example Event Card */}
      <div
        onClick={() =>
          handleClick({
            name: "Hackathon",
            description: "24-hour coding battle a dummy or placeholder text commonly used in graphic design, publishing, and web development. Its purpose is to permit a page layout to be designed",
            prize: "50,000",
            stages: "Online → Offline 20-22 Feb",
            contact: "+91 9XXXXXXX",
            image: "/image.png",
          })
        }
        className="cursor-pointer p-6 bg-amber-600 rounded-lg"
      >
        Click Event
      </div>

      <EventMore
        open={open}
        onClose={() => setOpen(false)}
        event={selectedEvent}
      />
    </>
  );
}
