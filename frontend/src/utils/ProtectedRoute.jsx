import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login"); // replace avoids history flicker
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return null; // or loader
  }

  if (!user) {
    return null;
  }

  return children;
}
