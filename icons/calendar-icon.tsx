import { forwardRef, useImperativeHandle } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "motion/react";

const CalendarIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Shake animation
      animate(
        ".calendar-body",
        { rotate: [0, -5, 5, -3, 3, 0] },
        { duration: 0.4, ease: "easeInOut" },
      );

      // Dots blinking animation
      await animate(
        ".calendar-dot",
        { opacity: [1, 0, 1], scale: [1, 0.5, 1] },
        { duration: 0.3, delay: stagger(0.1) },
      );
    };

    const stop = () => {
      animate(".calendar-body", { rotate: 0 }, { duration: 0.2 });
      animate(".calendar-dot", { opacity: 1, scale: 1 }, { duration: 0.2 });
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
        style={{ overflow: "visible" }}
      >
        <motion.g className="calendar-body" style={{ transformOrigin: "top" }}>
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="4" y1="10" x2="20" y2="10" />

          {/* Dots */}
          <motion.circle
            className="calendar-dot"
            cx="8"
            cy="14"
            r="1"
            fill="currentColor"
            stroke="none"
          />
          <motion.circle
            className="calendar-dot"
            cx="12"
            cy="14"
            r="1"
            fill="currentColor"
            stroke="none"
          />
          <motion.circle
            className="calendar-dot"
            cx="16"
            cy="14"
            r="1"
            fill="currentColor"
            stroke="none"
          />
          <motion.circle
            className="calendar-dot"
            cx="8"
            cy="18"
            r="1"
            fill="currentColor"
            stroke="none"
          />
          <motion.circle
            className="calendar-dot"
            cx="12"
            cy="18"
            r="1"
            fill="currentColor"
            stroke="none"
          />
          <motion.circle
            className="calendar-dot"
            cx="16"
            cy="18"
            r="1"
            fill="currentColor"
            stroke="none"
          />
        </motion.g>
      </motion.svg>
    );
  },
);

CalendarIcon.displayName = "CalendarIcon";
export default CalendarIcon;
