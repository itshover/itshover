import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BatteryPauseIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Add your animations here
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
        {/* Left pause bar */}
        <motion.path
          className="battery-pause-bar battery-pause-left"
          d="M10 31V17"
        />

        {/* Right pause bar */}
        <motion.path
          className="battery-pause-bar battery-pause-right"
          d="M17 31V17"
        />

        {/* Terminal */}
        <motion.path className="battery-terminal" d="M46 20V28" />

        {/* Battery body */}
        <motion.path
          className="battery-body"
          style={{ transformOrigin: "22.5px 24px" }}
          d="M37 10H8C5.23858 10 3 12.2386 3 15V33C3 35.7614 5.23858 38 8 38H37C39.7614 38 42 35.7614 42 33V15C42 12.2386 39.7614 10 37 10Z"
        />
      </svg>
    </motion.div>
  );
};

export default BatteryPauseIcon;
