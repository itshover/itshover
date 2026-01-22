import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterAIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Left leg rises from ground
      animate(
        ".leg-left",
        { y: [10, 0], opacity: [0, 1] },
        { duration: 0.25, ease: "easeOut" },
      );

      // Right leg rises from ground
      animate(
        ".leg-right",
        { y: [10, 0], opacity: [0, 1] },
        { duration: 0.25, ease: "easeOut", delay: 0.1 },
      );

      // Crossbar appears with flash
      animate(
        ".crossbar",
        { scaleX: [0, 1.2, 1], opacity: [0, 1] },
        { duration: 0.3, ease: "easeOut", delay: 0.2 },
      );
    };

    const stop = () => {
      animate(".leg-left, .leg-right", { y: 0, opacity: 1 }, { duration: 0.2 });
      animate(".crossbar", { scaleX: 1, opacity: 1 }, { duration: 0.2 });
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
        {/* Left leg of A */}
        <motion.path
          className="leg-left"
          d="M12 4L6 20"
          style={{ transformOrigin: "6px 20px" }}
        />
        {/* Right leg of A */}
        <motion.path
          className="leg-right"
          d="M12 4L18 20"
          style={{ transformOrigin: "18px 20px" }}
        />
        {/* Crossbar */}
        <motion.path
          className="crossbar"
          d="M8 14H16"
          style={{ transformOrigin: "12px 14px" }}
        />
      </motion.svg>
    );
  },
);

LetterAIcon.displayName = "LetterAIcon";
export default LetterAIcon;
