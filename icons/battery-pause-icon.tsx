"use client";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BatteryPauseIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2.5, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      animate(".battery-pause-1", { opacity: 1 }, { duration: 0 });
      animate(".battery-pause-2", { opacity: 1 }, { duration: 0 });
      animate(".battery-pause-3", { opacity: 0 }, { duration: 0 });
      animate(".battery-pause-4", { opacity: 0 }, { duration: 0 });
    }, [animate]);

    const start = async () => {
      await animate(
        ".battery-pause-3",
        { opacity: 1 },
        { duration: 0.15, ease: "easeOut" },
      );

      await animate(
        ".battery-pause-4",
        { opacity: 1 },
        { duration: 0.15, ease: "easeOut" },
      );
    };

    const stop = async () => {
      await animate(
        ".battery-pause-3, .battery-pause-4",
        { opacity: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.div
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className={`inline-flex cursor-pointer ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        >
          <motion.path
            className="battery-pause-bar battery-pause-1"
            d="M10 31V17"
          />
          <motion.path
            className="battery-pause-bar battery-pause-2"
            d="M17 31V17"
          />
          <motion.path
            initial={{
              opacity: 0,
            }}
            className="battery-pause-bar battery-pause-3"
            d="M24 31V17"
          />
          <motion.path
            initial={{
              opacity: 0,
            }}
            className="battery-pause-bar battery-pause-4"
            d="M31 31V17"
          />

          <motion.path d="M46 20V28" />

          <motion.path d="M37 10H8C5.2386 10 3 12.2386 3 15V33C3 35.7614 5.2386 38 8 38H37C39.7614 38 42 35.7614 42 33V15C42 12.2386 39.7614 10 37 10Z" />
        </svg>
      </motion.div>
    );
  },
);

BatteryPauseIcon.displayName = "BatteryPauseIcon";

export default BatteryPauseIcon;
