import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const GearIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.3,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // 1. Engage the center (very subtle)
    animate(
      ".gear-body",
      {
        scale: [1, 1.01, 1],
      },
      { duration: 0.6 },
    );

    animate(
      ".gear-center",
      { scale: [1, 1.08, 1] },
      { duration: 0.3, ease: "easeOut" },
    );

    // 2. Mechanical spin: forward, accelerate → decelerate
    await animate(
      ".gear-icon",
      { rotate: [0, 180, 360] },
      {
        duration: 0.9,
        ease: "easeInOut",
      },
    );
  };

  return (
    <motion.div
      ref={scope}
      onHoverStart={hoverAnimation}
      className={`inline-flex cursor-pointer ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeMiterlimit="10"
        className="gear-icon"
      >
        {/* Inner circle */}
        <motion.circle
          className="gear-center"
          cx="16"
          cy="16"
          r="5"
          style={{ transformOrigin: "16px 16px" }}
        />
        {/* Gear teeth/body */}
        <motion.path
          className="gear-body"
          style={{ transformOrigin: "16px 16px" }}
          d="m30,17.5v-3l-3.388-1.355c-.25-.933-.617-1.815-1.089-2.633l1.436-3.351-2.121-2.121-3.351,1.436c-.817-.472-1.7-.838-2.633-1.089l-1.355-3.388h-3l-1.355,3.388c-.933.25-1.815.617-2.633,1.089l-3.351-1.436-2.121,2.121,1.436,3.351c-.472.817-.838,1.7-1.089,2.633l-3.388,1.355v3l3.388,1.355c.25.933.617,1.815,1.089,2.633l-1.436,3.351,2.121,2.121,3.351-1.436c.817.472,1.7.838,2.633,1.089l1.355,3.388h3l1.355-3.388c.933-.25,1.815-.617,2.633-1.089l3.351,1.436,2.121-2.121-1.436-3.351c.472-.817.838-1.7,1.089-2.633l3.388-1.355Z"
        />
      </svg>
    </motion.div>
  );
};

export default GearIcon;
