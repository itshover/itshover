"use client";
import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

export type ExternalLinkIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

const ExternalLinkIcon = forwardRef<ExternalLinkIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // Arrow moves up and right (going external)
      animate(
        ".external-arrow",
        {
          x: 2,
          y: -2,
          scale: 1.1,
        },
        {
          duration: 0.3,
          ease: "easeOut",
        },
      );

      // Box slightly shrinks
      animate(
        ".external-box",
        {
          scale: 0.95,
        },
        {
          duration: 0.3,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".external-arrow, .external-box",
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
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        {/* Box/window */}
        <motion.path
          d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"
          className="external-box"
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Arrow pointing out */}
        <motion.g
          className="external-arrow"
          style={{ transformOrigin: "50% 50%" }}
        >
          <path d="M11 13l9 -9" />
          <path d="M15 4h5v5" />
        </motion.g>
      </motion.svg>
    );
  },
);

ExternalLinkIcon.displayName = "ExternalLinkIcon";
export default ExternalLinkIcon;
