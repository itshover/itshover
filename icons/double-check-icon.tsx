import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { scaledStrokeWidth } from "./types";
import { motion, useAnimate } from "motion/react";

const DoubleCheckIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        ".check-first",
        {
          pathLength: [0, 1],
          opacity: [0, 1],
        },
        {
          duration: 0.5,
          ease: "easeInOut",
        },
      );

      await animate(
        ".check-second",
        {
          pathLength: [0, 1],
          opacity: [0, 1],
        },
        {
          duration: 0.5,
          ease: "easeInOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".check-first, .check-second",
        { pathLength: 1, opacity: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex cursor-pointer ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          stroke={color}
          strokeWidth={scaledStrokeWidth(strokeWidth, 48)}
          strokeMiterlimit="10"
          strokeLinecap="square"
        >
          <motion.path
            className="check-first"
            style={{ transformOrigin: "19px 25px" }}
            d="M3 26.4L11.8846 39L35 11"
          />

          <motion.path
            className="check-second"
            style={{ transformOrigin: "33px 25px" }}
            d="M45 11L21.8847 39L20.2098 36.6248"
          />
        </svg>
      </motion.div>
    );
  },
);

DoubleCheckIcon.displayName = "DoubleCheckIcon";
export default DoubleCheckIcon;
