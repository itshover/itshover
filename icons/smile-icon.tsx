import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SmileIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Waggle the face
      animate(
        ".smile-icon",
        { rotate: [0, -5, 5, -5, 5, 0] },
        { duration: 0.5, ease: "easeInOut" },
      );
      // Draw the smile from left to right
      animate(
        ".smile-path",
        { pathLength: [0, 1] },
        { duration: 0.5, ease: "easeOut" },
      );
      // Make the eyes blink
      animate(
        ".smile-eye",
        { scaleY: [1, 0.1, 1] },
        { duration: 0.2, delay: 0.2 },
      );
    };

    const stop = () => {
      animate(".smile-icon", { rotate: 0 }, { duration: 0.2 });
      animate(".smile-path", { pathLength: 1 }, { duration: 0.2 });
      animate(".smile-eye", { scaleY: 1 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.svg
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g className="smile-icon" style={{ transformOrigin: "center" }}>
          <circle cx="12" cy="12" r="10" />
          <motion.path className="smile-path" d="M8 14s1.5 2 4 2 4-2 4-2" />
          <motion.line
            className="smile-eye"
            x1="9"
            x2="9.01"
            y1="9"
            y2="9"
            style={{ transformOrigin: "9px 9px" }}
          />
          <motion.line
            className="smile-eye"
            x1="15"
            x2="15.01"
            y1="9"
            y2="9"
            style={{ transformOrigin: "15px 9px" }}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

SmileIcon.displayName = "SmileIcon";

export default SmileIcon;
