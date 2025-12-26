import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ToggleIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.3,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Preview slide (hint of ON state)
    await animate(
      ".toggle-knob",
      {
        x: [0, 12, 0],
      },
      {
        duration: 0.4,
        ease: "easeInOut",
      },
    );

    // Subtle track feedback
    animate(
      ".toggle-track",
      {
        opacity: [1, 0.8, 1],
      },
      {
        duration: 0.4,
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
        strokeLinecap="square"
        strokeMiterlimit="10"
      >
        {/* Toggle track */}
        <motion.path
          className="toggle-track"
          d="m10,7h12c4.971,0,9,4.029,9,9h0c0,4.971-4.029,9-9,9h-12c-4.971,0-9-4.029-9-9h0c0-4.971,4.029-9,9-9Z"
        />

        {/* Toggle knob */}
        <motion.circle
          className="toggle-knob"
          cx="10"
          cy="16"
          r="5"
          style={{ transformOrigin: "10px 16px" }}
        />
      </svg>
    </motion.div>
  );
};

export default ToggleIcon;
