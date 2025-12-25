import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const QRCodeSVG = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  const [scope, animate] = useAnimate();

  const hoverAnimation = async () => {
    // Reset all elements first
    animate(".qr-scan", { opacity: 0, y: 0 }, { duration: 0 });
    animate(".corner-rect", { pathLength: 0, opacity: 0 }, { duration: 0 });
    animate(".inner-element", { opacity: 0, scale: 0.8 }, { duration: 0 });
    animate(".center-dot", { scale: 0, opacity: 0 }, { duration: 0 });

    // 1. Animate corner rectangles drawing in with stagger
    await animate(
      ".corner-rect",
      { pathLength: [0, 1], opacity: [0, 1] },
      { duration: 0.4, ease: "easeOut", delay: (i) => i * 0.1 },
    );

    // 2. Start the scan line animation (loops)
    animate(
      ".qr-scan",
      { opacity: [0, 1, 1, 0], y: [0, 30, 0, 0] },
      { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 },
    );

    // 3. Fade in inner QR elements with scale effect
    await animate(
      ".inner-element",
      { opacity: [0, 1], scale: [0.8, 1] },
      { duration: 0.3, ease: "easeOut", delay: (i) => i * 0.05 },
    );

    // 4. Pop in the center dots
    animate(
      ".center-dot",
      { scale: [0, 1.2, 1], opacity: [0, 1] },
      { duration: 0.3, ease: "easeOut", delay: (i) => i * 0.08 },
    );
  };

  const hoverEndAnimation = () => {
    // Stop scan line and fade everything out smoothly
    animate(".qr-scan", { opacity: 0 }, { duration: 0.3 });
    animate(".corner-rect", { opacity: 1, pathLength: 1 }, { duration: 0.2 });
    animate(".inner-element", { opacity: 1, scale: 1 }, { duration: 0.2 });
    animate(".center-dot", { opacity: 1, scale: 1 }, { duration: 0.2 });
  };

  return (
    <motion.div
      ref={scope}
      onHoverStart={hoverAnimation}
      onHoverEnd={hoverEndAnimation}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={`qr-code ${className}`}
        style={{ overflow: "visible" }}
      >
        {/* Scan line */}
        <motion.rect
          className="qr-scan"
          x="2"
          y="0"
          width="28"
          height="2"
          fill="currentColor"
          opacity="0"
          style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
        />

        {/* Top-left corner square */}
        <motion.rect
          className="corner-rect"
          x="3"
          y="3"
          width="9"
          height="9"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          initial={{ pathLength: 1 }}
        />

        {/* Bottom-left corner square */}
        <motion.rect
          className="corner-rect"
          x="3"
          y="20"
          width="9"
          height="9"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          initial={{ pathLength: 1 }}
        />

        {/* Top-right corner square */}
        <motion.rect
          className="corner-rect"
          x="20"
          y="3"
          width="9"
          height="9"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          initial={{ pathLength: 1 }}
        />

        {/* Inner QR pattern elements */}
        <motion.rect
          className="inner-element"
          x="27"
          y="20"
          width="2"
          height="2"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          style={{ transformOrigin: "center" }}
        />

        <motion.rect
          className="inner-element"
          x="16"
          y="27"
          width="2"
          height="2"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          style={{ transformOrigin: "center" }}
        />

        <motion.path
          className="inner-element"
          d="M3 16H7"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          fill="none"
          style={{ transformOrigin: "center" }}
        />

        <motion.path
          className="inner-element"
          d="M13 16H18M22 16V23H29M22 16H26M22 16H18M18 16V20H16"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          fill="none"
          style={{ transformOrigin: "center" }}
        />

        <motion.path
          className="inner-element"
          d="M16 7V10"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          fill="none"
          style={{ transformOrigin: "center" }}
        />

        <motion.path
          className="inner-element"
          d="M16 25V29H23V27"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          fill="none"
          style={{ transformOrigin: "center" }}
        />

        <motion.path
          className="inner-element"
          d="M29.01 29H29"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          fill="none"
          style={{ transformOrigin: "center" }}
        />

        {/* Center dots in corner squares */}
        <motion.rect
          className="center-dot"
          x="24"
          y="7"
          width="1"
          height="1"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          style={{ transformOrigin: "24.5px 7.5px" }}
        />

        <motion.rect
          className="center-dot"
          x="7"
          y="7"
          width="1"
          height="1"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          style={{ transformOrigin: "7.5px 7.5px" }}
        />

        <motion.rect
          className="center-dot"
          x="7"
          y="24"
          width="1"
          height="1"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          style={{ transformOrigin: "7.5px 24.5px" }}
        />
      </svg>
    </motion.div>
  );
};

export default QRCodeSVG;
