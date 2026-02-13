import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LocateIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // 1. Snappy Appearance of center target
      animate(
        ".locate-target",
        { opacity: 1, scale: 1 },
        { duration: 0.3, ease: "backOut" },
      );
      // 2. Subtle rotation for mechanical feel
      animate(
        ".locate-crosshairs",
        { rotate: 90 },
        { duration: 0.3, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".locate-target",
        { opacity: 0, scale: 0 },
        { duration: 0.2, ease: "easeIn" },
      );
      animate(
        ".locate-crosshairs",
        { rotate: 0 },
        { duration: 0.3, ease: "easeInOut" },
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
        style={{ overflow: "visible" }}
      >
        <motion.g
          className="locate-crosshairs"
          style={{ transformOrigin: "center" }}
        >
          <line x1="2" x2="5" y1="12" y2="12" />
          <line x1="19" x2="22" y1="12" y2="12" />
          <line x1="12" x2="12" y1="2" y2="5" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </motion.g>

        {/* Ring */}
        <circle cx="12" cy="12" r="7" />

        {/* The "Fix" Target - Appears on Hover */}
        <motion.circle
          className="locate-target"
          cx="12"
          cy="12"
          r="3"
          initial={{ opacity: 0, scale: 0 }}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    );
  },
);

LocateIcon.displayName = "LocateIcon";
export default LocateIcon;
