import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BalloonIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".balloon-icon",
        { y: [0, -3, 0] },
        { duration: 1.0, ease: "easeInOut" },
      );
      animate(
        ".balloon-path",
        { pathLength: [0, 1] },
        { duration: 1.0, ease: "easeInOut" },
      );
      animate(
        ".balloon-knot",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.6, delay: 0.4, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(".balloon-icon", { y: 0 }, { duration: 0.5, ease: "easeOut" });
      animate(".balloon-path", { pathLength: 1 }, { duration: 0.5 });
      animate(
        ".balloon-knot",
        { pathLength: 1, opacity: 1 },
        { duration: 0.5 },
      );
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

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
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g
          className="balloon-icon"
          style={{ transformOrigin: "12px 22px" }}
        >
          {/* Left Outer */}
          <motion.path
            className="balloon-path"
            d="M 12 18 C 9.53846 18 4 14 4 8.93333 C 4 5.10416 7.58172 2 12 2"
          />
          {/* Right Outer */}
          <motion.path
            className="balloon-path"
            d="M 12 18 C 14.4615 18 20 14 20 8.93333 C 20 5.10416 16.4183 2 12 2"
          />

          {/* Left Inner */}
          <motion.path
            className="balloon-path"
            d="M 12 18 C 11.0769 18 9 14 9 8.93333 C 9 5.10416 10.3431 2 12 2"
          />
          {/* Right Inner */}
          <motion.path
            className="balloon-path"
            d="M 12 18 C 12.9231 18 15 14 15 8.93333 C 15 5.10416 13.6569 2 12 2"
          />

          {/* Knot */}
          <motion.path
            className="balloon-knot"
            d="M9 20C9 19.535 9 19.3025 9.05111 19.1118C9.18981 18.5941 9.59413 18.1898 10.1118 18.0511C10.3025 18 10.535 18 11 18H13C13.465 18 13.6975 18 13.8882 18.0511C14.4059 18.1898 14.8102 18.5941 14.9489 19.1118C15 19.3025 15 19.535 15 20C15 20.465 15 20.6975 14.9489 20.8882C14.8102 21.4059 14.4059 21.8102 13.8882 21.9489C13.6975 22 13.465 22 13 22H11C10.535 22 10.3025 22 10.1118 21.9489C9.59413 21.8102 9.18981 21.4059 9.05111 20.8882C9 20.6975 9 20.465 9 20Z"
          />
        </motion.g>
      </motion.svg>
    );
  },
);

BalloonIcon.displayName = "BalloonIcon";

export default BalloonIcon;
