export async function getServerSideProps({ req }) {
  const hasSeenModel = req.cookies?.seenModel;

  if (!hasSeenModel) {
    return {
      redirect: {
        destination: "/Intro",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/Home",
      permanent: false,
    },
  };
}

import React, { useEffect } from 'react'
import { useRouter } from 'next/router';


export default function index() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/Home");
  }, [])
  return (
    <div>index</div>
  )
}
