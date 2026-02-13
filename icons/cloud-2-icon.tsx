import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const Cloud2Icon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      animate(
        "path.cloud-path",
        { y: [0, -1, 0, 1, 0], x: [0, 0.5, 0, -0.5, 0] },
        { duration: 3, repeat: Infinity, ease: "easeInOut" },
      );

      animate(
        ".rain-drop",
        {
          y: [0, 5],
          x: [0, -2],
          opacity: [0, 1, 0],
        },
        {
          duration: 0.6,
          repeat: Infinity,
          ease: "linear",
          delay: (i: number) => i * 0.15,
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate("path.cloud-path", { y: 0, x: 0 }, { duration: 0.3 });
      animate(".rain-drop", { opacity: 0, y: 0, x: 0 }, { duration: 0.3 });
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
        />
        <motion.line
          className="rain-drop"
          x1="10"
          y1="20"
          x2="11"
          y2="22"
          custom={0}
        />
        <motion.line
          className="rain-drop"
          x1="13"
          y1="21"
          x2="14"
          y2="23"
          custom={1}
        />
        <motion.line
          className="rain-drop"
          x1="16"
          y1="20"
          x2="17"
          y2="22"
          custom={2}
        />
      </motion.svg>
    );
  },
);

Cloud2Icon.displayName = "Cloud2Icon";
export default Cloud2Icon;
