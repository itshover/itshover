import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const RosetteDiscountIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // 1. Rotate and scale the rosette badge
      animate(
        ".rosette-badge",
        {
          rotate: [0, -8, 8, 0],
          scale: [1, 1.08, 1],
        },
        {
          duration: 0.6,
          ease: "easeInOut",
        },
      );

      // 2. Pulse the discount dots
      animate(
        ".discount-dot",
        {
          scale: [1, 1.5, 1],
          opacity: [1, 0.6, 1],
        },
        {
          duration: 0.5,
          ease: "easeInOut",
        },
      );

      // 3. Draw the diagonal discount line
      await animate(
        ".discount-line",
        {
          pathLength: [0, 1],
          opacity: [0, 1],
        },
        {
          duration: 0.4,
          ease: "easeOut",
        },
      );

      // 4. Subtle settle
      animate(
        ".rosette-badge",
        {
          scale: [1, 0.97, 1],
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      // Reset only relevant properties for each element
      // REMOVED pathLength reset for badge to ensure solid stroke
      animate(".rosette-badge", { rotate: 0, scale: 1 }, { duration: 0.2 });
      animate(".discount-dot", { scale: 1, opacity: 1 }, { duration: 0.2 });
      animate(
        ".discount-line",
        { pathLength: 1, opacity: 1 },
        { duration: 0.2 },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ overflow: "visible" }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            className="rosette-badge"
            style={{ transformOrigin: "center" }}
            d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1z"
          />
          <motion.path
            className="discount-line"
            d="M9 15l6 -6"
            pathLength={1}
          />
          <motion.circle
            className="discount-dot"
            style={{ transformOrigin: "9.5px 9.5px" }}
            cx="9.5"
            cy="9.5"
            r=".5"
            fill="currentColor"
          />
          <motion.circle
            className="discount-dot"
            style={{ transformOrigin: "14.5px 14.5px" }}
            cx="14.5"
            cy="14.5"
            r=".5"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    );
  },
);

RosetteDiscountIcon.displayName = "RosetteDiscountIcon";
export default RosetteDiscountIcon;
