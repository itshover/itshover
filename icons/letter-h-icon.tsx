import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterHIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Handshake shake animation
      animate(
        ".h-group",
        { x: [0, 2, -2, 1.5, -1, 0] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".h-group", { x: 0 }, { duration: 0.2 });
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
        <motion.g className="h-group">
          <motion.path d="M17 4l0 16" />
          <motion.path d="M7 12l10 0" />
          <motion.path d="M7 4l0 16" />
        </motion.g>
      </motion.svg>
    );
  },
);

LetterHIcon.displayName = "LetterHIcon";
export default LetterHIcon;
