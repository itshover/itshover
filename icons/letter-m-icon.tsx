import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterMIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Mountain pulse - peaks push up
      animate(
        ".m-shape",
        { y: [0, -2, 0], scaleY: [1, 1.05, 1] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".m-shape", { y: 0, scaleY: 1 }, { duration: 0.2 });
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
          className="m-shape"
          d="M4 20V4L12 14L20 4V20"
          style={{ transformOrigin: "12px 20px" }}
        />
      </motion.svg>
    );
  },
);

LetterMIcon.displayName = "LetterMIcon";
export default LetterMIcon;
