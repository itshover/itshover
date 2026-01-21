"use client";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const FacebookIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
      await animate(
        ".fb-path",
        { scale: [1, 0.9, 1.05, 1] },
        { duration: 0.5, ease: "easeInOut" },
      );
      animate(
        ".fb-like",
        { y: [-10, 0], opacity: [0, 1, 0] },
        { duration: 0.6, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".fb-path",
        { scale: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(
        ".fb-like",
        { scale: 1, y: 0, opacity: 0 },
        { duration: 0.2, ease: "easeInOut" },
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
        style={{ overflow: "visible" }}
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          className="fb-path"
          d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
          style={{ transformOrigin: "center" }}
        />
        <motion.text
          className="fb-like"
          x="12"
          y="2"
          textAnchor="middle"
          fontSize="10"
          fill={color}
          opacity={0}
        >
          👍
        </motion.text>
      </motion.svg>
    );
  },
);

FacebookIcon.displayName = "FacebookIcon";
export default FacebookIcon;
