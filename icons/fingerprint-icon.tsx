"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const FingerprintIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const startAnimate = async () => {
    animate(
      ".fp-center",
      { scale: [1, 1.2, 1], opacity: [1, 0.6, 1] },
      { duration: 0.4, ease: "easeOut" }
    );
    animate(
      ".fp-inner",
      { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] },
      { duration: 0.5, ease: "easeOut", delay: 0.1 }
    );
    await animate(
      ".fp-outer",
      { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] },
      { duration: 0.6, ease: "easeOut", delay: 0.15 }
    );
  };

  return (
    <motion.svg
      ref={scope}
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
      onHoverStart={startAnimate}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        className="fp-center"
        style={{ transformOrigin: "12px 12px" }}
        d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3"
      />
      <motion.path
        className="fp-center"
        style={{ transformOrigin: "12px 12px" }}
        d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6"
      />
      <motion.path
        className="fp-inner"
        style={{ transformOrigin: "12px 12px" }}
        d="M12 11v2a14 14 0 0 0 2.5 8"
      />
      <motion.path
        className="fp-inner"
        style={{ transformOrigin: "12px 12px" }}
        d="M8 15a18 18 0 0 0 1.8 6"
      />
      <motion.path
        className="fp-outer"
        style={{ transformOrigin: "12px 12px" }}
        d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95"
      />
    </motion.svg>
  );
};

export default FingerprintIcon;
