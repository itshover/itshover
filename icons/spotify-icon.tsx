import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SpotifyIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(
        ".circle",
        { scale: [1, 1.05, 1] },
        { duration: 0.5, ease: "easeInOut" },
      );
      animationControls.current.push(
        animate(
          ".wave1",
          { x: [-2, 2, -2], pathLength: [1, 0.8, 1] },
          { duration: 0.8, ease: "easeInOut", repeat: Infinity },
        ),
      );
      animationControls.current.push(
        animate(
          ".wave2",
          { x: [-1, 1, -1], pathLength: [1, 0.9, 1] },
          { duration: 0.7, ease: "easeInOut", repeat: Infinity },
        ),
      );
      animationControls.current.push(
        animate(
          ".wave3",
          { x: [-2, 2, -2], pathLength: [1, 0.85, 1] },
          { duration: 0.9, ease: "easeInOut", repeat: Infinity },
        ),
      );
    };

    const stop = () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(".circle", { scale: 1 }, { duration: 0.2 });
      animate(".wave1", { x: 0, pathLength: 1 }, { duration: 0.2 });
      animate(".wave2", { x: 0, pathLength: 1 }, { duration: 0.2 });
      animate(".wave3", { x: 0, pathLength: 1 }, { duration: 0.2 });
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
        className={`cursor-pointer ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          className="circle"
          style={{ transformOrigin: "center" }}
          d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
        />
        <motion.path
          className="wave2"
          d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527"
        />
        <motion.path className="wave3" d="M9 15c1.5 -1 4 -1 5 .5" />
        <motion.path className="wave1" d="M7 9c2 -1 6 -2 10 .5" />
      </motion.svg>
    );
  },
);

SpotifyIcon.displayName = "SpotifyIcon";
export default SpotifyIcon;
