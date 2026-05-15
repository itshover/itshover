import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ChartCovariateIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      animate(
        ".trend-line",
        { pathLength: [0, 1] },
        { duration: 0.6, ease: "easeInOut" }
      );
      
      animate(".dot-1", { scale: [1, 1.4, 1] }, { duration: 0.25, delay: 0.1 });
      animate(".dot-2", { scale: [1, 1.4, 1] }, { duration: 0.25, delay: 0.25 });
      animate(".dot-3", { scale: [1, 1.4, 1] }, { duration: 0.25, delay: 0.35 });
      animate(".dot-4", { scale: [1, 1.4, 1] }, { duration: 0.25, delay: 0.5 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".trend-line", { pathLength: 1 }, { duration: 0.2 });
      animate(".dot-1, .dot-2, .dot-3, .dot-4", { scale: 1 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
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
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <path d="M3 3v18h18" />

        <motion.path
          d="M7 17h.01"
          className="dot-1"
          style={{ transformOrigin: "7px 17px" }}
        />
        <motion.path
          d="M12 12h.01"
          className="dot-2"
          style={{ transformOrigin: "12px 12px" }}
        />
        <motion.path
          d="M16 15h.01"
          className="dot-3"
          style={{ transformOrigin: "16px 15px" }}
        />
        <motion.path
          d="M20 8h.01"
          className="dot-4"
          style={{ transformOrigin: "20px 8px" }}
        />

        <motion.path
          d="M3 21 L7 17 L12 12 L16 15 L20 8"
          className="trend-line"
          style={{ pathLength: 1 }} 
        />
      </motion.svg>
    );
  },
);

ChartCovariateIcon.displayName = "ChartCovariateIcon";
export default ChartCovariateIcon;
