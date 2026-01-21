import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const UsersGroupIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
      // Center user bounces
      animate(
        ".user-center",
        {
          y: -2,
          scale: 1.05,
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );

      // Left user moves slightly left
      animate(
        ".user-left",
        {
          x: -1,
          scale: 1.02,
        },
        {
          duration: 0.3,
          ease: "easeOut",
          delay: 0.05,
        },
      );

      // Right user moves slightly right
      animate(
        ".user-right",
        {
          x: 1,
          scale: 1.02,
        },
        {
          duration: 0.3,
          ease: "easeOut",
          delay: 0.05,
        },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".user-center",
        {
          x: 0,
          y: 0,
          scale: 1,
        },
        {
          duration: 0.25,
          ease: "easeInOut",
        },
      );

      animate(
        ".user-left",
        {
          x: 0,
          y: 0,
          scale: 1,
        },
        {
          duration: 0.25,
          ease: "easeInOut",
        },
      );

      animate(
        ".user-right",
        {
          x: 0,
          y: 0,
          scale: 1,
        },
        {
          duration: 0.25,
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

        {/* Center user */}
        <motion.g className="user-center">
          <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
        </motion.g>

        {/* Right user */}
        <motion.g className="user-right">
          <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M17 10h2a2 2 0 0 1 2 2v1" />
        </motion.g>

        {/* Left user */}
        <motion.g className="user-left">
          <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
        </motion.g>
      </motion.svg>
    );
  },
);

UsersGroupIcon.displayName = "UsersGroupIcon";
export default UsersGroupIcon;
