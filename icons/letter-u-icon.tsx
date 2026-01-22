import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterUIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Cup fill - liquid fills up from bottom
      animate(
        ".u-fill",
        {
          pathLength: [0, 1],
          opacity: [0.5, 1],
        },
        { duration: 0.6, ease: "easeOut" },
      );

      // Slight scale on the U shape
      animate(
        ".u-shape",
        { scaleY: [1, 1.02, 1] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".u-fill", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
      animate(".u-shape", { scaleY: 1 }, { duration: 0.2 });
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
          className="u-shape u-fill"
          d="M6 4V14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14V4"
          style={{ transformOrigin: "12px 20px" }}
        />
      </motion.svg>
    );
  },
);

LetterUIcon.displayName = "LetterUIcon";
export default LetterUIcon;
