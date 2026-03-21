"use client";
import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
  position = "top",
}: {
  className?: string;
  children: React.ReactNode;
  hideOnScroll?: boolean;
  position?: "top" | "bottom";
}) => {
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll && latest > 40) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 z-50 flex min-h-12 w-full items-center justify-center px-4 py-2 transition-all duration-300",
        position === "top" ? "top-0" : "bottom-0",
        position === "bottom" && "mb-4",
        className,
      )}
      initial={{
        y: position === "top" ? -100 : 100,
        opacity: 0,
      }}
      animate={{
        y: visible ? 0 : position === "top" ? -100 : 100,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className="bg-background/80 relative flex w-full max-w-4xl items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md dark:bg-black/60">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/10 opacity-50" />
        {children}
      </div>
    </motion.div>
  );
};
