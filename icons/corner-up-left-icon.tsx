import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CornerUpLeftIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      animate(
        ".arrow-group",
        { x: [0, -4, 0] },
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
          <motion.path d="M20 20v-7a4 4 0 0 0-4-4H4" />
          <motion.path d="m9 14-5-5 5-5" />
        </motion.g>
      </motion.svg>
    );
  },
);

CornerUpLeftIcon.displayName = "CornerUpLeftIcon";
export default CornerUpLeftIcon;
