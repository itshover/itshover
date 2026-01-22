import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterOIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Portal spin - 3D rotation like a spinning portal
      animate(
        ".o-circle",
        { rotateY: [0, 360] },
        { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      );
    };

    const stop = () => {
      animate(".o-circle", { rotateY: 0 }, { duration: 0.3 });
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
        <motion.circle
          className="o-circle"
          cx="12"
          cy="12"
          r="8"
          style={{ transformOrigin: "12px 12px" }}
        />
      </motion.svg>
    );
  },
);

LetterOIcon.displayName = "LetterOIcon";
export default LetterOIcon;
