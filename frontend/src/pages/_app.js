import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/NavBar/Navbar";
import CommonLotus from "@/utils/commonLotus";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  const [lotusStyle, setLotusStyle] = useState({});
  const [lotusClass, setLotusClass] = useState(
    "top-0 left-0 w-[180px] opacity-100"
  );
  const router = useRouter();

  return (
    <>
    <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`}
        strategy="beforeInteractive"
      />
    <AuthProvider>
      
      {router.pathname === '/model' ? null : <Navbar />}
       {router.pathname === '/model' ? null : <CommonLotus className={lotusClass} style={lotusStyle} />}

      <Component {...pageProps} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} />
    </AuthProvider>

    </>
  );
}
