import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";
import React from "react";

const SimpleCheckedIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Reset path to 0
    await animate(
      ".check-path",
      { pathLength: 0 },
      { duration: 0.1, ease: "easeInOut" },
    );

    // Draw path from 0 to 1
    await animate(
      ".check-path",
      { pathLength: 1 },
      { duration: 0.4, ease: "easeInOut" },
    );
  };

  return (
    <motion.div
      ref={scope}
      onHoverStart={() => {
        hoverAnimation();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className=""
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          d="M5 12l5 5l10 -10"
          className={`check-path ${className}`}
        />
      </svg>
    </motion.div>
  );
};

export default SimpleCheckedIcon;
