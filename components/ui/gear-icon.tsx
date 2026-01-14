import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const GearIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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

    const start = () => {
      animate(".gear-body", { scale: [1, 1.02, 1] }, { duration: 0.6 });

      animate(
        ".gear-center",
        { scale: [1, 1.1, 1] },
        { duration: 0.3, ease: "easeOut" },
      );

      animate(
        ".gear-rotator",
        { rotate: 360 },
        { duration: 0.9, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(".gear-rotator", { rotate: 0 }, { duration: 0.2 });
      animate(".gear-center", { scale: 1 }, { duration: 0.2 });
      animate(".gear-body", { scale: 1 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.svg
        ref={scope}
        onHoverStart={disableHover ? undefined : handleHoverStart}
        onHoverEnd={disableHover ? undefined : handleHoverEnd}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeMiterlimit="10"
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        {/* Rotating group */}
        <motion.g
          className="gear-rotator"
          style={{
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        >
          <motion.circle className="gear-center" cx="16" cy="16" r="5" />

          <motion.path
            className="gear-body"
            d="m30,17.5v-3l-3.388-1.355c-.25-.933-.617-1.815-1.089-2.633l1.436-3.351-2.121-2.121-3.351,1.436c-.817-.472-1.7-.838-2.633-1.089l-1.355-3.388h-3l-1.355,3.388c-.933.25-1.815.617-2.633,1.089l-3.351-1.436-2.121,2.121 1.436,3.351c-.472.817-.838,1.7-1.089,2.633l-3.388,1.355v3l3.388,1.355c.25.933.617,1.815,1.089,2.633l-1.436,3.351 2.121,2.121 3.351-1.436c.817.472 1.7.838 2.633,1.089l1.355,3.388h3l1.355-3.388c.933-.25 1.815-.617 2.633-1.089l3.351,1.436 2.121-2.121-1.436-3.351c.472-.817.838-1.7 1.089-2.633l3.388-1.355Z"
          />
        </motion.g>
      </motion.svg>
    );
  },
);

GearIcon.displayName = "GearIcon";
export default GearIcon;
