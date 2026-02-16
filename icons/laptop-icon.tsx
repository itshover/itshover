import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LaptopIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // Screen brightness increases (scale and opacity)
      animate(
        ".screen-glow",
        { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] },
        { duration: 0.6, ease: "easeOut" },
      );

      // Keyboard subtle press
      animate(
        ".keyboard",
        { y: [0, 1, 0] },
        { duration: 0.4, ease: "easeInOut" },
      );

      // Lid slight movement
      animate(
        ".lid",
        { rotateX: [0, 3, 0] },
        { duration: 0.5, ease: "easeOut" },
      );

      // Power LED blinks
      animate(
        ".led",
        { opacity: [0.5, 1, 0.5] },
        { duration: 0.8, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(".screen-glow", { scale: 1, opacity: 0.7 }, { duration: 0.3 });
      animate(".keyboard", { y: 0 }, { duration: 0.3 });
      animate(".lid", { rotateX: 0 }, { duration: 0.3 });
      animate(".led", { opacity: 0.5 }, { duration: 0.3 });
    }, [animate]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: start,
        stopAnimation: stop,
      }),
      [start, stop],
    );

    return (
      <motion.svg
        ref={scope}
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
        onHoverStart={start}
        onHoverEnd={stop}
      >
        {/* Laptop Base with Keyboard */}
        <motion.rect
          className="keyboard"
          x="3"
          y="15"
          width="18"
          height="3"
          rx="0.8"
          ry="0.8"
          style={{ transformOrigin: "12px 16.5px" }}
        />

        {/* Laptop Lid with Screen */}
        <motion.path
          className="lid"
          d="M5 15 L5 7 C5 5.9 5.9 5 7 5 L17 5 C18.1 5 19 5.9 19 7 L19 15"
          style={{ transformOrigin: "12px 10px" }}
        />

        {/* Screen Glow Effect */}
        <motion.rect
          className="screen-glow"
          x="7"
          y="7"
          width="10"
          height="6"
          rx="0.5"
          ry="0.5"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth * 0.5}
          opacity="0.7"
          initial={{ opacity: 0.7, scale: 1 }}
        />

        {/* Power LED / Status Light */}
        <motion.circle
          className="led"
          cx="19"
          cy="16.5"
          r="0.8"
          fill={color}
          stroke="none"
          opacity="0.5"
          initial={{ opacity: 0.5 }}
        />

        {/* Hinge Details */}
        <motion.line
          className="hinge"
          x1="8"
          y1="15"
          x2="16"
          y2="15"
          strokeWidth={strokeWidth * 0.8}
        />
      </motion.svg>
    );
  },
);

LaptopIcon.displayName = "LaptopIcon";
export default LaptopIcon;