import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PawPrintIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // 1. Reset for the stamp
      animate(
        ".paw-inner",
        { opacity: 0, scale: 1.5, y: -20 },
        { duration: 0 },
      );

      // 2. Fast Drop & Impact
      await animate(
        ".paw-inner",
        { y: 0, opacity: 1, scale: 1 },
        { duration: 0.15, ease: [0.33, 1, 0.68, 1] }, // Crisp entry
      );

      // 3. Rubber Squash & Micro-Bounce
      await animate(
        ".paw-inner",
        {
          scale: [1, 0.75, 1.1, 1],
          y: [0, -1, 0],
        },
        { duration: 0.3, ease: "easeInOut" },
      );

      // 4. Ink Absorption (Subtle bleed and fade)
      animate(
        ".paw-inner",
        {
          opacity: 0.6,
          scale: 1.03,
        },
        { duration: 0.5, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".paw-inner", { opacity: 1, scale: 1, y: 0 }, { duration: 0.3 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g className="paw-inner" style={{ transformOrigin: "center" }}>
          <circle
            cx="11"
            cy="4"
            r="2"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <circle
            cx="18"
            cy="8"
            r="2"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <circle
            cx="20"
            cy="16"
            r="2"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <path
            d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

PawPrintIcon.displayName = "PawPrintIcon";
export default PawPrintIcon;
