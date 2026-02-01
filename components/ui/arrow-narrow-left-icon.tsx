import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ArrowNarrowLeftIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 2,
      className = "",
      disableHover = false,
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Move arrow left and bounce back
      await animate(
        ".arrow-group",
        { x: [0, -4, 0] },
        { duration: 0.4, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(".arrow-group", { x: 0 }, { duration: 0.2 });
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
        onHoverStart={disableHover ? undefined : handleHoverStart}
        onHoverEnd={disableHover ? undefined : handleHoverEnd}
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
        <motion.g className="arrow-group">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </motion.g>
      </motion.svg>
    );
  },
);

ArrowNarrowLeftIcon.displayName = "ArrowNarrowLeftIcon";

export default ArrowNarrowLeftIcon;
