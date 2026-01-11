import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandThreadsIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Reset
      animate(scope.current, { scale: 1, rotate: 0 });
      animate(".animated-path", { pathLength: 1, opacity: 1 });

      // Animation
      animate(
        ".animated-path",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 1, ease: "easeInOut" },
      );

      await animate(
        scope.current,
        {
          scale: [0.5, 1.1, 1],
          rotate: [180, -10, 0],
        },
        {
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
        },
      );
    };

    const stop = () => {
      animate(scope.current, { scale: 1, rotate: 0 });
      animate(".animated-path", { pathLength: 1, opacity: 1 });
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.svg
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
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
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          className="animated-path"
          d="M19 7.5c-1.333 -3 -3.667 -4.5 -7 -4.5c-5 0 -8 2.5 -8 9s3.5 9 8 9s7 -3 7 -5s-1 -5 -7 -5c-2.5 0 -3 1.25 -3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5 -1.5 3.5 -5s-2 -4 -3 -4s-1.833 .333 -2.5 1"
        />
      </motion.svg>
    );
  },
);

BrandThreadsIcon.displayName = "BrandThreadsIcon";

export default BrandThreadsIcon;
