import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

const SkullEmoji = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Skull shake with intensity
    animate(
      ".skull-head",
      {
        rotate: [0, -8, 8, -8, 8, -4, 4, 0],
        y: [0, -2, 0, -2, 0, -1, 0],
      },
      {
        duration: 0.6,
        ease: "easeInOut",
      },
    );

    // Eyes grow and shrink (spooky)
    animate(
      ".skull-eye-left, .skull-eye-right",
      {
        scale: [1, 1.3, 0.8, 1.2, 1],
      },
      {
        duration: 0.6,
        ease: "easeInOut",
      },
    );

    // Teeth chatter
    await animate(
      ".skull-tooth",
      {
        y: [0, -3, 0, -2, 0, -3, 0],
      },
      {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.1,
      },
    );

    // Final bounce
    await animate(
      ".skull-head",
      {
        y: [0, -4, 0],
        scale: [1, 1.05, 1],
      },
      {
        duration: 0.3,
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
        x="0px"
        y="0px"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="square"
      >
        {/* Left tooth */}
        <motion.path className="skull-tooth-left skull-tooth" d="M14 27V30" />
        {/* Right tooth */}
        <motion.path className="skull-tooth-right skull-tooth" d="M18 27V30" />
        {/* Skull head */}
        <motion.path
          className="skull-head"
          style={{ transformOrigin: "16px 16px" }}
          d="M16 2C9.09644 2 3.5 7.59644 3.5 14.5C3.5 18.8099 5.68123 22.6104 9 24.8577L9.32436 28.1936C9.424 29.2183 10.2854 30 11.315 30H20.685C21.7146 30 22.576 29.2183 22.6756 28.1936L23 24.8577C26.3188 22.6104 28.5 18.8099 28.5 14.5C28.5 7.59644 22.9036 2 16 2Z"
        />
        {/* Right eye */}
        <motion.path
          className="skull-eye-right"
          style={{ transformOrigin: "21px 16px" }}
          d="M24 16C24 17.6569 22.6569 19 21 19C19.3431 19 18 17.6569 18 16C18 15.25 20.2198 13 21 13C22.6569 13 24 14.3431 24 16Z"
        />
        {/* Left eye */}
        <motion.path
          className="skull-eye-left"
          style={{ transformOrigin: "11px 16px" }}
          d="M8 16C8 17.6569 9.34315 19 11 19C12.6569 19 14 17.6569 14 16C14 15.25 11.7802 13 11 13C9.34315 13 8 14.3431 8 16Z"
        />
      </svg>
    </motion.div>
  );
};

export default SkullEmoji;
