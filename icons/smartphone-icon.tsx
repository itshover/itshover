import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SmartphoneIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const controls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = useCallback(() => {
      controls.current.forEach((c) => c.stop());
      controls.current = [];

      controls.current.push(
        animate(
          ".screen",
          {
            opacity: [0, 1],
            scale: [0.95, 0.98, 1],
          },
          {
            duration: 0.25,
            ease: "easeOut",
          },
        ),
      );

      controls.current.push(
        animate(
          ".bar1",
          {
            opacity: [0, 1],
            x: [1.5, 0],
          },
          {
            duration: 0.2,
            delay: 0.05,
            ease: "easeOut",
          },
        ),
      );

      controls.current.push(
        animate(
          ".bar2",
          {
            opacity: [0, 1],
            x: [1.5, 0],
          },
          {
            duration: 0.2,
            delay: 0.12,
            ease: "easeOut",
          },
        ),
      );

      controls.current.push(
        animate(
          ".bar3",
          {
            opacity: [0, 1],
            x: [1.5, 0],
          },
          {
            duration: 0.2,
            delay: 0.2,
            ease: "easeOut",
          },
        ),
      );
      controls.current.push(
        animate(
          ".home-button",
          {
            opacity: [0.5, 1],
            scale: [1, 1.15, 1],
          },
          {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        ),
      )
    }, [animate]);

    const stop = useCallback(() => {
      controls.current.forEach((c) => c.stop());
      controls.current = [];

      animate(
        ".screen",
        {
          opacity: 0,
          scale: 1,
        },
        {
          duration: 0.15,
          ease: "easeIn",
        },
      );
      animate(
        ".home-button",
        {
          opacity: 0.5,
          scale: 1,
        },
        {
          duration: 0.2,
        },
      );
      animate(
        ".bar1, .bar2, .bar3",
        {
          opacity: 0,
          x: 1,
        },
        {
          duration: 0.1,
        },
      );
    }, [animate]);

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

        {/* Phone Frame */}
        <path d="M7 4a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v16a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-16z" />

        <motion.circle
          className="home-button"
          cx="12"
          cy="18.2"
          r="0.9"
          fill="none"
          stroke={color}
          opacity={0.5}
        />

        {/* Screen */}
        <motion.rect
          className="screen"
          x="8.2"
          y="6"
          width="7.5"
          height="8"
          rx="0.8"
          fill={color}
          stroke="none"
          opacity={0}
          style={{
            transformOrigin: "12px 11px",
          }}
        />

        {/* UI Content */}
        <motion.rect
          className="bar1"
          x="9.2"
          y="8.4"
          width="5"
          height="0.7"
          rx="0.35"
          fill="white"
          stroke="none"
          opacity={0}
        />

        <motion.rect
          className="bar2"
          x="9.2"
          y="10.4"
          width="3.5"
          height="0.6"
          rx="0.3"
          fill="white"
          stroke="none"
          opacity={0}
        />

        <motion.rect
          className="bar3"
          x="9.2"
          y="12.2"
          width="4.5"
          height="0.6"
          rx="0.3"
          fill="white"
          stroke="none"
          opacity={0}
        />
      </motion.svg>
    );
  },
);

SmartphoneIcon.displayName = "SmartphoneIcon";

export default SmartphoneIcon;