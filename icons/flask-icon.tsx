import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const FlaskIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(".flask-bubble", { opacity: 0 }, { duration: 0.01 });
      await animate(
        ".flask-draw",
        { pathLength: 0 },
        { duration: 0.12, ease: "easeInOut" },
      );
      await animate(
        ".flask-draw",
        { pathLength: 1 },
        { duration: 0.5, ease: "easeInOut" },
      );
      animate(
        ".flask-bubble",
        { y: [1, -6], opacity: [0, 1, 0] },
        { duration: 0.9, delay: (i: number) => i * 0.14 },
      );
    };

    const stop = () => {
      animate(
        ".flask-draw",
        { pathLength: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(".flask-bubble", { opacity: 0 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div ref={scope} onHoverStart={start} onHoverEnd={stop}>
        <motion.svg
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
        >
          <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path d="M9 3h6" className="flask-draw" />
          <motion.path
            d="M10 3v6.5L5.5 18a1.5 1.5 0 0 0 1.3 2.25h10.4A1.5 1.5 0 0 0 18.5 18L14 9.5V3"
            className="flask-draw"
          />
          <motion.path d="M7.5 15h9" className="flask-draw" />
          <motion.circle
            cx="10.5"
            cy="16"
            r="0.8"
            className="flask-bubble"
            opacity="0"
          />
          <motion.circle
            cx="13.5"
            cy="17"
            r="0.8"
            className="flask-bubble"
            opacity="0"
          />
          <motion.circle
            cx="12"
            cy="15"
            r="0.8"
            className="flask-bubble"
            opacity="0"
          />
        </motion.svg>
      </motion.div>
    );
  },
);

FlaskIcon.displayName = "FlaskIcon";

export default FlaskIcon;
