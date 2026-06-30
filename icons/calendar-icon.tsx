import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CalendarIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Calendar flip animation
      await animate(
        ".calendar-body",
        { rotateX: [0, 15, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );

      // Date highlight pulse
      animate(
        ".date-highlight",
        { scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] },
        { duration: 0.6, ease: "easeOut" },
      );

      // Days bounce effect
      animate(
        ".day-dot",
        { y: [0, -2, 0] },
        { duration: 0.4, ease: "easeOut", delay: 0.1 },
      );
    };

    const stop = () => {
      animate(".calendar-body", { rotateX: 0 }, { duration: 0.3 });
      animate(".date-highlight", { scale: 1, opacity: 0.3 }, { duration: 0.3 });
      animate(".day-dot", { y: 0 }, { duration: 0.3 });
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
      <motion.div
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.g
            className="calendar-body"
            style={{ transformOrigin: "center" }}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />

            <rect x="4" y="5" width="16" height="16" rx="2" />

            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="8" y1="3" x2="8" y2="7" />

            <line x1="4" y1="11" x2="20" y2="11" />

            <motion.line className="day-dot" x1="8" y1="14" x2="8" y2="14" />
            <motion.line className="day-dot" x1="12" y1="14" x2="12" y2="14" />
            <motion.line className="day-dot" x1="16" y1="14" x2="16" y2="14" />
            <motion.line className="day-dot" x1="8" y1="18" x2="8" y2="18" />
            <motion.line className="day-dot" x1="12" y1="18" x2="12" y2="18" />

            <motion.circle
              className="date-highlight"
              cx="12"
              cy="14"
              r="1.5"
              fill="none"
              initial={{ opacity: 0.3 }}
            />
          </motion.g>
        </svg>
      </motion.div>
    );
  },
);

CalendarIcon.displayName = "CalendarIcon";

export default CalendarIcon;
