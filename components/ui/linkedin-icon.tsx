"use client";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LinkedinIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
        ".border",
        { scale: [1, 1.05, 1] },
        { duration: 0.4, ease: "easeInOut" },
      );
      await animate(
        ".lines",
        { pathLength: [0, 1] },
        { duration: 0.5, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".lines, .border",
        { pathLength: 1, scale: 1 },
        { duration: 0.2 },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
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
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          className="lines"
          d="M8 11v5"
          initial={{ pathLength: 1 }}
        />
        <motion.path
          className="lines"
          d="M8 8v.01"
          initial={{ pathLength: 1 }}
        />
        <motion.path
          className="lines"
          d="M12 16v-5"
          initial={{ pathLength: 1 }}
        />
        <motion.path
          className="lines"
          d="M16 16v-3a2 2 0 1 0 -4 0"
          initial={{ pathLength: 1 }}
        />
        <motion.path
          className="border"
          d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    );
  },
);

LinkedinIcon.displayName = "LinkedinIcon";
export default LinkedinIcon;
