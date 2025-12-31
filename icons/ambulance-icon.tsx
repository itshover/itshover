import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const AmbulanceIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    animate(
      ".ambulance",
      { x: [0, 1, 0, -1] },
      { duration: 0.6, ease: "easeInOut", repeat: Infinity },
    );
    animate(
      ".plus",
      { scale: [1, 1.3, 1] },
      { duration: 0.6, ease: "easeInOut" },
    );
  };

  const resetAnimation = () => {
    animate(".ambulance", { x: 0 }, { duration: 0.2, ease: "easeInOut" });
    animate(".plus", { scale: 1 }, { duration: 0.2, ease: "easeInOut" });
  };

  return (
    <motion.svg
      ref={scope}
      onHoverStart={hoverAnimation}
      onHoverEnd={resetAnimation}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`cursor-pointer ${className}`}
    >
      <motion.g className="ambulance">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
        <path d="M9 18h6" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </motion.g>
      <motion.g className="plus" style={{ transformOrigin: "8px 8px" }}>
        <path d="M10 10H6" />
        <path d="M8 8v4" />
      </motion.g>
    </motion.svg>
  );
};

export default AmbulanceIcon;
