import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterIIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Pillar drop - I drops down and bounces
      animate(
        ".i-shape",
        { y: [0, 3, -1, 1, 0], scaleY: [1, 0.95, 1.02, 0.99, 1] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".i-shape", { y: 0, scaleY: 1 }, { duration: 0.2 });
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
          className="i-shape"
          d="M8 4H16M12 4V20M8 20H16"
          style={{ transformOrigin: "12px 20px" }}
        />
      </motion.svg>
    );
  },
);

LetterIIcon.displayName = "LetterIIcon";
export default LetterIIcon;
