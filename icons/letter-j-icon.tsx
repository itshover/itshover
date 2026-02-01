import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterJIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Fishing hook swings side to side
      animate(
        ".j-hook",
        { rotate: [0, 15, -15, 10, -10, 5, 0] },
        { duration: 0.7, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(".j-hook", { rotate: 0 }, { duration: 0.2 });
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
        <motion.g className="j-hook" style={{ transformOrigin: "14px 4px" }}>
          {/* Top serif */}
          <motion.path d="M10 4H18" />

          {/* Stem */}
          <motion.path d="M14 4V16" />

          {/* Hook curve */}
          <motion.path d="M14 16C14 18.2091 12.2091 20 10 20H8" />
        </motion.g>
      </motion.svg>
    );
  },
);

LetterJIcon.displayName = "LetterJIcon";
export default LetterJIcon;
