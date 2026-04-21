"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";

export const VoteBanner = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("vote_banner_dismissed");
  });

  const handleDismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem("vote_banner_dismissed", "true");
  }, []);

  if (!show) return null;

  return (
    <div className="relative flex w-full flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-semibold text-white sm:text-sm">
      <span>Vote for itshover.com in the bags hackathon!</span>
      <Link
        href="https://bags.fm/apps/fc4b6764-2527-41f0-9334-2d2d7ffcb0eb"
        target="_blank"
        className="rounded-md bg-white px-3 py-1 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
      >
        Vote Now →
      </Link>
      <button
        onClick={handleDismiss}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        className="cursor-pointer text-lg font-bold text-white/70 hover:text-white"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};
