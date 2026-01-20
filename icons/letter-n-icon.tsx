import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterNIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Diagonal slash animation
      animate(
        ".n-shape",
        { rotate: [0, 3, -2, 1, 0] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".n-shape", { rotate: 0 }, { duration: 0.2 });
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
          className="n-shape"
          d="M4 20V4L20 20V4"
          style={{ transformOrigin: "12px 12px" }}
        />
      </motion.svg>
    );
  },
);

LetterNIcon.displayName = "LetterNIcon";
export default LetterNIcon;
