import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BatteryIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Reset bolt before starting
    await animate(
      ".battery-bolt",
      { pathLength: 0, opacity: 0 },
      { duration: 0 },
    );

    // 1. Draw charging bolt
    animate(
      ".battery-bolt",
      {
        pathLength: [0, 1],
        opacity: [0, 1],
      },
      {
        duration: 0.6,
        ease: "easeInOut",
      },
    );

    // 2. Battery pulse (charging feel)
    animate(
      ".battery-body",
      {
        scale: [1, 1.04, 1],
      },
      {
        duration: 0.6,
        ease: "easeInOut",
      },
    );

    // 3. Energy surge flash
    await animate(
      ".battery-bolt",
      {
        opacity: [1, 0.4, 1],
      },
      {
        duration: 0.3,
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
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="square"
      >
        {/* Battery terminal */}
        <motion.path className="battery-terminal" d="M46 20V28" />

        {/* Battery body */}
        <motion.path
          className="battery-body"
          style={{ transformOrigin: "50% 50%" }}
          d="M37 10H8C5.23858 10 3 12.2386 3 15V33C3 35.7614 5.23858 38 8 38H37C39.7614 38 42 35.7614 42 33V15C42 12.2386 39.7614 10 37 10Z"
        />

        {/* Charging bolt */}
        <motion.path
          className="battery-bolt"
          style={{ transformOrigin: "22.5px 24px" }}
          d="M33.5 25.6667L22.5 19V29L11.5 22.3333"
        />
      </svg>
    </motion.div>
  );
};

export default BatteryIcon;
