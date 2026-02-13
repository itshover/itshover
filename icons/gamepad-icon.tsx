import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const GamepadIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // Body scale pulse
      animate(
        scope.current,
        { scale: 1.05 },
        { duration: 0.2, ease: "easeOut" },
      );

      // D-pad shake
      animate(
        ".gamepad-dpad",
        {
          x: [0, -0.5, 0.5, -0.5, 0],
          y: [0, 0.5, -0.5, 0.5, 0],
        },
        { duration: 0.4, repeat: Infinity, ease: "linear" },
      );

      // Buttons alternate pulse
      animate(
        ".gamepad-dot-1",
        { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] },
        { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
      );
      animate(
        ".gamepad-dot-2",
        { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] },
        { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      animate(scope.current, { scale: 1 }, { duration: 0.2 });
      animate(".gamepad-dpad", { x: 0, y: 0 }, { duration: 0.2 });
      animate(".gamepad-dot-1", { opacity: 1, scale: 1 }, { duration: 0.2 });
      animate(".gamepad-dot-2", { opacity: 1, scale: 1 }, { duration: 0.2 });
    }, [animate, scope]);

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
        style={{ overflow: "visible" }}
      >
        {/* Body */}
        <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />

        {/* D-pad Group */}
        <motion.g className="gamepad-dpad">
          <line x1="6" x2="10" y1="11" y2="11" />
          <line x1="8" x2="8" y1="9" y2="13" />
        </motion.g>

        {/* Buttons */}
        <motion.line
          className="gamepad-dot-1"
          x1="15"
          x2="15.01"
          y1="12"
          y2="12"
          style={{ transformOrigin: "15px 12px" }}
        />
        <motion.line
          className="gamepad-dot-2"
          x1="18"
          x2="18.01"
          y1="10"
          y2="10"
          style={{ transformOrigin: "18px 10px" }}
        />
      </motion.svg>
    );
  },
);

GamepadIcon.displayName = "GamepadIcon";
export default GamepadIcon;
