"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy fake checkout — redirect to real shipping checkout */
export default function LegacyCheckoutRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/checkout");
  }, [router]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <p className="text-gray-500">Redirecting to checkout...</p>
    </div>
  );
}
