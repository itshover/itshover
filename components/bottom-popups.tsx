"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import FlameIcon from "@/icons/flame-icon";
import RosetteDiscountCheckIcon from "@/icons/rosette-discount-check-icon";
import SparklesIcon from "@/icons/sparkles-icon";
import XIcon from "@/icons/x-icon";

const POPUPS = [
  {
    icon: <FlameIcon className="text-orange-500" size={16} />,
    text: "🔥 1,240 tokens burned today to unlock tools.",
  },
  {
    icon: <RosetteDiscountCheckIcon className="text-blue-500" size={16} />,
    text: "💎 Pro Badge unlocked: 0x8a...2e now holds 500 HOVER.",
  },
  {
    icon: <SparklesIcon className="text-yellow-500" size={16} />,
    text: "⚡ AI Builder is now used by 45+ elite holders.",
  },
];

export const BottomPopups = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay
    const startTimer = setTimeout(() => setIsVisible(true), 10000);

    // Cycle through popups
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % POPUPS.length);
        setIsVisible(true);
      }, 1000); // Wait for exit animation
    }, 15000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-50 sm:bottom-24 sm:right-8">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="bg-background/80 flex max-w-[280px] items-center gap-3 overflow-hidden rounded-xl border border-white/10 p-3 shadow-2xl backdrop-blur-xl dark:bg-black/60 sm:max-w-xs"
          >
            <div className="bg-white/5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              {POPUPS[currentIndex].icon}
            </div>
            <p className="text-xs font-medium text-white/90">
              {POPUPS[currentIndex].text}
            </p>
            <button
              onClick={() => setIsVisible(false)}
              className="hover:text-white ml-auto text-neutral-500 transition-colors"
            >
              <XIcon size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
