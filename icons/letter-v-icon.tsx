import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterVIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Victory thrust - shoots upward like a victory gesture
      animate(
        ".v-shape",
        {
          y: [0, -5, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".v-shape", { y: 0, scale: 1, rotate: 0 }, { duration: 0.2 });
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
        <motion.g className="v-shape" style={{ transformOrigin: "12px 20px" }}>
          {/* Left arm */}
          <motion.path d="M4 4L12 20" />

          {/* Right arm */}
          <motion.path d="M12 20L20 4" />
        </motion.g>
      </motion.svg>
    );
  },
);

LetterVIcon.displayName = "LetterVIcon";
export default LetterVIcon;
