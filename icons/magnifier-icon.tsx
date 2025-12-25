import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const MagnifierIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    await animate(
      ".magnifier-icon",
      {
        x: [0, 1, 0, -1, 0],
        y: [0, -1, -2, -1, 0],
        rotate: [0, -5, 5, -5, 0],
      },
      {
        duration: 1,
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
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        className="magnifier-icon"
        style={{ transformOrigin: "13px 13px" }}
      >
        {/* Handle */}
        <motion.path
          className="magnifier-handle"
          d="m21.393,18.565l7.021,7.021c.781.781.781,2.047,0,2.828h0c-.781.781-2.047.781-2.828,0l-7.021-7.021"
        />

        {/* Lens */}
        <motion.circle
          className="magnifier-lens"
          cx="13"
          cy="13"
          r="10"
          strokeLinecap="square"
        />
      </svg>
    </motion.div>
  );
};

export default MagnifierIcon;
