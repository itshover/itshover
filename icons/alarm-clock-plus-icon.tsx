import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const AlarmClockPlusIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
          ".clock",
          {
            y: -1.5,
            x: [-1, 1, -1, 1, -1, 0],
          },
          {
            y: { duration: 0.2, type: "spring", stiffness: 200, damping: 25 },
            x: { duration: 0.3, repeat: Infinity, ease: "linear" },
          },
        ),
      );

      animationControls.current.push(
        animate(
          ".bells",
          {
            y: -2.5,
            x: [-2, 2, -2, 2, -2, 0],
          },
          {
            y: { duration: 0.2, type: "spring", stiffness: 200, damping: 25 },
            x: { duration: 0.3, repeat: Infinity, ease: "linear" },
          },
        ),
      );

      await animate(
        ".plus",
        { scale: [1, 1.2, 1] },
        { duration: 0.4, ease: "easeOut" },
      );
    };

    const stop = () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(".clock", { y: 0, x: 0 }, { duration: 0.2 });
      animate(".bells", { y: 0, x: 0 }, { duration: 0.2 });
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    // 🖱 hover logic (only when NOT controlled)
    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.svg
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
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
        <motion.circle className="clock" cx="12" cy="13" r="8" />
        <motion.path
          className="bells"
          style={{ transformOrigin: "3.5px 4.5px" }}
          d="M5 3 2 6"
        />
        <motion.path
          className="bells"
          style={{ transformOrigin: "20.5px 4.5px" }}
          d="m22 6-3-3"
        />
        <motion.path className="clock" d="M6.38 18.7 4 21" />
        <motion.path className="clock" d="M17.64 18.67 20 21" />
        <motion.g className="plus" style={{ transformOrigin: "12px 13px" }}>
          <path d="M12 10v6" />
          <path d="M9 13h6" />
        </motion.g>
      </motion.svg>
    );
  },
);

AlarmClockPlusIcon.displayName = "AlarmClockPlusIcon";

export default AlarmClockPlusIcon;
