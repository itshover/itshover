import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const DownloadIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const isAnimatingRef = useRef(false);

    const start = useCallback(async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      while (isAnimatingRef.current) {
        // 1. Initial Arrow Drop through Tray
        animate(
          ".arrow-head",
          { y: [0, 8, 8, -8, 0], opacity: [1, 0, 0, 0, 1] },
          {
            duration: 1,
            times: [0, 0.4, 0.5, 0.6, 1],
            ease: "easeInOut",
          },
        );

        await animate(
          ".arrow-stem",
          { y: [0, 8, 8, -8, 0], opacity: [1, 0, 0, 0, 1] },
          {
            duration: 1,
            times: [0, 0.3, 0.4, 0.5, 1],
            ease: "easeInOut",
          },
        );

        if (!isAnimatingRef.current) break;

        // 2. Tray "Weight" Pulse
        await animate(
          ".tray",
          { y: [0, 2, 0], scale: [1, 1.05, 1] },
          { duration: 0.3, ease: "easeOut" },
        );

        if (!isAnimatingRef.current) break;

        // Slight pause between cycles
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }, [animate]);

    const stop = useCallback(() => {
      isAnimatingRef.current = false;
      animate(
        ".arrow-head, .arrow-stem, .tray",
        { y: 0, opacity: 1, scale: 1 },
        { duration: 0.3 },
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
        {/* Tray */}
        <motion.path
          className="tray"
          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
          style={{ transformOrigin: "center bottom" }}
        />

        {/* Arrow Stem */}
        <motion.path
          className="arrow-stem"
          d="M12 15V3"
          style={{ transformOrigin: "center" }}
        />

        {/* Arrow Head */}
        <motion.path
          className="arrow-head"
          d="m7 10 5 5 5-5"
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    );
  },
);

DownloadIcon.displayName = "DownloadIcon";
export default DownloadIcon;
