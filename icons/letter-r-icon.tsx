import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterRIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Leg kick animation
      animate(".r-body", { x: [0, 1, 0] }, { duration: 0.3, ease: "easeOut" });
      animate(
        ".r-leg",
        { rotate: [0, 15, 0], x: [0, 2, 0] },
        { duration: 0.3, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".r-body, .r-leg", { rotate: 0, x: 0 }, { duration: 0.2 });
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
        <motion.path className="r-body" d="M7 20v-16h5.5a4 4 0 0 1 0 9h-5.5" />
        <motion.path
          className="r-leg"
          d="M12 13l5 7"
          style={{ transformOrigin: "12px 13px" }}
        />
      </motion.svg>
    );
  },
);

LetterRIcon.displayName = "LetterRIcon";
export default LetterRIcon;
