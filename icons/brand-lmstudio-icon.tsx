import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandLmStudioIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 1, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const lines = [
      ".lm-line-1",
      ".lm-line-2",
      ".lm-line-3",
      ".lm-line-4",
      ".lm-line-5",
      ".lm-line-6",
    ];

    const start = useCallback(() => {
      lines.forEach((line, i) => {
        const strength = 1 + i * 0.06;
        animate(
          line,
          {
            scaleX: [1, strength, 0.9, strength * 0.95, 1],
          },
          {
            duration: 1.4,
            delay: i * 0.08,
            ease: "easeInOut",
            repeat: Infinity,
          },
        );
      });
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        lines.join(", "),
        { scaleX: 1 },
        { duration: 0.2, ease: "easeOut" },
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
        strokeWidth={strokeWidth}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <title>LM Studio</title>

        <motion.path
          className="lm-line-1"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M2.84 2a1.273 1.273 0 100 2.547h10.287a1.274 1.274 0 000-2.547H2.84z"
        />

        <motion.path
          className="lm-line-2"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M7.935 5.33a1.273 1.273 0 000 2.548H18.22a1.274 1.274 0 000-2.547H7.935z"
        />

        <motion.path
          className="lm-line-3"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M3.624 9.935c0-.704.57-1.274 1.274-1.274h10.286a1.273 1.273 0 010 2.547H4.898c-.703 0-1.274-.57-1.274-1.273z"
        />

        <motion.path
          className="lm-line-4"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M1.273 12.188a1.273 1.273 0 100 2.547H11.56a1.274 1.274 0 000-2.547H1.273z"
        />

        <motion.path
          className="lm-line-5"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M3.624 16.792c0-.704.57-1.274 1.274-1.274h10.286a1.273 1.273 0 110 2.547H4.898c-.703 0-1.274-.57-1.274-1.273z"
        />

        <motion.path
          className="lm-line-6"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          d="M13.029 18.849a1.273 1.273 0 100 2.547h5.78a1.273 1.273 0 100-2.547h-5.78z"
        />
      </motion.svg>
    );
  },
);

BrandLmStudioIcon.displayName = "BrandLmStudioIcon";
export default BrandLmStudioIcon;
