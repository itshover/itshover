import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

/**
 * TiktokIcon
 * Glitch Style
 */
const TiktokIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        "path:not(.bg-none)",
        { pathLength: 0, opacity: 0, x: 0, y: 0 },
        { duration: 0 },
      );

      animate(
        ".main-path",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 1.5, ease: "easeInOut" },
      );

      animate(
        ".cyan-path",
        { pathLength: [0, 1], opacity: [0, 0.7, 0], x: -2, y: -1 },
        { duration: 1.5, ease: "easeInOut", delay: 0.1 },
      );

      animate(
        ".red-path",
        { pathLength: [0, 1], opacity: [0, 0.7, 0], x: 2, y: 1 },
        { duration: 1.5, ease: "easeInOut", delay: 0.2 },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".main-path",
        { pathLength: 1, opacity: 1, x: 0, y: 0 },
        { duration: 0.5 },
      );
      animate(".cyan-path, .red-path", { opacity: 0 }, { duration: 0.3 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    const pathData =
      "M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917";

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
        style={{ filter: "drop-shadow(0 0 2px rgba(255,255,255,0.1))" }}
      >
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        <motion.path
          className="cyan-path"
          d={pathData}
          stroke="#00f2ea"
          strokeWidth={strokeWidth}
        />

        <motion.path
          className="red-path"
          d={pathData}
          stroke="#ff0050"
          strokeWidth={strokeWidth}
        />

        <motion.path className="main-path" d={pathData} />
      </motion.svg>
    );
  },
);

TiktokIcon.displayName = "TiktokIcon";

export default TiktokIcon;
