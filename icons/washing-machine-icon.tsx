import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const WashingMachineIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      // Continuously rotate the inner drum while hovering
      animationControls.current.push(
        animate(
          ".drum-inner",
          {
            rotate: [0, 360],
          },
          {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
        ),
      );
    };

    const stop = () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      // Stop the rotation
      animate(
        ".drum-inner",
        {
          rotate: 0,
        },
        {
          duration: 0.3,
          ease: "easeOut",
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

        {/* Machine body */}
        <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />

        {/* Drum outer */}
        <path d="M12 14m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />

        {/* Control buttons */}
        <path d="M8 6h.01" />
        <path d="M11 6h.01" />
        <path d="M14 6h2" />

        {/* Inner drum - rotating part */}
        <motion.path
          className="drum-inner"
          d="M8 14c1.333 -.667 2.667 -.667 4 0c1.333 .667 2.667 .667 4 0"
          style={{ transformOrigin: "50% 58.33%" }}
        />
      </motion.svg>
    );
  },
);

WashingMachineIcon.displayName = "WashingMachineIcon";
export default WashingMachineIcon;
