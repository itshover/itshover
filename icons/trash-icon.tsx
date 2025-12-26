import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

interface TrashIconProps extends AnimatedIconProps {
  shakeOnClick?: boolean;
  dangerHover?: boolean;
  keepOpenOnDelete?: boolean;
}

const TrashIcon = ({
  shakeOnClick = false,
  dangerHover = false,
  keepOpenOnDelete = false,
  size = 24,
  color = "currentColor",
  strokeWidth = 1,
  className = "",
}: TrashIconProps) => {
  const [scope, animate] = useAnimate();

  const openLid = async () => {
    await Promise.all([
      animate(
        ".trash-lid-lower",
        { rotate: -25, y: -4 },
        { duration: 0.25, ease: "easeOut" },
      ),
      animate(
        ".trash-lid-upper",
        { rotate: -35, y: -6, x: -2 },
        { duration: 0.25, ease: "easeOut" },
      ),
    ]);
  };

  const closeLid = async () => {
    await Promise.all([
      animate(
        ".trash-lid-lower",
        { rotate: 0, y: 0 },
        { duration: 0.2, ease: "easeInOut" },
      ),
      animate(
        ".trash-lid-upper",
        { rotate: 0, y: 0, x: 0 },
        { duration: 0.2, ease: "easeInOut" },
      ),
    ]);
  };

  const hoverAnimation = async () => {
    await openLid();

    // if (!keepOpenOnDelete) {
    //   await closeLid();
    // }
  };

  const clickAnimation = async () => {
    if (shakeOnClick) {
      await animate(
        ".trash-icon",
        { x: [0, -2, 2, -1, 0] },
        { duration: 0.25, ease: "easeInOut" },
      );
    }

    if (keepOpenOnDelete) {
      await openLid();
    }
  };

  const dangerHoverAnimation = async () => {
    if (!dangerHover) return;

    await animate(
      ".trash-icon",
      { stroke: "#ef4444" },
      { duration: 0.2, delay: 0.1, ease: "easeInOut" },
    );
  };

  const resetColor = async () => {
    if (!dangerHover) return;

    await animate(
      ".trash-icon",
      { stroke: "currentColor" },
      { duration: 0.2, ease: "easeInOut" },
    );
  };

  return (
    <motion.div
      ref={scope}
      className={`inline-flex cursor-pointer ${className}`}
      onHoverStart={async () => {
        await hoverAnimation();
        await dangerHoverAnimation();
      }}
      onHoverEnd={() => {
        resetColor()
        closeLid()
      }}
      onTap={clickAnimation}
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
        className="trash-icon"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        {/* Lower lid */}
        <motion.path
          d="M4 7l16 0"
          className="trash-lid-lower"
          style={{ transformOrigin: "50% 100%" }}
        />

        {/* Body */}
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />

        {/* Upper lid */}
        <motion.path
          d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
          className="trash-lid-upper"
          style={{ transformOrigin: "50% 100%" }}
        />
      </svg>
    </motion.div>
  );
};

export default TrashIcon;
