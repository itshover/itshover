import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandAwsIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".smile",
        {
          pathOffset: 1,
          opacity: [0, 1],
          pathLength: 1,
        },
        {
          duration: 0.1,
          ease: "easeInOut",
        },
      );

      await animate(
        ".smile",
        { pathOffset: 0 },
        { duration: 0.45, ease: "easeInOut" },
      );

      await animate(
        ".arrowhead",
        { scale: [0.8, 1.15, 1], opacity: [0, 1] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {};

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
        className={`cursor-pointer select-none ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        {/* Smile + Arrow */}
        <motion.g className="smile-group">
          <motion.path
            className="smile"
            d="M17 18.5a15.198 15.198 0 0 1 -7.37 1.44a14.62 14.62 0 0 1 -6.63 -2.94"
          />
          <motion.path
            className="arrowhead"
            d="M19.5 21c.907 -1.411 1.451 -3.323 1.5 -5c-1.197 -.773 -2.577 -.935 -4 -1"
          />
        </motion.g>

        <motion.g className="text">
          <path d="M3 11v-4.5a1.5 1.5 0 0 1 3 0v4.5" />
          <path d="M3 9h3" />
          <path d="M9 5l1.2 6l1.8 -4l1.8 4l1.2 -6" />
          <path d="M18 10.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" />
        </motion.g>
      </motion.svg>
    );
  },
);

BrandAwsIcon.displayName = "BrandAwsIcon";
export default BrandAwsIcon;
