import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const NetflixIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = () => {
      animate(
        ".ghost-left",
        { x: [-15, 0], opacity: [0, 0.6, 0] },
        { duration: 0.4, ease: "circOut" },
      );
      animate(
        ".ghost-right",
        { x: [15, 0], opacity: [0, 0.6, 0] },
        { duration: 0.4, ease: "circOut" },
      );
      animate(
        ".main-n",
        {
          opacity: [0, 1],
          scale: [1.5, 1],
          filter: ["blur(10px)", "blur(0px)"],
        },
        { duration: 0.4, ease: "circOut" },
      );
      animate(
        ".draw-path",
        { pathLength: [0, 1] },
        { duration: 0.5, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(
        ".main-n",
        { opacity: 1, scale: 1, filter: "blur(0px)" },
        { duration: 0.2 },
      );
      animate(".ghost-left, .ghost-right", { opacity: 0 }, { duration: 0.2 });
      animate(".draw-path", { pathLength: 1 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    const ghostPaths = (
      <>
        <path d="M5 3v18h4v-10.5" />
        <path d="M19 21v-18h-4v10.5" />
        <path d="M9 3l10 18h-4l-10 -18l4 0" />
      </>
    );

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
        style={{ overflow: "visible" }}
      >
        <motion.g
          className="ghost-left"
          stroke="rgba(229, 9, 20, 0.6)"
          initial={{ opacity: 0 }}
        >
          {ghostPaths}
        </motion.g>
        <motion.g
          className="ghost-right"
          stroke="rgba(0, 255, 255, 0.6)"
          initial={{ opacity: 0 }}
        >
          {ghostPaths}
        </motion.g>
        <motion.g className="main-n" style={{ transformOrigin: "center" }}>
          <motion.path
            className="draw-path"
            d="M5 3v18h4v-10.5"
            initial={{ pathLength: 1 }}
          />
          <motion.path
            className="draw-path"
            d="M19 21v-18h-4v10.5"
            initial={{ pathLength: 1 }}
          />
          <motion.path
            className="draw-path"
            d="M9 3l10 18h-4l-10 -18l4 0"
            initial={{ pathLength: 1 }}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

NetflixIcon.displayName = "NetflixIcon";

export default NetflixIcon;
