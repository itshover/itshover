import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const UploadIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".arrow",
        { y: -20, opacity: 0 },
        { duration: 0.3, ease: "easeIn" },
      );
      await animate(
        ".arrow",
        { y: 10, opacity: 0 },
        { duration: 0.001 },
      );
      await animate(
        ".arrow",
        { y: 0, opacity: 1 },
        { duration: 0.3, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(".arrow", { y: 0, opacity: 1 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "hidden" }}
      >
        <motion.g style={{ transformOrigin: "center" }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <motion.g className="arrow" style={{ transformOrigin: "center" }}>
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </motion.g>
        </motion.g>
      </motion.svg>
    );
  },
);

UploadIcon.displayName = "UploadIcon";
export default UploadIcon;
