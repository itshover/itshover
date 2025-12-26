import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LikeIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();
  const handleAnimate = async () => {
    await animate(
      ".like-icon",
      {
        scale: [1, 0.8, 1.2, 1],
        rotate: [0, 8, -5, 0],
        y: [0, 2, -2, 0],
      },
      { duration: 0.6, ease: "easeInOut" },
    );
  };
  return (
    <motion.div ref={scope} onHoverStart={handleAnimate}>
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
        className={`like-icon cursor-pointer ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
      </svg>
    </motion.div>
  );
};

export default LikeIcon;
