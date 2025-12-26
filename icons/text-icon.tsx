import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const TextIcon = ({
  size = 40,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const swapDistance = 24;

  const hoverAnimation = async () => {
    // Z goes down
    animate(
      ".text-z",
      {
        y: -swapDistance,
      },
      {
        duration: 0.3,
        ease: "easeInOut",
      }
    );

    // A goes up
    animate(
      ".text-a",
      {
        y: swapDistance,
        scale: 1.05,
      },
      {
        duration: 0.3,
        ease: "easeInOut",
      }
    );
  };

  const resetAnimation = async () => {
    await animate(
      ".text-z, .text-a",
      {
        y: 0,
        scale: 1,
      },
      {
        duration: 0.3,
        ease: "easeInOut",
      }
    );
  };

  return (
    <motion.div
      ref={scope}
      onHoverStart={hoverAnimation}
      onHoverEnd={resetAnimation}
      className={`inline-flex cursor-pointer ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="currentColor"
      >
        {/* Vertical line */}
        <motion.path
          className="text-line"
          d="M35.5 3.5V43H32.5V3.5H35.5Z"
        />

        {/* Z letter */}
        <motion.path
          className="text-z"
          d="M6.5 26H21.5V29.1627L10.4518 41H21.5V44H6.5V40.8373L17.5482 29H6.5V26Z"
        />

        {/* A letter */}
        <motion.path
          className="text-a"
          d="M11.7802 4H16.0532L22.5532 22H18.7V20.1625L13.9469 7H13.8865L9.13335 20.1625V22H5.28021L11.7802 4Z"
        />

        {/* A crossbar */}
        <motion.path
          className="text-a"
          d="M19.5 18H8.5V15H19.5V18Z"
        />

        {/* Arrow down */}
        <motion.path
          className="text-arrow"
          style={{ transformOrigin: "34px 38px" }}
          d="M25 31.8787L34 40.8787L43 31.8787L45.1213 34L34 45.1213L22.8787 34L25 31.8787Z"
        />
      </svg>
    </motion.div>
  );
};

export default TextIcon;
