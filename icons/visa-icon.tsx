import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "motion/react";

/**
 * VisaIcon
 * use Line Drawing
 */
const Visa = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        "path:not(.bg-none)",
        { pathLength: 0, opacity: 0 },
        { duration: 0 },
      );

      await animate(
        "path:not(.bg-none)",
        {
          pathLength: [0, 1],
          opacity: [0, 1],
        },
        {
          duration: 1.2,
          ease: "easeInOut",
          delay: stagger(0.15),
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        "path:not(.bg-none)",
        { pathLength: 1, opacity: 1 },
        { duration: 0.4 },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

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
        className={`cursor-pointer ${className}`}
      >
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        <path d="M3 9h1v6h.5l2.5 -6" />

        <path d="M9 15l1 -6" />

        <path d="M16 9.5a.5 .5 0 0 0 -.5 -.5h-.75c-.721 0 -1.337 .521 -1.455 1.233l-.09 .534a1.059 1.059 0 0 0 1.045 1.233a1.059 1.059 0 0 1 1.045 1.233l-.09 .534a1.476 1.476 0 0 1 -1.455 1.233h-.75a.5 .5 0 0 1 -.5 -.5" />

        <path d="M21 15l-1 -6l-2.5 6" />

        <path d="M18 14h2.7" />
      </motion.svg>
    );
  },
);

Visa.displayName = "Visa";

export default Visa;
