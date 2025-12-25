import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const RightChevron = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    await animate(
      ".chevron",
      { x: [0, 6, 0] },
      {
        duration: 0.8,
        ease: "easeInOut",
      },
    );
  };

  return (
    <motion.div
      ref={scope}
      className={`flex w-8 items-center justify-center ${className}`}
      onHoverStart={hoverAnimation}
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
        className="chevron cursor-pointer"
      >
        <path d="M9 6l6 6l-6 6" />
      </svg>
    </motion.div>
  );
};

export default RightChevron;
