import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LogoutIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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

    const start = useCallback(async () => {
      await animate(
        ".logout-arrow, .logout-arrow-bottom",
        {
          x: [0, 6, 0],
        },
        {
          duration: 0.3,
          ease: "easeInOut",
        },
      );
      animate(
        ".logout-door",
        {
          x: [0, -2, 0],
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".logout-arrow, .logout-arrow-bottom, .logout-door",
        { x: 0 },
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
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
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
          <motion.path
            className="logout-door"
            style={{ transformOrigin: "50% 50%" }}
            d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
          />

          <motion.path className="logout-arrow" d="M9 12h12" />

          <motion.path className="logout-arrow-bottom" d="M18 15l3 -3l-3 -3" />
        </svg>
      </motion.div>
    );
  },
);

LogoutIcon.displayName = "LogoutIcon";
export default LogoutIcon;
