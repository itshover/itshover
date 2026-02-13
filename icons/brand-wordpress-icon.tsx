import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandWordPressIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // 1. Orbit Group Rotation: Rotate all internal elements together
      animate(
        ".wp-orbit-group",
        { rotate: 360 },
        { duration: 1, ease: "easeInOut" },
      );

      // 2. Subtle pulse for the whole icon to feel alive
      animate(
        scope.current,
        { scale: 1.02 },
        { duration: 0.3, ease: "easeOut" },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      animate(
        ".wp-orbit-group",
        { rotate: 0 },
        { duration: 0.5, ease: "easeInOut" },
      );
      animate(scope.current, { scale: 1 }, { duration: 0.3, ease: "easeOut" });
    }, [animate, scope]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: start,
        stopAnimation: stop,
      }),
      [start, stop],
    );

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
        {/* Orbit Group: Everything except the circle */}
        <motion.g
          className="wp-orbit-group"
          style={{ originX: "7px", originY: "7px" }}
        >
          {/* Horizontal Bars */}
          <path d="M9.5 9h3" />
          <path d="M4 9h2.5" />

          {/* W Segments */}
          <path d="M11 9l3 11l4 -9" />
          <path d="M5.5 9l3.5 11l3 -7" />

          {/* Ink Flourish */}
          <path d="M18 11c.177 -.528 1 -1.364 1 -2.5c0 -1.78 -.776 -2.5 -1.875 -2.5c-.898 0 -1.125 .812 -1.125 1.429c0 1.83 2 2.058 2 3.571" />
        </motion.g>

        {/* Outer Circle (Static Orbit Path) */}
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      </motion.svg>
    );
  },
);

BrandWordPressIcon.displayName = "BrandWordPressIcon";
export default BrandWordPressIcon;
