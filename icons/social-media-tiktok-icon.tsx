import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

interface CustomTikTokProps extends AnimatedIconProps {
  opacity?: number;
  hoverOpacity?: number;
}

const TikTokIcon = forwardRef<AnimatedIconHandle, CustomTikTokProps>(
  (
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 2.25,
      className = "",
      opacity = 1,
      hoverOpacity = 1,
      style, // Destructure style to merge safely
      ...svgProps // Collect all remaining standard SVG / HTML attributes
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // Step 1: Zoom in and tilt to the right (clockwise)
      await animate(
        scope.current,
        { scale: 1.25, rotate: 12, opacity: hoverOpacity },
        { duration: 0.2, ease: "easeOut" },
      );

      // Step 2: Tilt to the left (counter-clockwise) in the same spot
      await animate(
        scope.current,
        { rotate: -12 },
        { duration: 0.18, ease: "easeInOut" },
      );

      // Step 3: Zoom back out to the original rest scale and reset rotation
      await animate(
        scope.current,
        { scale: 1, rotate: 0 },
        { duration: 0.2, ease: "easeIn" },
      );
    }, [animate, scope, hoverOpacity]);

    const stop = useCallback(() => {
      animate(
        scope.current,
        { scale: 1, rotate: 0, opacity: opacity },
        { duration: 0.15, ease: "easeOut" },
      );
    }, [animate, scope, opacity]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        // 1. Spread standard props FIRST so internal controllers take precedence
        {...svgProps}
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://w3.org"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        style={{
          // 2. Spread incoming styles so users can pass inline layouts externally
          ...style,
          transformOrigin: "center center",
          opacity: opacity,
        }}
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </motion.svg>
    );
  },
);

TikTokIcon.displayName = "TikTokIcon";
export default TikTokIcon;
