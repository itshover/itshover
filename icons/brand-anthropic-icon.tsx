import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandAnthropicIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // Simple scale pulse on the slash
      animate(
        ".anthropic-i",
        { rotateX: 22, skewX: -22, scaleY: 1.09 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".anthropic-i",
        { rotateX: 0, skewX: 0, scaleY: 1 },
        { duration: 0.2 },
      );
    }, [animate]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: start,
        stopAnimation: stop,
      }),
      [start, stop],
    );

    return (
      <motion.svg
        ref={scope}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <title>Anthropic</title>

        {/* A */}
        <motion.g
          className="anthropic-a"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <path d="M6.57 3.52h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.673 20H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
        </motion.g>

        {/* Backslash */}
        <motion.g
          className="anthropic-i"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48z" />
        </motion.g>
      </motion.svg>
    );
  },
);

BrandAnthropicIcon.displayName = "BrandAnthropicIcon";
export default BrandAnthropicIcon;
