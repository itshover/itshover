import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SendIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 2,
      className = "",
      disableHover = false,
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        ".send-icon",
        {
          x: [0, 24],
          y: [0, -24],
          opacity: [1, 0],
        },
        { duration: 0.25, ease: "easeIn" },
      );

      // instant reset
      await animate(".send-icon", { x: -24, y: 24 }, { duration: 0 });

      // come back
      await animate(
        ".send-icon",
        {
          x: [-24, 0],
          y: [24, 0],
          opacity: [0, 1],
        },
        { duration: 0.25, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".send-icon", { x: 0, y: 0, opacity: 1 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
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
        <motion.g className="send-icon" style={{ transformOrigin: "center" }}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 14l11 -11" />
          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
        </motion.g>
      </motion.svg>
    );
  },
);

SendIcon.displayName = "SendIcon";
export default SendIcon;
