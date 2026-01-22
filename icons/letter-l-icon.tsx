import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterLIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Boot stomp - horizontal part drops down with impact
      await animate(
        ".l-base",
        { y: [0, -3, 5, -2, 0], scaleY: [1, 1.1, 0.9, 1.05, 1] },
        { duration: 0.4, ease: "easeOut" },
      );

      // Stem reacts to stomp
      animate(
        ".l-stem",
        { scaleY: [1, 0.98, 1.01, 1] },
        { duration: 0.3, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".l-base, .l-stem", { y: 0, scaleY: 1 }, { duration: 0.2 });
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
        <motion.path
          className="l-stem"
          d="M6 4V20"
          style={{ transformOrigin: "6px 20px" }}
        />

        {/* Base (boot) */}
        <motion.path
          className="l-base"
          d="M6 20H18"
          style={{ transformOrigin: "6px 20px" }}
        />
      </motion.svg>
    );
  },
);

LetterLIcon.displayName = "LetterLIcon";
export default LetterLIcon;
