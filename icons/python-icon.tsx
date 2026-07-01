import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PythonIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".snake-top",
        { x: [0, -1, 1, 0], y: [0, -1, 1, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
      animate(
        ".snake-bottom",
        { x: [0, 1, -1, 0], y: [0, 1, -1, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
      await animate(
        ".eyes",
        { scale: [1, 1.5, 1] },
        { duration: 0.4, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".snake-top, .snake-bottom, .eyes",
        { x: 0, y: 0, scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
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
        <motion.path
          className="snake-top"
          d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3"
        />
        <motion.path
          className="snake-bottom"
          d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3"
        />
        <motion.path
          className="snake-top"
          d="M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4"
        />
        <motion.path
          className="eyes"
          style={{ transformOrigin: "11 6" }}
          d="M11 6l0 .01"
        />
        <motion.path
          className="eyes"
          style={{ transformOrigin: "13 18" }}
          d="M13 18l0 .01"
        />
      </motion.svg>
    );
  },
);

PythonIcon.displayName = "PythonIcon";
export default PythonIcon;
