import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ArrowDownAZIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 40, className = "", color = "currentColor", strokeWidth = "1" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const swapDistance = 24;

    const start = async () => {
      animate(
        ".text-z",
        {
          y: -swapDistance,
        },
        {
          duration: 0.3,
          ease: "easeInOut",
        },
      );
      animate(
        ".text-a",
        {
          y: swapDistance,
          scale: 1.05,
        },
        {
          duration: 0.3,
          ease: "easeInOut",
        },
      );
    };

    const stop = async () => {
      await animate(
        ".text-z, .text-a",
        {
          y: 0,
          scale: 1,
        },
        {
          duration: 0.3,
          ease: "easeInOut",
        },
      );
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
        viewBox="0 0 48 48"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        color={color}
        className={`cursor-pointer ${className}`}
      >
        <motion.path className="text-line" d="M35.5 3.5V43H32.5V3.5H35.5Z" />

        <motion.path
          className="text-z"
          d="M6.5 26H21.5V29.1627L10.4518 41H21.5V44H6.5V40.8373L17.5482 29H6.5V26Z"
        />

        <motion.path
          className="text-a"
          d="M11.7802 4H16.0532L22.5532 22H18.7V20.1625L13.9469 7H13.8865L9.13335 20.1625V22H5.28021L11.7802 4Z"
        />

        <motion.path className="text-a" d="M19.5 18H8.5V15H19.5V18Z" />

        <motion.path
          className="text-arrow"
          style={{ transformOrigin: "34px 38px" }}
          d="M25 31.8787L34 40.8787L43 31.8787L45.1213 34L34 45.1213L22.8787 34L25 31.8787Z"
        />
      </motion.svg>
    );
  },
);

ArrowDownAZIcon.displayName = "ArrowDownAZIcon";

export default ArrowDownAZIcon;
