"use client";
import React, { useState } from "react";
import { LINKS } from "@/constants";
import Link from "next/link";

export const ProductBanner = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("banner_dismissed");
  });

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="bg-primary relative flex w-full flex-wrap items-center justify-center gap-2 px-12 py-2 text-xs font-semibold text-black sm:text-sm">
      {"Hold "}
      <Link
        href={LINKS.BAGS}
        target="_blank"
        className="font-bold underline underline-offset-2 hover:opacity-70"
      >
        {"$HOVER tokens"}
      </Link>
      {" to unlock premium features — or burn them instantly for access."}
      <div className="ml-1 flex items-center gap-2">
        <Link
          href={LINKS.HOLDERS}
          target="_blank"
          className="rounded-md bg-black/20 px-2.5 py-0.5 text-xs font-bold transition-colors hover:bg-black/30"
        >
          {"Holders \u2197"}
        </Link>
        <Link
          href={LINKS.TOOLS}
          target="_blank"
          className="rounded-md bg-black/10 px-2.5 py-0.5 text-xs font-bold transition-colors hover:bg-black/20"
        >
          {"Tools \u2197"}
        </Link>
      </div>
      <button
        onClick={handleDismiss}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        className="cursor-pointer text-lg font-bold text-black/50 hover:text-black"
        aria-label="Close"
      >
        {"×"}
      </button>
    </div>
  );
};
