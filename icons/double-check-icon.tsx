import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const DoubleCheckIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Add your animations here
    await animate(
      ".check-first",
      {
        pathLength: [0, 1],
        opacity: [0, 1],
      },
      {
        duration: 0.5,
        ease: "easeInOut",
      },
    );

    await animate(
      ".check-second",
      {
        pathLength: [0, 1],
        opacity: [0, 1],
      },
      {
        duration: 0.5,
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
        {/* First check */}
        <motion.path
          className="check-first"
          style={{ transformOrigin: "19px 25px" }}
          d="M3 26.4L11.8846 39L35 11"
        />

        {/* Second check */}
        <motion.path
          className="check-second"
          style={{ transformOrigin: "33px 25px" }}
          d="M45 11L21.8847 39L20.2098 36.6248"
        />
      </svg>
    </motion.div>
  );
};

export default DoubleCheckIcon;
