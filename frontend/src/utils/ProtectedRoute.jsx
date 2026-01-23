import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

export function ProtectedRoute({ children }) {
 const { user, isAdmin, authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || isAdmin)) {
      router.replace("/login");
    }
  }, [authLoading, user, isAdmin, router]);

  if (authLoading) return null;
  if (!user || isAdmin) return null;

  return children;
}

export function AdminProtectedRoute({ children }) {
  const { isAdmin, authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.replace("/login");
    }
  }, [authLoading, isAdmin, router]);

  if (authLoading) return null;
  if (!isAdmin) return null;

  return children;
}

