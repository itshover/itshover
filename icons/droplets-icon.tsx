import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const DropletsIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
        await animate(
          ".droplet-left",
          { y: [0, -2, 0], scale: [1, 1.08, 1] },
          { duration: 0.5, ease: "easeInOut" },
        );
        if (!isAnimatingRef.current) break;

        await animate(
          ".droplet-right",
          { y: [0, -2, 0], scale: [1, 1.08, 1] },
          { duration: 0.5, ease: "easeInOut" },
        );
        if (!isAnimatingRef.current) break;

        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    }, [animate]);

    const stop = useCallback(() => {
      isAnimatingRef.current = false;
      animate(
        ".droplet-left, .droplet-right",
        { y: 0, scale: 1 },
        { duration: 0.2, ease: "easeOut" },
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
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.path
          className="droplet-left"
          style={{ transformOrigin: "7px 12px" }}
          d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"
        />
        <motion.path
          className="droplet-right"
          style={{ transformOrigin: "14px 12px" }}
          d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"
        />
      </motion.svg>
    );
  },
);

DropletsIcon.displayName = "DropletsIcon";
export default DropletsIcon;
