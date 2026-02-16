import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const Cloud3Icon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      animate(
        ".status-dot",
        { opacity: [1, 0.4, 1] },
        {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: (i: number) => i * 0.3,
        },
      );
      animate(
        "path.cloud-path",
        { scale: [1, 1.01, 1] },
        { duration: 2, repeat: Infinity, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".status-dot", { opacity: 1 }, { duration: 0.3 });
      animate("path.cloud-path", { scale: 1 }, { duration: 0.3 });
    }, [animate]);

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
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.path
          className="cloud-path"
          d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
          style={{ transformOrigin: "center" }}
        />
        <motion.circle
          className="status-dot"
          cx="9"
          cy="15"
          r="0.5"
          fill={color}
          custom={0}
        />
        <motion.circle
          className="status-dot"
          cx="12"
          cy="15"
          r="0.5"
          fill={color}
          custom={1}
        />
        <motion.circle
          className="status-dot"
          cx="15"
          cy="15"
          r="0.5"
          fill={color}
          custom={2}
        />
      </motion.svg>
    );
  },
);

Cloud3Icon.displayName = "Cloud3Icon";
export default Cloud3Icon;
