import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SlidersHorizontalIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // Row 1: Slider at x=14
      animate(
        ".slider-1",
        { x: [0, -4, 0] },
        { duration: 2, repeat: Infinity, ease: "easeInOut" },
      );
      animate(
        ".path-1-left",
        { x2: [10, 6, 10] },
        { duration: 2, repeat: Infinity, ease: "easeInOut" },
      );
      animate(
        ".path-1-right",
        { x1: [14, 10, 14] },
        { duration: 2, repeat: Infinity, ease: "easeInOut" },
      );

      // Row 2: Slider at x=8
      animate(
        ".slider-2",
        { x: [0, 4, 0] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
      );
      animate(
        ".path-2-left",
        { x2: [8, 12, 8] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
      );
      animate(
        ".path-2-right",
        { x1: [12, 16, 12] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
      );

      // Row 3: Slider at x=16
      animate(
        ".slider-3",
        { x: [0, -4, 0] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
      );
      animate(
        ".path-3-left",
        { x2: [12, 8, 12] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
      );
      animate(
        ".path-3-right",
        { x1: [16, 12, 16] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".slider-1, .slider-2, .slider-3", { x: 0 }, { duration: 0.3 });
      // Reset paths manually to their original coordinates
      animate(".path-1-left", { x2: 10 }, { duration: 0.3 });
      animate(".path-1-right", { x1: 14 }, { duration: 0.3 });
      animate(".path-2-left", { x2: 8 }, { duration: 0.3 });
      animate(".path-2-right", { x1: 12 }, { duration: 0.3 });
      animate(".path-3-left", { x2: 12 }, { duration: 0.3 });
      animate(".path-3-right", { x1: 16 }, { duration: 0.3 });
    }, [animate]);

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
        className={`cursor-pointer ${className}`}
      >
        {/* Row 1: y=5 */}
        <motion.line className="path-1-left" x1="3" y1="5" x2="10" y2="5" />
        <motion.line className="slider-1" x1="14" y1="3" x2="14" y2="7" />
        <motion.line className="path-1-right" x1="14" y1="5" x2="21" y2="5" />

        {/* Row 2: y=12 */}
        <motion.line className="path-2-left" x1="3" y1="12" x2="8" y2="12" />
        <motion.line className="slider-2" x1="8" y1="10" x2="8" y2="14" />
        <motion.line className="path-2-right" x1="12" y1="12" x2="21" y2="12" />

        {/* Row 3: y=19 */}
        <motion.line className="path-3-left" x1="3" y1="19" x2="12" y2="19" />
        <motion.line className="slider-3" x1="16" y1="17" x2="16" y2="21" />
        <motion.line className="path-3-right" x1="16" y1="19" x2="21" y2="19" />
      </motion.svg>
    );
  },
);

SlidersHorizontalIcon.displayName = "SlidersHorizontalIcon";
export default SlidersHorizontalIcon;
