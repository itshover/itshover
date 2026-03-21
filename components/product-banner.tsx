"use client";
import React, { useState, useEffect } from "react";
import { LINKS } from "@/constants";
import Link from "next/link";

export const ProductBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("banner_dismissed")) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="bg-primary relative flex w-full flex-wrap items-center justify-center gap-2 px-12 py-2 text-black text-xs sm:text-sm font-semibold">
      {"Hold "}
      <Link
        href={LINKS.BAGS}
        target="_blank"
        className="font-bold underline underline-offset-2 hover:opacity-70"
      >
        {"$HOVER tokens"}
      </Link>
      {" to unlock premium features — or burn them instantly for access."}
      <div className="flex items-center gap-2 ml-1">
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
        onClick={() => {
          setShow(false);
          sessionStorage.setItem("banner_dismissed", "true");
        }}
        style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}
        className="cursor-pointer text-lg font-bold text-black/50 hover:text-black"
        aria-label="Close"
      >
        {"×"}
      </button>
    </div>
  );
};
