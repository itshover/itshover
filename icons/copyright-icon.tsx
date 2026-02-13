import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CopyrightIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // Outer Circle Sweep
      animate(
        "circle",
        { pathLength: [1, 0.9, 1], rotate: [0, 360] },
        {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      );

      // Central 'C' Pulse
      animate(
        "path",
        { scale: [1, 1.1, 1] },
        {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate("circle", { pathLength: 1, rotate: 0 }, { duration: 0.3 });
      animate("path", { scale: 1 }, { duration: 0.3 });
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
        style={{ overflow: "visible" }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          style={{ transformOrigin: "center" }}
        />
        <motion.path
          d="M14.83 14.83a4 4 0 1 1 0-5.66"
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    );
  },
);

CopyrightIcon.displayName = "CopyrightIcon";
export default CopyrightIcon;
