import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ArrowBigLeftDashIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 40, className = "", color = "currentColor", strokeWidth = "2" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(".arrow", { x: [0, -4] }, { duration: 0.5 });
      animate(".dash", { opacity: [1, 0.5] }, { duration: 0.5 });
    };

    const stop = async () => {
      animate(".arrow", { x: 0 }, { duration: 0.3 });
      animate(".dash", { opacity: 1 }, { duration: 0.3 });
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
        <motion.path
          className="arrow"
          d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
        />
        <motion.path className="dash" d="M20 9v6" />
      </motion.svg>
    );
  },
);

ArrowBigLeftDashIcon.displayName = "ArrowBigLeftDashIcon";

export default ArrowBigLeftDashIcon;
