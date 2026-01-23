import { useRouter } from "next/router";
import { useLoader } from "@/contexts/LoaderContext";

export default function GlobalLoader() {
  const router = useRouter();
  const { domReady, modelReady } = useLoader();

  const isModelRoute = router.pathname === "/model";

  const isReady = isModelRoute
    ? domReady && modelReady
    : domReady;

  return (
    <div
      className={`fixed inset-0 z-999 bg-black transition-opacity duration-700
        ${isReady ? "opacity-0  pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex h-full items-center justify-center text-white">
        Loading experience…
      </div>
    </div>
  );
}
