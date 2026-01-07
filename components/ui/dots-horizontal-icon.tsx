"use client";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

export type DotsHorizontalIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

const DotsHorizontalIcon = forwardRef<
  DotsHorizontalIconHandle,
  AnimatedIconProps
>(
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
        ".dot-left",
        {
          x: [-2, 0],
          scale: [1, 1.2, 1],
        },
        {
          duration: 0.3,
          ease: "easeOut",
        },
      );

      animate(
        ".dot-center",
        {
          scale: [1, 1.3, 1],
        },
        {
          duration: 0.3,
          delay: 0.1,
          ease: "easeOut",
        },
      );

      animate(
        ".dot-right",
        {
          x: [2, 0],
          scale: [1, 1.2, 1],
        },
        {
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".dot-left, .dot-center, .dot-right",
        { x: 0, scale: 1 },
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
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <motion.path
          d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
          className="dot-left"
          style={{ transformOrigin: "50% 50%" }}
        />

        <motion.path
          d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
          className="dot-center"
          style={{ transformOrigin: "50% 50%" }}
        />

        <motion.path
          d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
          className="dot-right"
          style={{ transformOrigin: "50% 50%" }}
        />
      </motion.svg>
    );
  },
);

DotsHorizontalIcon.displayName = "DotsHorizontalIcon";
export default DotsHorizontalIcon;
