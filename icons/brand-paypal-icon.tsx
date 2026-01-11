import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandPaypalIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(".p-back", { x: 2, y: -2 }, { duration: 0.3, ease: "easeOut" });
      await animate(
        ".p-front",
        { x: -2, y: 2 },
        { duration: 0.3, ease: "easeOut" },
      );
      animate(".p-back", { x: 0, y: 0 }, { duration: 0.3, ease: "easeIn" });
      animate(".p-front", { x: 0, y: 0 }, { duration: 0.3, ease: "easeIn" });
    };

    const stop = () => {
      animate(".p-back", { x: 0, y: 0 }, { duration: 0.2 });
      animate(".p-front", { x: 0, y: 0 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.svg
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          className="p-front"
          d="M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1"
        />
        <motion.path
          className="p-back"
          d="M17.5 7.2c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a.5 .5 0 0 1 -.5 -.6l.2 -1.4"
        />
      </motion.svg>
    );
  },
);

BrandPaypalIcon.displayName = "BrandPaypalIcon";

export default BrandPaypalIcon;
