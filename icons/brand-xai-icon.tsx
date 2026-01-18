import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandXaiIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // Explode: all 4 parts move outward in different directions
      animate(
        ".xai-part-1",
        { x: -4, y: -2 },
        { duration: 0.25, ease: "easeOut" },
      );
      animate(
        ".xai-part-2",
        { x: -3, y: 3 },
        { duration: 0.25, ease: "easeOut" },
      );
      animate(
        ".xai-part-3",
        { x: 4, y: -3 },
        { duration: 0.25, ease: "easeOut" },
      );
      animate(
        ".xai-part-4",
        { x: 3, y: 2 },
        { duration: 0.25, ease: "easeOut" },
      );

      // Then merge back
      setTimeout(() => {
        animate(
          ".xai-part-1",
          { x: 0, y: 0 },
          { duration: 0.3, ease: "easeInOut" },
        );
        animate(
          ".xai-part-2",
          { x: 0, y: 0 },
          { duration: 0.3, ease: "easeInOut" },
        );
        animate(
          ".xai-part-3",
          { x: 0, y: 0 },
          { duration: 0.3, ease: "easeInOut" },
        );
        animate(
          ".xai-part-4",
          { x: 0, y: 0 },
          { duration: 0.3, ease: "easeInOut" },
        );
      }, 250);
    }, [animate]);

    const stop = useCallback(() => {
      animate(".xai-part-1", { x: 0, y: 0 }, { duration: 0.2 });
      animate(".xai-part-2", { x: 0, y: 0 }, { duration: 0.2 });
      animate(".xai-part-3", { x: 0, y: 0 }, { duration: 0.2 });
      animate(".xai-part-4", { x: 0, y: 0 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: start,
        stopAnimation: stop,
      }),
      [start, stop],
    );

    return (
      <motion.svg
        ref={scope}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <title>xAI</title>

        {/* Part 1: Top-left diagonal */}
        <motion.path
          className="xai-part-1"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M6.469 8.776L16.512 23h-4.464L2.005 8.776H6.47z"
        />

        {/* Part 2: Bottom-left shape */}
        <motion.path
          className="xai-part-2"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M6.465 16.676l2.233 3.164L6.467 23H2l4.465-6.324z"
        />

        {/* Part 3: Top-right diagonal */}
        <motion.path
          className="xai-part-3"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M22 1l-9.952 14.095-2.233-3.163L17.533 1H22z"
        />

        {/* Part 4: Vertical bar (I) */}
        <motion.path
          className="xai-part-4"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M22 2.582V23h-3.659V7.764L22 2.582z"
        />
      </motion.svg>
    );
  },
);

BrandXaiIcon.displayName = "BrandXaiIcon";
export default BrandXaiIcon;
