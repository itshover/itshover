import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CornerDownLeftIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        "path",
        { x: [0, -4, 0] },
        { duration: 0.45, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate("path", { x: 0 }, { duration: 0.2, ease: "easeOut" });
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
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.path d="M20 4v7a4 4 0 0 1-4 4H4" />
        <motion.path d="m9 10-5 5 5 5" />
      </motion.svg>
    );
  },
);

CornerDownLeftIcon.displayName = "CornerDownLeftIcon";

export default CornerDownLeftIcon;
