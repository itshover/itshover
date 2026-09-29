import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ArrowLeftRightIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".alr-draw",
        { pathLength: 0 },
        { duration: 0.12, ease: "easeInOut" },
      );
      await animate(
        ".alr-draw",
        { pathLength: 1 },
        { duration: 0.4, ease: "easeOut" },
      );
      // a small outward nudge, like a transfer completing
      animate(
        ".alr-right",
        { x: [0, 3, 0] },
        { duration: 0.45, ease: "easeInOut" },
      );
      animate(
        ".alr-left",
        { x: [0, -3, 0] },
        { duration: 0.45, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(
        ".alr-draw",
        { pathLength: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(".alr-right, .alr-left", { x: 0 }, { duration: 0.2 });
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
          style={{ overflow: "visible" }}
        >
          <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.g className="alr-right">
            <motion.path d="M20 7H4" className="alr-draw" />
            <motion.path d="M16 3l4 4l-4 4" className="alr-draw" />
          </motion.g>
          <motion.g className="alr-left">
            <motion.path d="M4 17h16" className="alr-draw" />
            <motion.path d="M8 21l-4-4l4-4" className="alr-draw" />
          </motion.g>
        </motion.svg>
      </motion.div>
    );
  },
);

ArrowLeftRightIcon.displayName = "ArrowLeftRightIcon";

export default ArrowLeftRightIcon;
