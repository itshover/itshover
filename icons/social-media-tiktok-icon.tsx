import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

interface CustomTikTokProps extends AnimatedIconProps {
  opacity?: number;
  hoverOpacity?: number;
}

const TikTokIcon = forwardRef<AnimatedIconHandle, CustomTikTokProps>(
  (
    {
      size = 24,
      color = "currentColor",
      strokeWidth = 2.25,
      className = "",
      opacity = 1,
      hoverOpacity = 1,
      style, // Destructure style to merge safely
      ...svgProps // Collect all remaining standard SVG / HTML attributes
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const sequenceCancellation = useRef<(() => void) | null>(null);

    const cancelSequence = useCallback(() => {
      sequenceCancellation.current?.();
      sequenceCancellation.current = null;
    }, []);

    const start = useCallback(async () => {
      cancelSequence();

      let resolveCancellation: () => void = () => {};
      const cancellation = new Promise<void>((resolve) => {
        resolveCancellation = resolve;
        sequenceCancellation.current = resolve;
      });

      const runStep = async (
        definition: Parameters<typeof animate>[1],
        options: Parameters<typeof animate>[2],
      ) => {
        const cancelled = await Promise.race([
          animate(scope.current, definition, options).then(() => false),
          cancellation.then(() => true),
        ]);

        return cancelled;
      };

      try {
        if (
          await runStep(
            { scale: 1.25, rotate: 12, opacity: hoverOpacity },
            { duration: 0.2, ease: "easeOut" },
          )
        ) {
          return;
        }

        if (
          await runStep({ rotate: -12 }, { duration: 0.18, ease: "easeInOut" })
        ) {
          return;
        }

        await runStep(
          { scale: 1, rotate: 0 },
          { duration: 0.2, ease: "easeIn" },
        );
      } finally {
        if (sequenceCancellation.current === resolveCancellation) {
          sequenceCancellation.current = null;
        }
      }
    }, [animate, cancelSequence, hoverOpacity, scope]);

    const stop = useCallback(() => {
      cancelSequence();
      animate(
        scope.current,
        { scale: 1, rotate: 0, opacity: opacity },
        { duration: 0.15, ease: "easeOut" },
      );
    }, [animate, cancelSequence, scope, opacity]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        // 1. Spread standard props FIRST so internal controllers take precedence
        {...svgProps}
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
        style={{
          // 2. Spread incoming styles so users can pass inline layouts externally
          ...style,
          transformOrigin: "center center",
          opacity: opacity,
        }}
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </motion.svg>
    );
  },
);

TikTokIcon.displayName = "TikTokIcon";
export default TikTokIcon;
