import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const TrophyIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      // Victory Lift and Tilt
      animate(
        ".trophy-group",
        {
          y: [0, -4, -4, 0],
          rotate: [0, -10, 10, 0],
        },
        {
          duration: 0.8,
          ease: "easeOut",
          times: [0, 0.4, 0.7, 1],
        },
      );

      // Confetti Burst
      const confettiSequences = [
        { selector: ".confetti-1", x: [0, -12], y: [0, -15], rotate: [0, 140] },
        { selector: ".confetti-2", x: [0, -5], y: [0, -18], rotate: [0, -100] },
        { selector: ".confetti-3", x: [0, 5], y: [0, -18], rotate: [0, 120] },
        { selector: ".confetti-4", x: [0, 12], y: [0, -15], rotate: [0, -140] },
      ];

      confettiSequences.forEach((conf) => {
        animate(
          conf.selector,
          {
            x: conf.x,
            y: conf.y,
            rotate: conf.rotate,
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
          },
          {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.1,
          },
        );
      });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".trophy-group", { y: 0, rotate: 0 }, { duration: 0.3 });
      animate(
        ".confetti-1, .confetti-2, .confetti-3, .confetti-4",
        { opacity: 0, scale: 0 },
        { duration: 0.2 },
      );
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
        style={{ overflow: "visible" }}
      >
        <motion.g
          className="trophy-group"
          style={{ transformOrigin: "center 20px" }}
        >
          {/* Handles */}
          <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
          <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />

          {/* Base */}
          <path d="M4 22h16" />
          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
          <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />

          {/* Cup Body */}
          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />

          {/* Confetti Pieces */}
          <motion.rect
            className="confetti-1"
            x="11"
            y="6"
            width="2"
            height="2"
            rx="0.5"
            fill="#FFD700"
            stroke="none"
            opacity={0}
            style={{ transformOrigin: "center" }}
          />
          <motion.rect
            className="confetti-2"
            x="12"
            y="5"
            width="2"
            height="2"
            rx="0.5"
            fill="#FF4500"
            stroke="none"
            opacity={0}
            style={{ transformOrigin: "center" }}
          />
          <motion.rect
            className="confetti-3"
            x="13"
            y="6"
            width="2"
            height="2"
            rx="0.5"
            fill="#00BFFF"
            stroke="none"
            opacity={0}
            style={{ transformOrigin: "center" }}
          />
          <motion.rect
            className="confetti-4"
            x="12"
            y="7"
            width="2"
            height="2"
            rx="0.5"
            fill="#32CD32"
            stroke="none"
            opacity={0}
            style={{ transformOrigin: "center" }}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

TrophyIcon.displayName = "TrophyIcon";
export default TrophyIcon;
