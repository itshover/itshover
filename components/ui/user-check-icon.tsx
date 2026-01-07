"use client";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

export type UserCheckIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

const UserCheckIcon = forwardRef<UserCheckIconHandle, AnimatedIconProps>(
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
      // User bounces slightly
      animate(
        ".user-avatar",
        {
          scale: 1.05,
          y: -1,
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );

      // Checkmark draws in and scales
      animate(
        ".check-mark",
        {
          pathLength: [0, 1],
          scale: 1.1,
        },
        {
          duration: 0.4,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".user-avatar",
        {
          scale: 1,
          y: 0,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
        },
      );

      animate(
        ".check-mark",
        {
          pathLength: 1,
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

        {/* User avatar */}
        <motion.g
          className="user-avatar"
          style={{ transformOrigin: "50% 50%" }}
        >
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
        </motion.g>

        {/* Checkmark */}
        <motion.path
          d="M15 19l2 2l4 -4"
          className="check-mark"
          style={{ transformOrigin: "18px 19px" }}
          initial={{ pathLength: 1 }}
        />
      </motion.svg>
    );
  },
);

UserCheckIcon.displayName = "UserCheckIcon";
export default UserCheckIcon;
