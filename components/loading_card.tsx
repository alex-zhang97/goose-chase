"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function LoadingCard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Preserve query params if you want
      // router.push(`/itinerary?${searchParams.toString()}`);
    }, 1800);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <main className="grid h-screen place-items-center bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      <div className="text-center">
        <motion.div
          className="mx-auto mb-6 h-14 w-14 grid place-items-center rounded-2xl border border-zinc-200"
          initial={{ rotate: 0, opacity: 0, scale: 0.9 }}
          animate={{ rotate: 360, opacity: 1, scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        >
          <span className="text-xl font-semibold">⏳</span>
        </motion.div>
        <h1 className="text-xl font-semibold">Loading your itinerary…</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Hang tight, this won’t take long.
        </p>
        <div className="mt-6 h-2 w-48 mx-auto overflow-hidden rounded-full bg-zinc-100">
          <motion.div
            className="h-full w-1/3 rounded-full bg-zinc-900/80"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ repeat: Infinity, duration: 1.25, ease: "easeInOut" }}
          />
        </div>
      </div>
    </main>
  );
}
