import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const GridLoaderIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".grid-dot",
        {
          r: [3, 0, 3],
          opacity: [1, 0, 1],
        },
        {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: (i) => i * 0.2,
        },
      );
    };

    const stop = () => {
      animate(
        ".grid-dot",
        { r: 3, opacity: 1 },
        { duration: 0.3, ease: "easeOut" },
      );
    };

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
      >
        <motion.g style={{ transformOrigin: "center" }}>
          <motion.circle className="grid-dot" cx="7" cy="7" r="3" custom={0} />
          <motion.circle className="grid-dot" cx="17" cy="7" r="3" custom={1} />
          <motion.circle
            className="grid-dot"
            cx="17"
            cy="17"
            r="3"
            custom={2}
          />
          <motion.circle className="grid-dot" cx="7" cy="17" r="3" custom={3} />
        </motion.g>
      </motion.svg>
    );
  },
);

GridLoaderIcon.displayName = "GridLoaderIcon";
export default GridLoaderIcon;
