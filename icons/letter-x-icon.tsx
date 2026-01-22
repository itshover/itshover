import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterXIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // X-ray flash animation
      animate(
        ".x-stroke-1",
        { opacity: [1, 0.3, 1], scale: [1, 1.05, 1] },
        { duration: 0.3, ease: "easeOut" },
      );
      animate(
        ".x-stroke-2",
        { opacity: [1, 0.3, 1], scale: [1, 1.05, 1] },
        { duration: 0.3, ease: "easeOut", delay: 0.05 },
      );
    };

    const stop = () => {
      animate(
        ".x-stroke-1, .x-stroke-2",
        { opacity: 1, scale: 1 },
        { duration: 0.2 },
      );
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
        <motion.path
          className="x-stroke-1"
          d="M7 4l10 16"
          style={{ transformOrigin: "12px 12px" }}
        />
        <motion.path
          className="x-stroke-2"
          d="M17 4l-10 16"
          style={{ transformOrigin: "12px 12px" }}
        />
      </motion.svg>
    );
  },
);

LetterXIcon.displayName = "LetterXIcon";
export default LetterXIcon;
