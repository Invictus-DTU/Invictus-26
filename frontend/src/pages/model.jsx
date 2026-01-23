import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useLoader } from "@/contexts/LoaderContext";

const ModelScene = dynamic(() => import("@/components/Landing/Three/ThreeScene"), {
  ssr: false,
  suspense: true,
});


export default function ModelPage() {
  const { setModelReady } = useLoader();

  useEffect(() => {
  return () => {
    setModelReady(false);
  };
}, []);

  return (
    
    <Suspense fallback={null}>
      <div className="three-wrapper">
        <ModelScene onReady={() => setModelReady(true)} />
      </div>
    </Suspense>
    
  );
}