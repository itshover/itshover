import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterKIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Upper arm kicks up
      animate(
        ".arm-upper",
        { rotate: [0, -20, 0], x: [0, 3, 0] },
        { duration: 0.3, ease: "easeOut" },
      );

      // Lower arm (leg) kicks down
      animate(
        ".arm-lower",
        { rotate: [0, 20, 0], x: [0, 3, 0] },
        { duration: 0.3, ease: "easeOut", delay: 0.1 },
      );
    };

    const stop = () => {
      animate(".arm-upper, .arm-lower", { rotate: 0, x: 0 }, { duration: 0.2 });
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

        {/* Upper arm - kicks up */}
        <motion.path
          className="arm-upper"
          d="M6 12L18 4"
          style={{ transformOrigin: "6px 12px" }}
        />

        {/* Lower arm (leg) - kicks down */}
        <motion.path
          className="arm-lower"
          d="M6 12L18 20"
          style={{ transformOrigin: "6px 12px" }}
        />
      </motion.svg>
    );
  },
);

LetterKIcon.displayName = "LetterKIcon";
export default LetterKIcon;
