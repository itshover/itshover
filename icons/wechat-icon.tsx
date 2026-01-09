import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "motion/react";

const WechatIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(".rising-bubble", { y: 0, opacity: 0 }, { duration: 0 });
      animate(".main-bubble", { x: 0 }, { duration: 0 });

      const bubblesAnim = animate(
        ".rising-bubble",
        {
          y: [0, -25],
          opacity: [0, 1, 0],
        },
        {
          duration: 1.5,
          ease: "easeOut",
          delay: stagger(0.2),
        },
      );

      await new Promise((resolve) => setTimeout(resolve, 300));

      await animate(
        ".main-bubble",
        { x: [0, -1.5, 1.5, -1, 1, 0] },
        { duration: 0.5, ease: "easeInOut" },
      );

      await bubblesAnim;
    }, [animate]);

    const stop = useCallback(() => {
      animate(".main-bubble", { x: 0 }, { duration: 0.2 });
      animate(".rising-bubble", { opacity: 0 }, { duration: 0.2 });
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
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        <motion.circle
          cx="8"
          cy="22"
          r="1"
          className="rising-bubble"
          fill={color}
          stroke="none"
          initial={{ opacity: 0 }}
        />
        <motion.circle
          cx="17"
          cy="22"
          r="1.2"
          className="rising-bubble"
          fill={color}
          stroke="none"
          initial={{ opacity: 0 }}
        />
        <motion.circle
          cx="12"
          cy="24"
          r="0.8"
          className="rising-bubble"
          fill={color}
          stroke="none"
          initial={{ opacity: 0 }}
        />

        <motion.g
          className="bubble-large-group main-bubble"
          style={{ transformOrigin: "center" }}
        >
          <path d="M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 7 5.785l0 .233" />
          <path d="M10 8h.01" />
          <path d="M7 8h.01" />
        </motion.g>

        <motion.g
          className="bubble-small-group main-bubble"
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
