"use client";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

export type UnorderedListIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

const UnorderedListIcon = forwardRef<
  UnorderedListIconHandle,
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
      // Lines extend from left to right
      animate(
        ".list-line-1",
        {
          scaleX: [0, 1],
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );

      animate(
        ".list-line-2",
        {
          scaleX: [0, 1],
        },
        {
          duration: 0.25,
          ease: "easeOut",
          delay: 0.1,
        },
      );

      animate(
        ".list-line-3",
        {
          scaleX: [0, 1],
        },
        {
          duration: 0.25,
          ease: "easeOut",
          delay: 0.2,
        },
      );

      // Bullets pulse
      animate(
        ".list-bullets",
        {
          scale: [1, 1.3, 1],
        },
        {
          duration: 0.4,
          ease: "easeInOut",
        },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".list-line-1",
        {
          scaleX: 1,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
        },
      );

      animate(
        ".list-line-2",
        {
          scaleX: 1,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
        },
      );

      animate(
        ".list-line-3",
        {
          scaleX: 1,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
        },
      );

      animate(
        ".list-bullets",
        {
          scale: 1,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
        },
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

        {/* List lines */}
        <motion.path
          d="M9 6l11 0"
          className="list-line-1"
          style={{ transformOrigin: "9px 6px" }}
        />
        <motion.path
          d="M9 12l11 0"
          className="list-line-2"
          style={{ transformOrigin: "9px 12px" }}
        />
        <motion.path
          d="M9 18l11 0"
          className="list-line-3"
          style={{ transformOrigin: "9px 18px" }}
        />

        {/* Bullets */}
        <motion.g className="list-bullets">
          <path d="M5 6l0 .01" />
          <path d="M5 12l0 .01" />
          <path d="M5 18l0 .01" />
        </motion.g>
      </motion.svg>
    );
  },
);

UnorderedListIcon.displayName = "UnorderedListIcon";
export default UnorderedListIcon;
