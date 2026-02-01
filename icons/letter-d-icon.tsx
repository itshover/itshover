import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterDIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Door swing animation - slight 3D rotation
      animate(
        ".d-shape",
        { rotateY: [0, -20, 0], scaleX: [1, 0.9, 1] },
        { duration: 0.4, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(".d-shape", { rotateY: 0, scaleX: 1 }, { duration: 0.2 });
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
        style={{ overflow: "visible", perspective: "100px" }}
      >
        <motion.path
          className="d-shape"
          d="M7 4h6a5 5 0 0 1 5 5v6a5 5 0 0 1 -5 5h-6v-16"
          style={{ transformOrigin: "7px 12px" }}
        />
      </motion.svg>
    );
  },
);

LetterDIcon.displayName = "LetterDIcon";
export default LetterDIcon;
