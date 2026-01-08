import React, { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "motion/react";

/**
 * AlipayIcon
 */
const Alipay = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        "path:not(.bg-none)",
        { pathLength: 0, opacity: 0 },
        { duration: 0 },
      );

      await animate(
        "path:not(.bg-none)",
        {
          pathLength: [0, 1],
          opacity: [0, 1],
        },
        {
          duration: 0.8,
          ease: "easeInOut",
          delay: stagger(0.12, { startDelay: 0.1 }),
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        "path:not(.bg-none)",
        { pathLength: 1, opacity: 1 },
        { duration: 0.3 },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
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
          className="cursor-pointer"
          style={{ overflow: "visible" }}
        >
          <path
            d="M0 0h24v24H0z"
            stroke="none"
            className="bg-none"
            fill="none"
          />

          {/* 外框容器 */}
          <path d="M19 3h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-14a2 2 0 0 0 -2 -2" />

          {/* 顶部横笔画 */}
          <path d="M7 7h10" />

          {/* 中间竖笔画 */}
          <path d="M12 3v7" />

          {/* 支付宝核心 Swoosh/支字变形路径 */}
          <path d="M21 17.314c-2.971 -1.923 -15 -8.779 -15 -1.864c0 1.716 1.52 2.55 2.985 2.55c3.512 0 6.814 -5.425 6.814 -8h-6.604" />
        </motion.svg>
      </div>
    );
  },
);

Alipay.displayName = "Alipay";

export default Alipay;
