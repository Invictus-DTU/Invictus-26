import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/NavBar/Navbar";
import CommonLotus from "@/utils/commonLotus";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [lotusStyle, setLotusStyle] = useState({});
  const [lotusClass, setLotusClass] = useState(
    "top-0 left-0 w-[180px] opacity-100"
  );

  return (
    <AuthProvider>
      <Navbar />

      <CommonLotus className={lotusClass} style={lotusStyle} />

      <Component {...pageProps} setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} />
    </AuthProvider>
  );
}
