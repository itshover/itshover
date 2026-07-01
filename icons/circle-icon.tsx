import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CircleIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // collapse to a dot at the top, then elongate all the way around into a
      // full circle.
      await animate(
        ".circle-draw",
        { pathLength: 0 },
        { duration: 0.12, ease: "easeInOut" },
      );
      await animate(
        ".circle-draw",
        { pathLength: 1 },
        { duration: 0.6, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(
        ".circle-draw",
        { pathLength: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div ref={scope} onHoverStart={start} onHoverEnd={stop}>
        <motion.svg
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
        >
          <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
          {/* rotate -90° so the draw begins at the top and sweeps clockwise */}
          <motion.circle
            cx="12"
            cy="12"
            r="9"
            className="circle-draw"
            style={{ rotate: -90, transformOrigin: "center" }}
          />
        </motion.svg>
      </motion.div>
    );
  },
);

CircleIcon.displayName = "CircleIcon";

export default CircleIcon;
