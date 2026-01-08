import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "framer-motion";

/**
 * ReactIcon
 */
const ReactIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
      await animate(".center-dot", { scale: 0, opacity: 0 }, { duration: 0 });

      animate(
        "path:not(.bg-none)",
        {
          pathLength: [0, 1],
          opacity: [0, 1],
        },
        {
          duration: 0.8,
          ease: "easeInOut",
          delay: stagger(0.15),
        },
      );

      await animate(
        ".center-dot",
        { scale: [0, 1.2, 1], opacity: 1 },
        { duration: 0.5, ease: "backOut", delay: 0.6 },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        "path:not(.bg-none)",
        { pathLength: 1, opacity: 1 },
        { duration: 0.4 },
      );
      animate(".center-dot", { scale: 1, opacity: 1 }, { duration: 0.4 });
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
        className={`cursor-pointer overflow-visible ${className}`}
      >
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
        <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />

        <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
        <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />

        <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
        <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />

        <path
          className="center-dot"
          d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732"
          fill={color}
        />
      </motion.svg>
    );
  },
);

ReactIcon.displayName = "ReactIcon";

export default ReactIcon;
