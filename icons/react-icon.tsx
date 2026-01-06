import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ReactIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".orbit",
        { rotate: 360 },
        { duration: 2, ease: "linear", repeat: Infinity },
      );
      animate(
        ".core",
        { scale: [1, 1.2, 1] },
        { duration: 1, ease: "easeInOut", repeat: Infinity },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".orbit", { rotate: 0 }, { duration: 0.5 });
      animate(".core", { scale: 1 }, { duration: 0.5 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
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
          <circle cx="12" cy="12" r="2" className="core" fill={color} />
          <g className="orbit">
            <ellipse
              rx="10"
              ry="4.5"
              transform="rotate(0 12 12)"
              cx="12"
              cy="12"
            />
            <ellipse
              rx="10"
              ry="4.5"
              transform="rotate(60 12 12)"
              cx="12"
              cy="12"
            />
            <ellipse
              rx="10"
              ry="4.5"
              transform="rotate(120 12 12)"
              cx="12"
              cy="12"
            />
          </g>
        </svg>
      </motion.div>
    );
  },
);

ReactIcon.displayName = "ReactIcon";
export default ReactIcon;
