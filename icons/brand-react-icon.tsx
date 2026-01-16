import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";

const BrandReactIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".center-dot",
        { scale: [1, 1.4, 1.2] },
        { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
      );

      animate(".orbit-1", { rotate: 360 }, { duration: 1, ease: "linear" });
      animate(".orbit-2", { rotate: -360 }, { duration: 2, ease: "linear" });
      animate(".orbit-3", { rotate: 360 }, { duration: 4, ease: "linear" });

      // Pulsing center dot
      animate(
        ".center-dot",
        {
          scale: [1.2, 1.35, 1.2],
          opacity: [1, 0.8, 1],
        },
        { duration: 2, ease: "easeInOut" },
      );

      // Subtle breathing effect on all orbits
      animate(
        ".orbit-1",
        { scale: [1, 1.02, 1] },
        { duration: 3, ease: "easeInOut" },
      );
      animate(
        ".orbit-2",
        { scale: [1, 1.03, 1] },
        { duration: 3.5, ease: "easeInOut", delay: 0.5 },
      );
      animate(
        ".orbit-3",
        { scale: [1, 1.02, 1] },
        { duration: 4, ease: "easeInOut", delay: 1 },
      );
    };

    const stop = async () => {
      // Smooth deceleration
      await animate(
        ".orbit-1",
        { rotate: 0, scale: 1 },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      );
      await animate(
        ".orbit-2",
        { rotate: 0, scale: 1 },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      );
      await animate(
        ".orbit-3",
        { rotate: 0, scale: 1 },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      );

      // Center dot settles back
      await animate(
        ".center-dot",
        { scale: 1, opacity: 1 },
        { duration: 0.5, ease: "easeOut" },
      );
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

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
        className={`cursor-pointer select-none ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.g
          className="orbit-1"
          style={{ originX: "50%", originY: "50%" }}
        >
          <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
          <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
        </motion.g>
        <motion.g
          className="orbit-2"
          style={{ originX: "50%", originY: "50%" }}
        >
          <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
          <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
        </motion.g>
        <motion.g
          className="orbit-3"
          style={{ originX: "50%", originY: "50%" }}
        >
          <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
          <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
        </motion.g>
        <motion.path
          className="center-dot"
          d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732"
          style={{ originX: "50%", originY: "50%" }}
        />
      </motion.svg>
    );
  },
);

BrandReactIcon.displayName = "BrandReactIcon";

export default BrandReactIcon;
