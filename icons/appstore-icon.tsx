import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";
import { stagger } from "motion";

/**
 * AppStoreIcon
 */
const AppStoreIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const brandColor = "#007aff";

    const start = useCallback(async () => {
      await animate(
        "path:not(.bg-none)",
        { pathLength: 0, opacity: 0, stroke: color },
        { duration: 0 },
      );

      animate(
        "path:not(.bg-none)",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.8, ease: "easeInOut", delay: stagger(0.15) },
      );

      const transitionConfig = {
        duration: 1.6,
        times: [0, 0.4, 1],
        ease: "easeInOut" as const,
      };

      const strokeKeyframes = { stroke: [color, brandColor, color] };
      animate(
        "path:not(.bg-none)",
        strokeKeyframes as Record<string, string[]>,
        { ...transitionConfig, delay: 0.3 },
      );
    }, [animate, color]);

    const stop = useCallback(() => {
      animate(
        "path:not(.bg-none)",
        { stroke: color, pathLength: 1, opacity: 1 },
        { duration: 0.3 },
      );
    }, [animate, color]);

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
        className={`cursor-pointer overflow-visible ${className}`}
      >
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        {/* 外圈 */}
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />

        {/* 支架线条 A (左侧斜线) */}
        <path d="M8 16l1.106 -1.99m1.4 -2.522l2.494 -4.488" />

        {/* 支架线条 B (底部横线) */}
        <path d="M7 14h5m2.9 0h2.1" />

        {/* 支架线条 C (右侧斜线) */}
        <path d="M16 16l-2.51 -4.518m-1.487 -2.677l-1 -1.805" />
      </motion.svg>
    );
  },
);

AppStoreIcon.displayName = "AppStoreIcon";

export default AppStoreIcon;
