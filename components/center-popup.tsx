"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LINKS } from "@/constants";
import RocketIcon from "@/icons/rocket-icon";
import UsersIcon from "@/icons/users-icon";
import XIcon from "@/icons/x-icon";
import SparklesIcon from "@/icons/sparkles-icon";
import Link from "next/link";

export const CenterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("center_popup_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("center_popup_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
          />
          {/* Popup card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="dark:bg-zinc-950 fixed inset-x-4 top-1/2 z-[80] mx-auto max-w-md -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
          >
            {/* Gradient strip */}
            <div className="from-primary/80 to-primary h-1 w-full bg-gradient-to-r" />

            <div className="p-6">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                  <SparklesIcon className="text-primary" size={20} />
                </div>
                <button
                  onClick={dismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XIcon size={18} />
                </button>
              </div>

              {/* Content */}
              <h2 className="text-foreground mb-1 text-lg font-bold tracking-tight">
                Wanna unlock the full thing?
              </h2>
              <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                You&apos;re currently on the{" "}
                <span className="font-semibold text-foreground">free tier</span>. Hold{" "}
                <Link
                  href={LINKS.BAGS}
                  target="_blank"
                  className="text-primary font-semibold underline underline-offset-2 hover:opacity-70"
                >
                  $HOVER tokens
                </Link>{" "}
                to unlock AI builder, custom themes, and export. Or burn them on
                the tools site for instant access.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href={LINKS.HOLDERS}
                  target="_blank"
                  onClick={dismiss}
                  className="bg-primary hover:bg-primary/90 flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-black transition-colors"
                >
                  <UsersIcon size={16} />
                  View Holders
                </Link>
                <Link
                  href={LINKS.TOOLS}
                  target="_blank"
                  onClick={dismiss}
                  className="border-border hover:bg-muted flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors"
                >
                  <RocketIcon size={16} />
                  Try Tools
                </Link>
              </div>

              {/* Dismiss */}
              <button
                onClick={dismiss}
                className="text-muted-foreground hover:text-foreground mt-3 block w-full text-center text-xs transition-colors"
              >
                No thanks, I&apos;ll stay on free
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
