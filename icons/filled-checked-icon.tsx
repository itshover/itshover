import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";
import React from "react";

const FilledCheckedIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();
  const hoverAnimation = async () => {
    // Scale up SVG and animate circle
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

    // Pulse the filled circle
    animate(
      ".filled-circle",
      {
        scale: 1.15,
        opacity: 0.8,
      },
      {
        duration: 0.15,
        ease: "easeOut",
      },
    );

    // Reset checkmark path
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

    // Animate circle back while drawing checkmark
    animate(
      ".filled-circle",
      {
        scale: 1,
        opacity: 1,
      },
      {
        duration: 0.3,
        ease: "easeInOut",
      },
    );

    // Draw checkmark
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

    // Scale SVG back to normal
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className=""
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {/* Filled Circle */}
        <motion.path
          d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336z"
          className={`filled-circle ${className}`}
          style={{ transformOrigin: "center" }}
        />
        {/* Checkmark */}
        <motion.path
          d="M15.707 9.293a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
          className="check-icon text-background"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
};

export default FilledCheckedIcon;
