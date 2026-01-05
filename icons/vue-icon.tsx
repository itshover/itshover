import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const VueIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        ".inner-v",
        { opacity: [1, 0.4, 1], scale: [1, 0.9, 1] },
        { duration: 0.8, ease: "easeInOut", repeat: Infinity },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".inner-v", { opacity: 1, scale: 1 }, { duration: 0.3 });
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
          <path d="M12 18.5L3 5H7.5L12 12L16.5 5H21L12 18.5Z" />
          <path
            d="M12 12L8.5 6.5H15.5L12 12Z"
            className="inner-v"
            fill={color}
            style={{ opacity: 1 }}
          />
        </svg>
      </motion.div>
    );
  },
);

VueIcon.displayName = "VueIcon";
export default VueIcon;
