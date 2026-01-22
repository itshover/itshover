import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterTIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Hammer strike - T falls down and strikes
      await animate(
        ".t-shape",
        { rotate: [0, -15, 5, -2, 0], y: [0, -2, 3, 0] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".t-shape", { rotate: 0, y: 0 }, { duration: 0.2 });
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
        <motion.g className="t-shape" style={{ transformOrigin: "12px 4px" }}>
          {/* Top bar (hammer head) */}
          <motion.path d="M4 4H20" />

          {/* Stem (handle) */}
          <motion.path d="M12 4V20" />
        </motion.g>
      </motion.svg>
    );
  },
);

LetterTIcon.displayName = "LetterTIcon";
export default LetterTIcon;
