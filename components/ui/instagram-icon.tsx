"use client";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const InstagramIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 2,
      className = "",
      disableHover = false,
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".ig-body",
        { scale: [1, 1.05, 1] },
        { duration: 0.3, ease: "easeOut" },
      );
      await animate(
        ".ig-lens",
        { scale: [1, 1.2, 1] },
        { duration: 0.25, ease: "easeOut" },
      );
      animate(
        ".ig-dot",
        { opacity: [1, 0, 1] },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".ig-body, .ig-lens, .ig-dot",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex cursor-pointer ${className}`}
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            className="ig-body"
            style={{ transformOrigin: "50% 50%" }}
            d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"
          />

          <motion.path
            className="ig-lens"
            style={{ transformOrigin: "50% 50%" }}
            d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"
          />

          <motion.path className="ig-dot" d="M16.5 7.5v.01" />
        </svg>
      </motion.div>
    );
  },
);

InstagramIcon.displayName = "InstagramIcon";
export default InstagramIcon;
