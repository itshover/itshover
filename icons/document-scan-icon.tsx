import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const DocumentScanIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(scope.current, { scale: 1.05 }, { duration: 0.3 });

      animate(
        ".scan-line",
        { y: [0, 6, -6, 0] },
        {
          duration: 1.5,
          ease: "easeInOut",
        },
      );
    };

    const stop = () => {
      animate(scope.current, { scale: 1 }, { duration: 0.3 });
      animate(".scan-line", { y: 0 }, { duration: 0.3 });
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
      >
        <g className="corners">
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </g>

        <motion.line
          className="scan-line"
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          strokeWidth={strokeWidth}
        />
      </motion.svg>
    );
  },
);

DocumentScanIcon.displayName = "DocumentScanIcon";
export default DocumentScanIcon;
