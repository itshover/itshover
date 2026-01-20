import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LetterWIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // Water wave - peaks ripple like water waves
      animate(
        ".peak-1",
        { y: [0, -3, 0] },
        { duration: 0.4, ease: "easeInOut" },
      );

      animate(
        ".peak-2",
        { y: [0, -3, 0] },
        { duration: 0.4, ease: "easeInOut", delay: 0.1 },
      );

      animate(
        ".peak-3",
        { y: [0, -3, 0] },
        { duration: 0.4, ease: "easeInOut", delay: 0.2 },
      );
    };

    const stop = () => {
      animate(".peak-1, .peak-2, .peak-3", { y: 0 }, { duration: 0.2 });
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
        {/* First down stroke */}
        <motion.path
          className="peak-1"
          d="M4 4L8 20"
          style={{ transformOrigin: "4px 4px" }}
        />

        {/* First valley to peak */}
        <motion.path
          className="peak-2"
          d="M8 20L12 8"
          style={{ transformOrigin: "12px 8px" }}
        />

        {/* Second peak to valley */}
        <motion.path
          className="peak-3"
          d="M12 8L16 20"
          style={{ transformOrigin: "12px 8px" }}
        />

        {/* Last up stroke */}
        <motion.path d="M16 20L20 4" />
      </motion.svg>
    );
  },
);

LetterWIcon.displayName = "LetterWIcon";
export default LetterWIcon;
