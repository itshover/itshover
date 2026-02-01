import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterQIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Tail wag animation
      animate(
        ".q-body",
        { rotate: [0, 2, -2, 1, 0] },
        { duration: 0.4, ease: "easeOut" },
      );
      animate(
        ".q-tail",
        { rotate: [0, 20, -15, 10, 0] },
        { duration: 0.5, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".q-body, .q-tail", { rotate: 0 }, { duration: 0.2 });
    };

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
          className="q-body"
          d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6"
          style={{ transformOrigin: "12px 12px" }}
        />
        <motion.path
          className="q-tail"
          d="M13 15l5 5"
          style={{ transformOrigin: "13px 15px" }}
        />
      </motion.svg>
    );
  },
);

LetterQIcon.displayName = "LetterQIcon";
export default LetterQIcon;
