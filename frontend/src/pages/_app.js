import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/NavBar/Navbar";
import CommonLotus from "@/utils/commonLotus";
import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  const [lotusStyle, setLotusStyle] = useState({});
  const [lotusClass, setLotusClass] = useState(
    "top-0 left-0 w-[180px] opacity-100"
  );

  return (
    <>
    <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`}
        strategy="beforeInteractive"
      />
    <AuthProvider>
      <Navbar />

      <CommonLotus className={lotusClass} style={lotusStyle} />

      <Component {...pageProps} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} />
    </AuthProvider>

    </>
  );
}
