import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const TailwindIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".wave-1",
        { x: [-2, 2, -2] },
        { duration: 1.5, ease: "easeInOut", repeat: Infinity },
      );
      animate(
        ".wave-2",
        { x: [2, -2, 2] },
        { duration: 1.5, ease: "easeInOut", repeat: Infinity },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".wave-1", { x: 0 }, { duration: 0.5 });
      animate(".wave-2", { x: 0 }, { duration: 0.5 });
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
          <path
            d="M12 4C7 4 3 7 3 10C3 13 5 13 5 15C5 17 7 20 12 20C17 20 21 17 21 15C21 13 19 13 19 10C19 7 15 4 12 4Z"
            className="wave-1"
          />
          <path
            d="M12 8C9 8 7 10 7 12C7 14 8 14 8 15C8 16 9 18 12 18C15 18 16 16 16 15C16 14 17 14 17 12C17 10 15 8 12 8Z"
            className="wave-2"
            fill={color}
            style={{ opacity: 0.5 }}
          />
        </svg>
      </motion.div>
    );
  },
);

TailwindIcon.displayName = "TailwindIcon";
export default TailwindIcon;
