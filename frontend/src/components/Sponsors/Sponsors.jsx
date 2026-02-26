import React, { useEffect } from "react";
import { motion } from "framer-motion";

/* ---------------- 1. SPONSOR CARD ---------------- */
const SponsorCard = ({ name, img }) => (
    <div className="flex flex-col items-center justify-center p-1.5 bg-white/10 backdrop-blur-md border border-[#C5A059]/40 rounded-lg hover:bg-white/20 transition-all duration-300 group shadow-lg w-full">
        <div className="bg-[#FDF8E2]/90 border-[1px] border-[#C5A059] flex items-center justify-center overflow-hidden rounded-md mb-1.5 w-full aspect-[4/3] md:aspect-square relative">
            {img ? (
                <img
                    src={img}
                    alt={name}
                    className="w-[70%] h-[70%] object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.currentTarget.src = "";
                        e.currentTarget.style.display = "none";
                    }}
                />
            ) : (
                <span className="text-[#8B6508] text-[9px] font-bold uppercase tracking-widest opacity-60">
                    {name}
                </span>
            )}
        </div>
        <span className="font-bold text-[#FDF8E2] drop-shadow-md text-[9px] md:text-[11px] uppercase tracking-widest truncate w-full text-center">
            {name}
        </span>
    </div>
);

/* ---------------- 2. SMALLER PARTNER BOX ---------------- */
const MediumPartnerBox = ({ title, partner }) => (
    <div className="relative w-full max-w-[200px] md:max-w-[240px]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[#8B6508] via-[#C5A059] to-[#8B6508] px-3 py-0.5 rounded-sm shadow-[0_0_8px_rgba(197,160,89,0.3)] border border-[#FDF8E2]/30 whitespace-nowrap">
            <h3 className="text-[#FDF8E2] text-[9px] md:text-[10px] font-black tracking-[0.15em] uppercase">
                {title}
            </h3>
        </div>

        <div className="p-3 pt-7 border-[2px] border-[#C5A059] bg-black/40 backdrop-blur-xl rounded-xl shadow-[0_0_30px_rgba(197,160,89,0.1)] flex justify-center">
            <SponsorCard name={partner.name} img={partner.img} />
        </div>
    </div>
);

/* ---------------- 3. MAIN PAGE ---------------- */
export default function Sponsors({ setLotusClass, setFigureClass, setFigureStyle }) {

    const platformPartner = { name: "Unstop", img: "/Sponsers/unstop.png" };

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
        <div className="w-full h-screen relative flex flex-col items-center overflow-hidden px-4">

            {/* Header Section */}
            <div className="z-10 text-center pt-15 md:pt-20 mb-4">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="invictus-heading text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] leading-none text-[#C5A059] drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                >
                    SPONSORS
                </motion.h1>

                {/* Subheading - Made DARKER and BOLDER */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 text-[#8B6508] font-black tracking-[0.05em] text-[7px] md:text-[13px] lg:text-sm whitespace-nowrap text-center w-full drop-shadow-sm"
                >
                    Our valued partners who power Invictus by supporting innovation and excellence.
                </motion.p>
            </div>

            {/* Main Section */}
            <div className="w-full flex flex-col items-center px-6 z-10 mt-1 md:mt-2">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <MediumPartnerBox title="Platform Partner" partner={platformPartner} />

                    {/* More Coming Soon - BIGGER and MORE VISIBLE */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-5 px-8 py-2 bg-black/80 border-[1.5px] border-[#C5A059] rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                    >
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FDF8E2] to-[#D4AF37] font-black tracking-[0.4em] text-[10px] md:text-sm uppercase italic">
                            More coming soon...
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* FOOTER MARQUEE SECTION */}
            <div className="mt-auto mb-6 w-full z-10 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-[#8B6508] via-[#C5A059] to-[#8B6508] px-6 py-1 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.4)] border border-[#FDF8E2]/30 whitespace-nowrap">
                    <h3 className="text-[#FDF8E2] text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
                        PAST SPONSORS
                    </h3>
                </div>

                <div className="w-full bg-black/40 backdrop-blur-md border-y-[2px] border-[#C5A059] py-4 md:py-6 relative">
                    <div className="w-full overflow-hidden group">
                        <div className="flex space-x-8 animate-marquee whitespace-nowrap">
                            {[...pastSponsors, ...pastSponsors, ...pastSponsors].map((s, i) => (
                                <div key={i} className="shrink-0">
                                    <div className="flex flex-col items-center justify-center p-2 bg-white/10 backdrop-blur-sm border border-[#C5A059]/30 rounded-lg w-[110px] md:w-[140px]">
                                        <div className="bg-[#FDF8E2]/90 border-[1.5px] border-[#C5A059] flex items-center justify-center overflow-hidden rounded-md mb-1.5 w-full h-[65px] md:h-[75px]">
                                            <img src={s.img} alt={s.name} className="w-[80%] h-[80%] object-contain" />
                                        </div>
                                        <span className="font-bold text-[#FDF8E2] text-[8px] md:text-[9px] uppercase tracking-wider">{s.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </div>
    );
}