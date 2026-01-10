import React, { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('EVENTS');

  return (
    <div className="relative font-montserrat text-[#7c6a3c] pt-28 pb-16">
      {/* Top-right card */}
      <div
        className="absolute top-8 right-3 mr-25 w-[400px] h-[240px] bg-[#f9f6ef]/70 border-4 border-[#bfa14a] rounded-xl z-10 mt-18"
        style={{
          boxShadow: '0 2px 12px rgba(191,161,74,0.12)',
        }}
      />

      {/* Welcome Section */}
      <div className="mt-8 max-w-6xl w-full ml-32">
        <h1 className="font-montserrat font-extrabold text-5xl mb-2 ml-6 tracking-wide bg-gradient-to-b from-[#E2AA38] to-[#4d4127] bg-clip-text text-transparent">
          WELCOME BACK, USER
        </h1>
        <p className="mt-5 ml-10 text-2xl  bg-gradient-to-b from-[#D4AF37] to-[#6E5B1D] bg-clip-text text-transparent">
          Your journey with Invictus a path to innovation continues.
        </p>
        <button
          type="button"
          className="bg-[#bfa14a] text-white font-semibold rounded-lg px-5 py-2 mt-8 mb-6 ml-10 flex items-center gap-2 border-2 border-[#bfa14a] cursor-pointer transition hover:bg-[#d4af37] active:scale-95"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
          Open Map
        </button>

        {/* Dashboard Card */}
        <div
          className="rounded-2xl p-6 mt-12 w-full max-w-[1800px]"
          style={{
            border: '3px solid #bfa14a',
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-[#bfa14a] text-lg">HOME</span>
            <button
              className="bg-[#bfa14a] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#bfa14a] transition hover:bg-[#d4af37] hover:scale-105 active:scale-95"
            >
              EDIT PROFILE
            </button>
          </div>
          
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('EVENTS')}
              className={`rounded-lg px-3 py-1 font-semibold border-2 border-[#bfa14a] cursor-pointer transition
                ${activeTab === 'EVENTS'
                  ? 'bg-[#bfa14a] text-white'
                  : 'bg-[#e7d7b1] text-[#7c6a3c]'
                }`}
            >
              EVENTS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('WORKSHOP')}
              className={`rounded-lg px-3 py-1 font-semibold border-2 border-[#bfa14a] cursor-pointer transition
                ${activeTab === 'WORKSHOP'
                  ? 'bg-[#bfa14a] text-white'
                  : 'bg-[#e7d7b1] text-[#7c6a3c]'
                }`}
            >
              WORKSHOP
            </button>
          </div>
          {/* Event Cards */}
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border rounded-xl p-4 mb-4 bg-[#f9f6ef]"
              style={{
                border: '2px solid #e7d7b1',
              }}
            >
              <div>
                <div className="font-bold mb-2">EVENT NAME</div>
                <div className="flex gap-2">
                  <button
                    className="bg-[#bfa14a] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#bfa14a] transition hover:bg-[#d4af37] hover:scale-105 active:scale-95"
                  >
                    VIEW DETAILS
                  </button>
                  <button
                    className="bg-[#bfa14a] text-white rounded-lg px-4 py-1 font-semibold border-2 border-[#bfa14a] transition hover:bg-[#d4af37] hover:scale-105 active:scale-95"
                  >
                    EDIT TEAM
                  </button>
                </div>
              </div>
              <div className="font-semibold text-[#bfa14a]">TECHNOLOGY</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
