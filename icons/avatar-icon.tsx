import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const AvatarIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".head",
        { y: [0, 3, -2.5, 0] },
        {
          duration: 0.75,
          ease: "easeInOut",
          times: [0, 0.2, 0.6, 1],
        },
      );
    };

    const stop = () => {
      animate(".head", { y: 0 }, { duration: 0.2 });
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
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g style={{ transformOrigin: "center" }}>
          <circle cx="12" cy="12" r="10" />
          <motion.circle className="head" cx="12" cy="10" r="3" />
          <motion.path
            className="body"
            d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"
            style={{ transformOrigin: "center" }}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

AvatarIcon.displayName = "AvatarIcon";
export default AvatarIcon;
