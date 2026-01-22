import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterSIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Snake slither - wiggles in serpentine motion
      animate(
        ".s-shape",
        {
          x: [0, 2, -2, 2, -1, 0],
          rotate: [0, 3, -3, 2, -1, 0],
        },
        { duration: 0.5, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(".s-shape", { x: 0, rotate: 0 }, { duration: 0.2 });
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
          className="s-shape"
          d="M18 6C18 6 16 4 12 4C8 4 6 6 6 8C6 10 8 11 12 12C16 13 18 14 18 16C18 18 16 20 12 20C8 20 6 18 6 18"
          style={{ transformOrigin: "12px 12px" }}
        />
      </motion.svg>
    );
  },
);

LetterSIcon.displayName = "LetterSIcon";
export default LetterSIcon;
