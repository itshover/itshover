import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "framer-motion";

/**
 * WechatIcon 组件
 * 采用 Framer Motion 的线条生成 + 单次轻微抖动交互
 */
const WechatIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const playSingleJitter = useCallback(() => {
      animate(
        ".bubble-large-group",
        { x: [0, -0.8, 0.8, -0.4, 0], y: [0, 0.4, -0.4, 0.2, 0] },
        { duration: 0.4, ease: "easeInOut" },
      );
      animate(
        ".bubble-small-group",
        { x: [0, 0.8, -0.8, 0.4, 0], y: [0, -0.4, 0.4, -0.2, 0] },
        { duration: 0.4, ease: "easeInOut", delay: 0.05 },
      );
    }, [animate]);

    const start = useCallback(async () => {
      await animate(
        "path:not(.bg-none)",
        { pathLength: 0, opacity: 0 },
        { duration: 0 },
      );

      await animate(
        "path:not(.bg-none)",
        { pathLength: [0, 1], opacity: [0, 1] },
        {
          duration: 1.2,
          ease: "easeInOut",
          delay: stagger(0.08),
        },
      );

      playSingleJitter();
    }, [animate, playSingleJitter]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: () => {
        animate(
          "path:not(.bg-none)",
          { pathLength: 1, opacity: 1 },
          { duration: 0.3 },
        );
        animate(".bubble-large-group, .bubble-small-group", { x: 0, y: 0 });
      },
    }));

    useEffect(() => {
      start();
    }, [start]);

    return (
      <motion.svg
        ref={scope}
        onHoverStart={playSingleJitter}
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
        style={{ filter: "drop-shadow(0 0 10px rgba(7, 193, 96, 0.1))" }}
      >
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        <motion.g
          className="bubble-large-group"
          style={{ transformOrigin: "center" }}
        >
          <path d="M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 7 5.785l0 .233" />
          <path d="M10 8h.01" />
          <path d="M7 8h.01" />
        </motion.g>

        <motion.g
          className="bubble-small-group"
          style={{ transformOrigin: "center" }}
        >
          <path d="M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -2 3.47l0 2.03l-1.964 -1.178a6.649 6.649 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5" />
          <path d="M15 14h.01" />
          <path d="M18 14h.01" />
        </motion.g>
      </motion.svg>
    );
  },
);

WechatIcon.displayName = "WechatIcon";

export default WechatIcon;
