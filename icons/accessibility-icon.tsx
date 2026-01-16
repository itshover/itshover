import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const AccessibilityIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animationControls.current.push(
        animate(
          ".wheel",
          { rotate: [0, 360] },
          { duration: 1, ease: "easeInOut", repeat: Infinity },
        ),
      );
      animate(
        ".person",
        { y: [0, -2, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(".wheel", { rotate: 0 }, { duration: 0.3 });
      animate(".person", { y: 0 }, { duration: 0.2 });
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
        className={`cursor-pointer ${className} `}
      >
        <motion.circle className="person" cx="16" cy="4" r="1" />
        <motion.path className="person" d="m18 19 1-7-6 1" />
        <motion.path className="person" d="m5 8 3-3 5.5 3-2.36 3.5" />
        <motion.g className="wheel" style={{ transformOrigin: "8.5px 17.5px" }}>
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </motion.g>
      </motion.svg>
    );
  },
);

AccessibilityIcon.displayName = "AccessibilityIcon";

export default AccessibilityIcon;
