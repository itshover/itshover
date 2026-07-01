import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PlusIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // horizontal bar starts at its left end, vertical bar at its top end, so
      // pathLength 0 → 1 draws them in from the left and from the top.
      await animate(
        ".plus-draw",
        { pathLength: 0 },
        { duration: 0.12, ease: "easeInOut" },
      );
      await animate(
        ".plus-draw",
        { pathLength: 1 },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(
        ".plus-draw",
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
          <motion.path d="M5 12h14" className="plus-draw" />
          <motion.path d="M12 5v14" className="plus-draw" />
        </motion.svg>
      </motion.div>
    );
  },
);

PlusIcon.displayName = "PlusIcon";

export default PlusIcon;
