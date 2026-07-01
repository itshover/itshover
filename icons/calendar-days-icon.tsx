import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CalendarDaysIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(".cald-dot", { scale: 0, opacity: 0 }, { duration: 0.01 });
      await animate(
        ".cald-draw",
        { pathLength: 0 },
        { duration: 0.12, ease: "easeInOut" },
      );
      await animate(
        ".cald-draw",
        { pathLength: 1 },
        { duration: 0.5, ease: "easeInOut" },
      );
      animate(
        ".cald-dot",
        { scale: 1, opacity: 1 },
        { duration: 0.25, delay: (i: number) => i * 0.05 },
      );
    };

    const stop = () => {
      animate(
        ".cald-draw",
        { pathLength: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(".cald-dot", { scale: 1, opacity: 1 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div ref={scope} onHoverStart={start} onHoverEnd={stop}>
        <motion.svg
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
        >
          <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            className="cald-draw"
          />
          <motion.path d="M3 10h18" className="cald-draw" />
          <motion.path d="M8 2v4" className="cald-draw" />
          <motion.path d="M16 2v4" className="cald-draw" />
          <motion.path
            d="M8 14h.01"
            className="cald-dot"
            style={{ transformOrigin: "center" }}
          />
          <motion.path
            d="M12 14h.01"
            className="cald-dot"
            style={{ transformOrigin: "center" }}
          />
          <motion.path
            d="M16 14h.01"
            className="cald-dot"
            style={{ transformOrigin: "center" }}
          />
          <motion.path
            d="M8 18h.01"
            className="cald-dot"
            style={{ transformOrigin: "center" }}
          />
          <motion.path
            d="M12 18h.01"
            className="cald-dot"
            style={{ transformOrigin: "center" }}
          />
        </motion.svg>
      </motion.div>
    );
  },
);

CalendarDaysIcon.displayName = "CalendarDaysIcon";

export default CalendarDaysIcon;
