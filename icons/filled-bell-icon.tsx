import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const FilledBellIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Upper bell swing (subtle, decaying)
    animate(
      ".bell",
      {
        rotate: [0, -8, 6, -4, 2, 0],
      },
      {
        duration: 0.6,
        ease: "easeInOut",
      },
    );

    // Clapper swing (stronger + delayed)
    animate(
      ".below-circle",
      {
        rotate: [0, 20, -18, 12, -6, 0],
      },
      {
        duration: 0.6,
        ease: "easeInOut",
        delay: 0.05,
      },
    );
  };

  return (
    <motion.div
      ref={scope}
      onHoverStart={hoverAnimation}
      className={`inline-flex ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        {/* Clapper */}
        <motion.path
          className="below-circle"
          style={{ transformOrigin: "50% 0%" }}
          d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"
        />

        {/* Bell body */}
        <motion.path
          className="bell"
          style={{ transformOrigin: "50% 10%" }}
          d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"
        />
      </svg>
    </motion.div>
  );
};

export default FilledBellIcon;
