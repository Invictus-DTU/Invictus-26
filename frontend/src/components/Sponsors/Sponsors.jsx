import React, { useEffect } from "react";
import { motion } from "framer-motion";

/* ---------------- 1. SPONSOR CARD ---------------- */
const SponsorCard = ({ name, img }) => (
    <div className="flex flex-col items-center justify-center p-1.5 bg-white/10 backdrop-blur-md border border-[#C5A059]/40 rounded-lg hover:bg-white/20 transition-all duration-300 group shadow-lg w-full h-full">
        <div className="bg-[#FDF8E2]/90 border-[1px] border-[#C5A059] flex items-center justify-center overflow-hidden rounded-md mb-1.5 w-full aspect-square relative p-1 text-center">
            {img ? (
                <img
                    src={img}
                    alt={name}
                    className="w-[75%] h-[75%] object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.currentTarget.src = "";
                        e.currentTarget.style.display = "none";
                    }}
                />
            ) : (
                <span className="text-[#8B6508] text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-80 leading-tight">
                    {name}
                </span>
            )}
        </div>
        <span className="font-bold text-[#FDF8E2] drop-shadow-md text-[7px] md:text-[9px] uppercase tracking-widest truncate w-full text-center">
            {name}
        </span>
    </div>
);

/* ---------------- 2. CATEGORY GROUP BOX ---------------- */
const CategoryGroup = ({ title, sponsors }) => (
    <div className="relative shrink-0 mx-3 md:mx-5 mt-4">
        {/* Category Title Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[#8B6508] via-[#C5A059] to-[#8B6508] px-4 py-1 rounded-sm shadow-[0_0_10px_rgba(197,160,89,0.5)] border border-[#FDF8E2]/30 whitespace-nowrap">
            <h3 className="text-[#FDF8E2] text-[9px] md:text-xs font-black tracking-[0.2em] uppercase">
                {title}
            </h3>
        </div>

        {/* Sponsor Grid Container - 2 Rows, Horizontal Flow */}
        <div className="p-3 md:p-4 pt-6 md:pt-8 border-[1.5px] border-[#C5A059] bg-black/40 backdrop-blur-xl rounded-xl shadow-[0_0_20px_rgba(197,160,89,0.15)] flex justify-center h-full">
            <div className="grid grid-rows-2 grid-flow-col gap-2 md:gap-4">
                {sponsors.map((s, idx) => (
                    <div key={idx} className="w-[85px] md:w-[105px] lg:w-[115px]">
                        <SponsorCard name={s.name} img={s.img} />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

/* ---------------- 3. MAIN PAGE ---------------- */
export default function Sponsors({ setLotusClass, setFigureClass, setFigureStyle }) {

    // Sponsors extracted from Google Sheet Document + Unstop added back
    const sponsorCategories = [
        {
            type: "Title & Platform",
            sponsors: [
                { name: "Airflow Pvt Ltd", img: "/Sponsers/Airflow Pvt Ltd.jpeg" },
                { name: "Unstop", img: "/Sponsers/unstop.png" },
                { name: "Codechef", img: "/Sponsers/Codechef.jpeg" },
                { name: "Chess.com", img: "/Past_Sponsers/chess.png" }
            ]
        },
        {
            type: "Event & Community",
            sponsors: [
                { name: "GeeksforGeeks", img: "/Sponsers/GeeksForGeeks.png" },
                { name: "Coding Blocks", img: "/Sponsers/coding blocks.png" },
                { name: "Genesis", img: "/Sponsers/genesis.png" },
                { name: "Gwalior DAO", img: "/Sponsers/gwalior dao.jpg" },
                { name: "Hacknfinity", img: "/Sponsers/Hacknfinity.jpeg" }
            ]
        },
        {
            type: "Food & Hydration",
            sponsors: [
                { name: "Farmley", img: "/Sponsers/Date_Bites.jpeg" },
                { name: "Lotte (Pepero)", img: "/Sponsers/pepero.jpeg" },
                { name: "91 Culture", img: "/Sponsers/91 culture.jpeg" },
                { name: "HELL Energy", img: "/Sponsers/hell energy.png" }
            ]
        },
        {
            type: "Media & Mobility",
            sponsors: [
                { name: "Groove Nexus", img: "/Sponsers/groovenexus.jpg" },
                { name: "dufest_gram", img: "/Sponsers/dufest_gram.jpg.jpeg" },
                { name: "du_fest_", img: "/Sponsers/du fest.jpeg" },
                { name: "Freedo Rentals", img: "/Sponsers/freedo rentals.png" }
            ]
        },
        {
            type: "Health & Social",
            sponsors: [
                { name: "Ayouth Veda", img: "/Sponsers/Ayouth Veda.jpeg" },
                { name: "Adarshila Jan Kalyan", img: "/Sponsers/Adarshila Jan Kalyan Foundation.jpeg" },
                { name: "Umeed Foundation", img: "/Sponsers/Umeed_Logo.png" }
            ]
        },
        {
            type: "Innovation & Tech",
            sponsors: [
                { name: "Mitutoyo", img: "/Sponsers/mitutoyo.png" },
                { name: "Algorand", img: "/Sponsers/algorand.png" },
                { name: "Digimation Flights", img: "/Sponsers/digimation flight.png" },
                { name: "Spazor", img: "/Sponsers/Spazor.jpeg" }
            ]
        },
        {
            type: "Finance & Lifestyle",
            sponsors: [
                { name: "LIC", img: "/Sponsers/LIC.jpeg" },
                { name: "Elemen Cosmetics", img: "/Sponsers/elemen.jpg" },
                { name: "Safe for wealth", img: "/Sponsers/Save for wealth.jpeg" }
            ]
        },
        {
            type: "Corporate Partners",
            sponsors: [
                { name: "Siddharth Greases", img: "/Sponsers/sidhharth greases.png" },
                { name: "CESS Dynamics", img: "/Sponsers/Cess Dynamics .jpg" },
                { name: "Duality", img: "/Sponsers/duality.png" },
                { name: "Engineered Packaging", img: "/Sponsers/Engineered Packaging Solutions.jpeg" }
            ]
        }
    ];

    const pastSponsors = [
        { name: "Adobe", img: "/Past_Sponsers/Adobe_icon.png" },
        { name: "Qualcomm", img: "/Past_Sponsers/Qualcomm.png" },
        { name: "Suzuki", img: "/Past_Sponsers/Suzuki.png" },
        { name: "GeeksforGeeks", img: "/Past_Sponsers/gfg.png" },
        { name: "HDFC Bank", img: "/Past_Sponsers/hdfc.png" },
        { name: "TVS", img: "/Past_Sponsers/TVS.png" },
        { name: "Chess.com", img: "/Past_Sponsers/chess.png" },
        { name: "Bank Of Baroda", img: "/Past_Sponsers/BankOfBarodo.png" },
    ];

    useEffect(() => {
        if (setFigureStyle) {
            setFigureStyle({ left: "0px", bottom: "0px", transform: "translate(10%, 10%)" });
        }
        setFigureClass?.(`fixed w-[100px] md:w-[150px] lg:w-[180px] pointer-events-none z-[5] opacity-40 drop-shadow-[0_0_30px_rgba(255,215,138,0.3)] transition-all duration-700 ease-out`);
        setLotusClass?.("fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] opacity-10 z-0 pointer-events-none");
    }, [setLotusClass, setFigureClass, setFigureStyle]);

    return (
        <div className="w-full h-screen relative flex flex-col items-center overflow-hidden">

            {/* Header Section - SHIFTED DOWN GENTLY */}
            <div className="z-10 text-center pt-12 md:pt-20 mb-2 px-4 shrink-0">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="invictus-heading text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-none text-[#C5A059] drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                >
                    SPONSORS
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-1 text-[#8B6508] font-black tracking-[0.05em] text-[8px] md:text-xs text-center drop-shadow-sm px-4"
                >
                    Our valued partners who power Invictus by supporting innovation and excellence.
                </motion.p>
            </div>

            {/* MAIN SPONSORS HORIZONTAL MARQUEE */}
            <div className="w-full flex-1 flex items-center overflow-hidden z-10 relative">
                <div className="flex w-full overflow-hidden group">
                    {/* Hover to pause animation */}
                    <div className="flex animate-marquee-main hover:[animation-play-state:paused] whitespace-nowrap items-center h-full">
                        {/* Render array twice to create a seamless looping effect */}
                        {[...sponsorCategories, ...sponsorCategories].map((category, index) => (
                            <CategoryGroup
                                key={index}
                                title={category.type}
                                sponsors={category.sponsors}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER PAST SPONSORS MARQUEE */}
            <div className="w-full z-10 relative shrink-0 mb-6">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[#8B6508] via-[#C5A059] to-[#8B6508] px-6 py-1 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.4)] border border-[#FDF8E2]/30 whitespace-nowrap">
                    <h3 className="text-[#FDF8E2] text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
                        PAST SPONSORS
                    </h3>
                </div>

                <div className="w-full bg-black/40 backdrop-blur-md border-y-[2px] border-[#C5A059] py-3 md:py-4 relative">
                    <div className="w-full overflow-hidden group">
                        <div className="flex space-x-6 md:space-x-8 animate-marquee-fast whitespace-nowrap">
                            {[...pastSponsors, ...pastSponsors, ...pastSponsors].map((s, i) => (
                                <div key={i} className="shrink-0">
                                    <div className="flex flex-col items-center justify-center p-1.5 bg-white/10 backdrop-blur-sm border border-[#C5A059]/30 rounded-lg w-[90px] md:w-[120px]">
                                        <div className="bg-[#FDF8E2]/90 border-[1.5px] border-[#C5A059] flex items-center justify-center overflow-hidden rounded-md mb-1.5 w-full h-[55px] md:h-[65px]">
                                            <img src={s.img} alt={s.name} className="w-[80%] h-[80%] object-contain" />
                                        </div>
                                        <span className="font-bold text-[#FDF8E2] text-[7px] md:text-[8px] uppercase tracking-wider">{s.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee-main {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-fast {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }

                /* Animation for main sponsors (Slow so users can read) */
                .animate-marquee-main {
                    animation: marquee-main 60s linear infinite;
                    width: max-content;
                }

                /* Animation for past sponsors (SLOWED DOWN from 30s to 40s) */
                .animate-marquee-fast {
                    animation: marquee-fast 40s linear infinite;
                    width: max-content;
                }
            `}</style>
        </div>
    );
}