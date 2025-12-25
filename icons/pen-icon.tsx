import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PenIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // 1️⃣ Pen writes upward
    await animate(
      ".pen-icon",
      {
        x: [0, 1, -1, 1, -1, 0],
        y: [0, -2, -4, -6, -8, -10],
        rotate: [0, -6, -4, -6, -4, 0],
      },
      {
        duration: 0.8,
        ease: "easeInOut",
      },
    );

    // 2️⃣ Draw ink
    await animate(
      ".pen-slash",
      {
        pathLength: [0, 1],
        opacity: [0, 1],
      },
      {
        duration: 0.3,
        ease: "easeOut",
      },
    );

    // 3️⃣ Reset ink
    await animate(
      ".pen-slash",
      {
        pathLength: 0,
        opacity: 0,
      },
      {
        duration: 0.2,
        ease: "easeInOut",
      },
    );

    // 4️⃣ Reset pen to OG position
    await animate(
      ".pen-icon",
      {
        x: 0,
        y: 0,
        rotate: 0,
      },
      {
        duration: 0.25,
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
        className="pen-icon"
      >
        {/* Ink */}
        <motion.line
          className="pen-slash"
          x1="20.031"
          y1="5.969"
          x2="26.031"
          y2="11.969"
          initial={{ pathLength: 0, opacity: 0 }}
        />

        {/* Pen */}
        <motion.path
          className="pen-body"
          style={{ transformOrigin: "60% 40%" }}
          d="m10.5,27.5l-8,2,2-8L22.257,3.743c1.657-1.657,4.343-1.657,6,0h0c1.657,1.657,1.657,4.343,0,6L10.5,27.5Z"
        />
      </svg>
    </motion.div>
  );
};

export default PenIcon;
