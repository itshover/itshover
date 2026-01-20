import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterEIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Top arm extends
      animate(
        ".arm-top",
        { scaleX: [0.3, 1.1, 1] },
        { duration: 0.25, ease: "easeOut" },
      );

      // Middle arm extends
      animate(
        ".arm-middle",
        { scaleX: [0.3, 1.1, 1] },
        { duration: 0.25, ease: "easeOut", delay: 0.1 },
      );

      // Bottom arm extends
      animate(
        ".arm-bottom",
        { scaleX: [0.3, 1.1, 1] },
        { duration: 0.25, ease: "easeOut", delay: 0.2 },
      );
    };

    const stop = () => {
      animate(
        ".arm-top, .arm-middle, .arm-bottom",
        { scaleX: 1 },
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
        {/* Vertical stem */}
        <motion.path d="M6 4V20" />

        {/* Top arm */}
        <motion.path
          className="arm-top"
          d="M6 4H18"
          style={{ transformOrigin: "6px 4px" }}
        />

        {/* Middle arm */}
        <motion.path
          className="arm-middle"
          d="M6 12H16"
          style={{ transformOrigin: "6px 12px" }}
        />

        {/* Bottom arm */}
        <motion.path
          className="arm-bottom"
          d="M6 20H18"
          style={{ transformOrigin: "6px 20px" }}
        />
      </motion.svg>
    );
  },
);

LetterEIcon.displayName = "LetterEIcon";
export default LetterEIcon;
