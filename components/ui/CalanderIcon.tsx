import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CalendarIcon = forwardRef<
  AnimatedIconHandle,
  AnimatedIconProps
>(
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

    const start = useCallback(() => {
      // Calendar body
      animate(
        ".calendar-body",
        {
          scale: [1, 1.04, 1],
        },
        {
          duration: 0.5,
          ease: "easeInOut",
        },
      );

      // Header divider
      animate(
        ".calendar-header",
        {
          opacity: [0.6, 1, 0.6],
        },
        {
          duration: 0.4,
          ease: "easeInOut",
        },
      );

      // Selected date
      animate(
        ".calendar-date",
        {
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        },
        {
          duration: 0.45,
          ease: "easeInOut",
          delay: 0.08,
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".calendar-body",
        {
          scale: 1,
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );

      animate(
        ".calendar-header",
        {
          opacity: 1,
        },
        {
          duration: 0.2,
        },
      );

      animate(
        ".calendar-date",
        {
          scale: 1,
          opacity: 1,
        },
        {
          duration: 0.2,
        },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
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
        {/* Calendar body */}
        <motion.rect
          className="calendar-body"
          x="3"
          y="4"
          width="18"
          height="17"
          rx="2"
          style={{
            transformOrigin: "12px 12.5px",
          }}
        />

        {/* Calendar header */}
        <motion.path
          className="calendar-header"
          d="M3 9h18"
        />

        {/* Binding rings */}
        <path d="M8 2v4" />
        <path d="M16 2v4" />

        {/* Date grid */}
        <path d="M7 13h.01" />
        <path d="M12 13h.01" />
        <path d="M17 13h.01" />

        <path d="M7 17h.01" />
        <path d="M12 17h.01" />

        {/* Highlighted date */}
        <motion.circle
          className="calendar-date"
          cx="17"
          cy="17"
          r="1"
          style={{
            transformOrigin: "17px 17px",
          }}
        />
      </motion.svg>
    );
  },
);

CalendarIcon.displayName = "CalendarIcon";

export default CalendarIcon;