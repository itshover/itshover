import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const VinylIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      // Rotate the vinyl record
      animationControls.current.push(
        animate(
          ".vinyl-disc",
          {
            rotate: [0, 360],
          },
          {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        ),
      );

      // Pulse the center dot
      animationControls.current.push(
        animate(
          ".center-dot",
          {
            scale: [1, 1.2, 1],
          },
          {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          },
        ),
      );
    };

    const stop = () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(
        ".vinyl-disc",
        {
          rotate: 0,
        },
        {
          duration: 0.5,
          ease: "easeOut",
        },
      );

      animate(
        ".center-dot",
        {
          scale: 1,
        },
        {
          duration: 0.3,
          ease: "easeInOut",
        },
      );
    };

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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        {/* Vinyl disc */}
        <motion.path
          className="vinyl-disc"
          d="M16 3.937a9 9 0 1 0 5 8.063"
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Center dot */}
        <motion.path
          className="center-dot"
          d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
        />

        {/* Tonearm */}
        <path d="M20 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M20 4l-3.5 10l-2.5 2" />
      </motion.svg>
    );
  },
);

VinylIcon.displayName = "VinylIcon";
export default VinylIcon;
