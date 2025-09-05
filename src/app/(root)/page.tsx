"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function Redirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/chat/new");
  }, [router]);
  return null;
}

export default Redirect;
