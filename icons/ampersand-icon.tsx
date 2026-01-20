import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const AmpersandIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 40, className = "", color = "currentColor", strokeWidth = "2" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate("path", { pathLength: [0, 1] }, { duration: 0.6 });
    };

    const stop = async () => {
      animate("path", { pathLength: 1 }, { duration: 0.3 });
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
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        color={color}
        className={`cursor-pointer ${className}`}
      >
        <path d="M16 12h3" />
        <path d="M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13" />
      </motion.svg>
    );
  },
);

AmpersandIcon.displayName = "AmpersandIcon";

export default AmpersandIcon;
