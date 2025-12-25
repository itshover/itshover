import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BulbSvg = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Reset all rays to 0 opacity
    await Promise.all([
      animate(".ray-left", { opacity: 0 }, { duration: 0.1 }),
      animate(".ray-top", { opacity: 0 }, { duration: 0.1 }),
      animate(".ray-right", { opacity: 0 }, { duration: 0.1 }),
      animate(".ray-top-left", { opacity: 0 }, { duration: 0.1 }),
      animate(".ray-top-right", { opacity: 0 }, { duration: 0.1 }),
    ]);

    // Animate all rays from 0 to 1 opacity
    await Promise.all([
      animate(".ray-left", { opacity: 1 }, { duration: 0.4, ease: "easeOut" }),
      animate(".ray-top", { opacity: 1 }, { duration: 0.4, ease: "easeOut" }),
      animate(".ray-right", { opacity: 1 }, { duration: 0.4, ease: "easeOut" }),
      animate(
        ".ray-top-left",
        { opacity: 1 },
        { duration: 0.4, ease: "easeOut" },
      ),
      animate(
        ".ray-top-right",
        { opacity: 1 },
        { duration: 0.4, ease: "easeOut" },
      ),
    ]);
  };

  return (
    <motion.div ref={scope} onHoverStart={hoverAnimation}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`bulb-icon cursor-pointer ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {/* Left ray */}
        <motion.path
          className="ray-left"
          d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
        />
        {/* Top ray */}
        <motion.path
          className="ray-top"
          d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z"
        />

        <motion.path
          className="ray-right"
          d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
        />

        <motion.path
          className="ray-top-left"
          d="M4.893 4.893a1 1 0 0 1 1.32 -.083l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 0 -1.414z"
        />

        <motion.path
          className="ray-top-right"
          d="M17.693 4.893a1 1 0 0 1 1.497 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7z"
        />

        <motion.path
          className="bulb-base"
          d="M14 18a1 1 0 0 1 1 1a3 3 0 0 1 -6 0a1 1 0 0 1 .883 -.993l.117 -.007h4z"
        />

        <motion.path
          className="bulb-body"
          d="M12 6a6 6 0 0 1 3.6 10.8a1 1 0 0 1 -.471 .192l-.129 .008h-6a1 1 0 0 1 -.6 -.2a6 6 0 0 1 3.6 -10.8z"
        />
      </svg>
    </motion.div>
  );
};

export default BulbSvg;
