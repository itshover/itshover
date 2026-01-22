import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterFIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Flag wave animation - both arms wave like a flag
      animate(
        ".arm-top",
        { rotate: [0, 5, -3, 4, -2, 0], y: [0, -1, 1, -0.5, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );

      animate(
        ".arm-middle",
        { rotate: [0, 4, -2, 3, -1, 0], y: [0, -0.5, 0.5, -0.3, 0] },
        { duration: 0.6, ease: "easeInOut", delay: 0.05 },
      );
    };

    const stop = () => {
      animate(".arm-top, .arm-middle", { rotate: 0, y: 0 }, { duration: 0.2 });
    };

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
        {/* Vertical stem */}
        <motion.path d="M6 4V20" />

        {/* Top arm (flag) */}
        <motion.path
          className="arm-top"
          d="M6 4H18"
          style={{ transformOrigin: "6px 4px" }}
        />

        {/* Middle arm */}
        <motion.path
          className="arm-middle"
          d="M6 12H14"
          style={{ transformOrigin: "6px 12px" }}
        />
      </motion.svg>
    );
  },
);

LetterFIcon.displayName = "LetterFIcon";
export default LetterFIcon;
