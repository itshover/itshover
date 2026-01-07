"use client";
import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

export type BookmarkIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

const BookmarkIcon = forwardRef<BookmarkIconHandle, AnimatedIconProps>(
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

    const start = async () => {
      await animate(
        ".bookmark-body",
        {
          scaleY: 0.9,
          y: 2,
        },
        {
          duration: 0.18,
          ease: "easeOut",
        },
      );
    };

    const stop = async () => {
      await animate(
        ".bookmark-body",
        {
          scaleY: 1,
          y: 0,
        },
        {
          duration: 0.18,
          ease: "easeInOut",
        },
      );
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.div
        ref={scope}
        onHoverStart={disableHover ? undefined : handleHoverStart}
        onHoverEnd={disableHover ? undefined : handleHoverEnd}
        className={`inline-flex cursor-pointer ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
          strokeLinecap="square"
        >
          <motion.path
            className="bookmark-body"
            style={{ transformOrigin: "50% 20%" }}
            d="M24 34L41 44V8C41 5.23858 38.7614 3 36 3H12C9.23858 3 7 5.23858 7 8V44L24 34Z"
          />
        </svg>
      </motion.div>
    );
  },
);

BookmarkIcon.displayName = "BookmarkIcon";

export default BookmarkIcon;
