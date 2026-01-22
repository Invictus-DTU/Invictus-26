import { useState } from "react";
import faqs from "./faqs.json";

export default function FAQ() {
  const [open, setOpen] = useState([]);

  const toggleFAQ = (i) => {
    setOpen((prev) =>
      prev.includes(i)
        ? prev.filter((x) => x !== i)
        : [...prev, i]
    );
  };

  return (
    <div
      style={{
        backgroundImage: "url('/backdrop.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: "24px",
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#C5A059",
          fontSize: "50px",
          letterSpacing: "3px",
          marginBottom: "20px",
          fontWeight: "bold"
        }}
      >
        FREQUENTLY ASKED QUESTIONS
      </h1>

      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        {faqs.map((item, i) => {
          const isOpen = open.includes(i);

          return (
            <div key={i} style={{ marginBottom: "14px" }}>
              
              <div
                onClick={() => toggleFAQ(i)}
                style={{
                  background: isOpen ? "#fff8e7" : "rgba(166,138,82,0.85)",
                  border: "3px solid #C5A059",
                  borderRadius: isOpen ? "10px 10px 0 0" : "10px",
                  padding: "16px 22px",
                  cursor: "pointer",
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: isOpen ? "#7a6c45" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxSizing: "border-box"
                }}
              >
                
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/lotus.svg"
                    alt="lotus"
                    width="22"
                    style={{ marginRight: "12px", flexShrink: 0 }}
                  />
                  {item.q}
                </div>

                
                <img
                  src="/wheel.svg"
                  alt="wheel"
                  width="32"
                  style={{
                    transition: "transform 0.64s ease, filter 0.64s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    filter: isOpen
                      ? "brightness(0) saturate(100%) invert(60%) sepia(40%) saturate(600%) hue-rotate(10deg)"
                      : "brightness(0) invert(1)"
                  }}
                />
              </div>

              
              <div
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  opacity: isOpen ? 1 : 0,
                  transition: "all 0.4s ease",
                  overflow: "hidden",
                  background: "#7a6c45",
                  borderLeft: isOpen ? "3px solid #C5A059" : "none",
                  borderRight: isOpen ? "3px solid #C5A059" : "none",
                  borderBottom: isOpen ? "3px solid #C5A059" : "none",
                  borderRadius: "0 0 10px 10px",
                  color: "#fff8e7",
                  boxSizing: "border-box"
                }}
              >
                <p
                  style={{
                    padding: isOpen ? "18px 24px" : "0 24px",
                    fontSize: "22px",
                    lineHeight: "1.7",
                    margin: 0
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}