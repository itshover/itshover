import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CornerDownRightIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      animate(
        ".arrow-group",
        { x: [0, 4, 0] },
        { duration: 0.45, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".arrow-group", { x: 0 }, { duration: 0.2, ease: "easeOut" });
    }, [animate]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: start,
        stopAnimation: stop,
      }),
      [start, stop],
    );

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
        aria-hidden="true"
      >
        <motion.g className="arrow-group">
          <motion.path d="M4 4v7a4 4 0 0 0 4 4h12" />
          <motion.path d="m15 10 5 5-5 5" />
        </motion.g>
      </motion.svg>
    );
  },
);

CornerDownRightIcon.displayName = "CornerDownRightIcon";
export default CornerDownRightIcon;
