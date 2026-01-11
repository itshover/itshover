import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const DockerIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animationControls.current.push(
        animate(
          ".whale",
          { x: [0, 2, 0] },
          { duration: 1.2, ease: "easeInOut", repeat: Infinity },
        ),
      );
      animationControls.current.push(
        animate(
          ".containers",
          { y: [0, -1, 0] },
          { duration: 0.8, ease: "easeInOut", repeat: Infinity },
        ),
      );
      animate(
        ".dot",
        { scale: [1, 1.3, 1] },
        { duration: 0.5, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(".whale", { x: 0 }, { duration: 0.3 });
      animate(".containers", { y: 0 }, { duration: 0.3 });
      animate(".dot", { scale: 1 }, { duration: 0.3 });
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
        <motion.path
          className="whale"
          d="M22 12.54c-1.804 -.345 -2.701 -1.08 -3.523 -2.94c-.487 .696 -1.102 1.568 -.92 2.4c.028 .238 -.32 1 -.557 1h-14c0 5.208 3.164 7 6.196 7c4.124 .022 7.828 -1.376 9.854 -5c1.146 -.101 2.296 -1.505 2.95 -2.46z"
        />
        <motion.path className="containers" d="M5 10h3v3h-3z" />
        <motion.path className="containers" d="M8 10h3v3h-3z" />
        <motion.path className="containers" d="M11 10h3v3h-3z" />
        <motion.path className="containers" d="M8 7h3v3h-3z" />
        <motion.path className="containers" d="M11 7h3v3h-3z" />
        <motion.path className="containers" d="M11 4h3v3h-3z" />
        <motion.path
          className="whale"
          d="M4.571 18c1.5 0 2.047 -.074 2.958 -.78"
        />
        <motion.path
          className="dot"
          style={{ transformOrigin: "10 16" }}
          d="M10 16l0 .01"
        />
      </motion.svg>
    );
  },
);

DockerIcon.displayName = "DockerIcon";
export default DockerIcon;
