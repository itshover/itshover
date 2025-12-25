import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BookIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Reset text lines
    await animate(".book-line", { pathLength: 0, opacity: 0 }, { duration: 0 });

    await animate(
      ".book-line-1",
      { pathLength: [0, 1], opacity: [0, 1] },
      { duration: 0.3, ease: "easeInOut", delay: 0.1 },
    );

    await animate(
      ".book-line-2",
      { pathLength: [0, 1], opacity: [0, 1] },
      { duration: 0.3, ease: "easeInOut", delay: 0.05 },
    );

    await animate(
      ".book-line-3",
      { pathLength: [0, 1], opacity: [0, 1] },
      { duration: 0.3, ease: "easeInOut", delay: 0.05 },
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
        viewBox="0 0 48 48"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="square"
      >
        {/* Book spine */}
        <motion.path className="book-spine" d="M24 40.5V41L24 10V10.5" />

        {/* Book cover */}
        <motion.path
          className="book-cover"
          style={{ transformOrigin: "24px 25px" }}
          d="M24 41C31.0005 36.9995 37.9995 36.9995 45 41V10.0003C37.9995 5.99989 31.0005 5.99989 24 10.0003C16.9995 5.99989 10.0005 5.99989 3 10.0003V41C10.0005 36.9995 16.9995 36.9995 24 41Z"
        />

        {/* Text lines */}
        <motion.path
          className="book-line book-line-1"
          d="M30 16.5C32.8362 15.1345 36.5662 15.06 39.5 16.2763"
        />

        <motion.path
          className="book-line book-line-2"
          d="M30 23.5832C32.8362 22.2178 36.5662 22.1432 39.5 23.3596"
        />

        <motion.path
          className="book-line book-line-3"
          d="M30 30.6665C32.8362 29.301 36.5662 29.2265 39.5 30.4428"
        />
      </svg>
    </motion.div>
  );
};

export default BookIcon;
