import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "framer-motion";

/**
 * NetflixIcon
 */
const NetflixIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          duration: 1.5,
          ease: "easeInOut",
          delay: stagger(0.2),
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        "path:not(.bg-none)",
        { pathLength: 1, opacity: 1 },
        { duration: 0.5 },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    useEffect(() => {
      start();
    }, [start]);

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
        style={{ filter: "drop-shadow(0 0 8px rgba(229, 9, 20, 0.2))" }}
      >
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        {/* 左侧垂直线条 */}
        <path d="M5 3v18h4v-10.5" />

        {/* 右侧垂直线条 */}
        <path d="M19 21v-18h-4v10.5" />

        {/* 中间连接斜杠 */}
        <path d="M9 3l10 18h-4l-10 -18l4 0" />
      </motion.svg>
    );
  },
);

NetflixIcon.displayName = "NetflixIcon";

export default NetflixIcon;
