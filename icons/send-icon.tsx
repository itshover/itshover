import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SendIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 1,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Fly forward along 45°
    await animate(
      ".send-icon",
      {
        x: [0, 24],
        y: [0, -24],
        opacity: [1, 0],
      },
      {
        duration: 0.25,
        ease: "easeIn",
      },
    );

    // Instantly move back behind
    await animate(
      ".send-icon",
      {
        x: -24,
        y: 24,
      },
      { duration: 0 },
    );

    // Fly back in
    await animate(
      ".send-icon",
      {
        x: [-24, 0],
        y: [24, 0],
        opacity: [0, 1],
      },
      {
        duration: 0.25,
        ease: "easeOut",
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
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="send-icon"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 14l11 -11" />
        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
      </svg>
    </motion.div>
  );
};

export default SendIcon;
