import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";

const BugIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 40, className = "", strokeWidth = 2, color = "currentColor" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Wiggle the legs
      animate(
        ".leg-left",
        { x: [-1, 1, -1], rotate: [-5, 5, -5] },
        { duration: 0.2, repeat: 2, ease: "easeInOut" },
      );
      animate(
        ".leg-right",
        { x: [1, -1, 1], rotate: [5, -5, 5] },
        { duration: 0.2, repeat: 2, ease: "easeInOut" },
      );
      // Subtle body shake
      animate(
        ".body",
        { x: [-0.5, 0.5, -0.5] },
        { duration: 0.1, repeat: 2, ease: "easeInOut" },
      );
    };

    const stop = async () => {
      animate(
        ".leg-left, .leg-right, .body",
        { x: 0, rotate: 0 },
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
        color={color}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
        <path
          className="body"
          d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3"
        />
        {/* Left legs */}
        <motion.path className="leg-left" d="M3 13l4 0" />
        <motion.path className="leg-left" d="M4 19l3.35 -2" />
        <motion.path className="leg-left" d="M4 7l3.75 2.4" />
        {/* Right legs */}
        <motion.path className="leg-right" d="M17 13l4 0" />
        <motion.path className="leg-right" d="M20 19l-3.35 -2" />
        <motion.path className="leg-right" d="M20 7l-3.75 2.4" />
        {/* Center line */}
        <path d="M12 20l0 -6" />
      </motion.svg>
    );
  },
);

BugIcon.displayName = "BugIcon";

export default BugIcon;
