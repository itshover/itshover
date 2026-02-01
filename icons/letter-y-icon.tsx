import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterYIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Yoyo drop animation
      animate(
        ".y-stem",
        { scaleY: [1, 1.2, 0.9, 1.1, 1] },
        { duration: 0.4, ease: "easeOut" },
      );
      animate(".y-arms", { y: [0, -2, 0] }, { duration: 0.3, ease: "easeOut" });
    };

    const stop = () => {
      animate(".y-stem, .y-arms", { scaleY: 1, y: 0 }, { duration: 0.2 });
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
        <motion.path className="y-arms" d="M7 4l5 9l5 -9" />
        <motion.path
          className="y-stem"
          d="M12 13l0 7"
          style={{ transformOrigin: "12px 13px" }}
        />
      </motion.svg>
    );
  },
);

LetterYIcon.displayName = "LetterYIcon";
export default LetterYIcon;
