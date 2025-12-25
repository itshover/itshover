import { AnimatedIconProps } from "./types";
import React from "react";
import { motion, useAnimate } from "motion/react";

const CheckedIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();
  const hoverAnimation = async () => {
    await animate(
      "svg",
      {
        scale: 1.1,
      },
      {
        duration: 0.1,
        ease: "easeInOut",
      },
    );
    await animate(
      ".check-icon",
      {
        pathLength: 0,
      },
      {
        duration: 0.1,
        ease: "easeInOut",
      },
    );
    await animate(
      ".check-icon",
      {
        pathLength: 1,
      },
      {
        duration: 0.4,
        ease: "easeInOut",
      },
    );

    await animate(
      "svg",
      {
        scale: 1,
      },
      {
        duration: 0.2,
        ease: "easeInOut",
      },
    );
  };
  return (
    <motion.div
      ref={scope}
      onHoverStart={() => {
        hoverAnimation();
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={`cursor-pointer ${className}`}
      >
        <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <motion.path d="M9 12l2 2l4 -4" className="check-icon" />
      </motion.svg>
    </motion.div>
  );
};

export default CheckedIcon;
