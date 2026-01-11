import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function GoogleCallback() {
  const router = useRouter();
  const { handleGoogleCallback } = useContext(AuthContext);

  useEffect(() => {
    const { accessToken, refreshToken } = router.query;
    if (!accessToken) return;

    (async () => {
      const res = await handleGoogleCallback(accessToken, refreshToken);
      console.log(res);
      if (res?.success) {
        router.replace("/Dashboard");
      } else {
        router.replace("/login");
      }
    })();
  }, [router.query]);

  return null;
}
