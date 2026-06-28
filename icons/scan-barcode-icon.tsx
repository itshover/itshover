import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ScanBarcodeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        ".scan-line",
        {
          y: [0, 10, -10, 0],
          opacity: [0.3, 1, 0.3, 1],
        },
        {
          duration: 1.2,
          ease: "easeInOut",
        },
      );

      animate(
        ".corners",
        {
          scale: [1, 1.05, 1],
        },
        {
          duration: 0.4,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".scan-line, .corners",
        { y: 0, opacity: 1, scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

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
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <motion.g className="corners">
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        </motion.g>

        <motion.g className="barcode">
          <path d="M8 7v10" />
          <path d="M12 7v10" />
          <path d="M17 7v10" />
        </motion.g>

        <motion.line
          className="scan-line"
          x1="8"
          x2="17"
          y1="12"
          y2="12"
          strokeWidth={strokeWidth}
          initial={{ opacity: 0.3 }}
        />
      </motion.svg>
    );
  },
);

ScanBarcodeIcon.displayName = "ScanBarcodeIcon";
export default ScanBarcodeIcon;
