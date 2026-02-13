import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandTwitchIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const isAnimatingRef = useRef(false);

    const start = useCallback(async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // 1. Color Shift to Twitch Purple
      animate(
        scope.current,
        { color: "#9146FF", stroke: "#9146FF" },
        { duration: 0.3 },
      );

      while (isAnimatingRef.current) {
        // 2. The Blink (Random intervals)
        await animate(
          ".twitch-eyes",
          { scaleY: [1, 0, 1] },
          { duration: 0.1, ease: "easeInOut" },
        );

        if (!isAnimatingRef.current) break;

        // 3. The Glitch (Rare sharp shift)
        if (Math.random() > 0.6) {
          await animate(
            ".twitch-path",
            { x: [0, -1, 1, 0], y: [0, 0.5, -0.5, 0] },
            { duration: 0.15, ease: "linear" },
          );
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 800 + Math.random() * 2000),
        );
      }
    }, [animate, scope]);

    const stop = useCallback(() => {
      isAnimatingRef.current = false;
      animate(scope.current, { color, stroke: color }, { duration: 0.3 });
      animate(".twitch-eyes", { scaleY: 1 }, { duration: 0.3 });
      animate(".twitch-path", { x: 0, y: 0 }, { duration: 0.3 });
    }, [animate, color, scope]);

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
        <motion.path
          className="twitch-path"
          d="M21 2H3v16h5v4l4-4h5l4-4V2z"
          style={{ transformOrigin: "center" }}
        />
        <motion.g
          className="twitch-eyes"
          style={{ transformOrigin: "center 9px" }}
        >
          <path d="M11 11V7" />
          <path d="M16 11V7" />
        </motion.g>
      </motion.svg>
    );
  },
);

BrandTwitchIcon.displayName = "BrandTwitchIcon";
export default BrandTwitchIcon;
