import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const FilterIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const isAnimatingRef = useRef(false);

    const start = useCallback(async () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      // Filtering Loop
      while (isAnimatingRef.current) {
        // 1. Swarm of Input Particles (8-10 entering)
        const inParticles = Array.from({ length: 8 }).map(
          (_, i) => `.p-in-${i}`,
        );
        inParticles.forEach((selector, i) => {
          animate(
            selector,
            { y: [-4, 8], opacity: [0, 1, 0], scale: [0.3, 0.8, 0.3] },
            { duration: 0.8, delay: i * 0.1, ease: "easeIn" },
          );
        });

        // 2. Wait for "processing"
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (!isAnimatingRef.current) break;

        // 3. Output Particles (2 emerge from bottom)
        const outParticles = [".p-out-1", ".p-out-2"];

        // Sync Neck Pump with output
        animate(
          ".funnel",
          {
            scale: [1, 1.1, 1],
            strokeWidth: [strokeWidth, strokeWidth + 0.8, strokeWidth],
          },
          { duration: 0.4, ease: "backOut" },
        );

        outParticles.forEach((selector, i) => {
          animate(
            selector,
            { y: [14, 22], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] },
            { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
          );
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!isAnimatingRef.current) break;
      }
    }, [animate, strokeWidth]);

    const stop = useCallback(() => {
      isAnimatingRef.current = false;
      animate(
        ".funnel",
        { rotate: 0, scale: 1, strokeWidth },
        { duration: 0.3 },
      );
      animate(
        "[class^='p-in'], [class^='p-out']",
        { opacity: 0 },
        { duration: 0.3 },
      );
    }, [animate, strokeWidth]);

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
          className="funnel"
          d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"
          style={{ transformOrigin: "12px 14px" }}
        />

        {/* Input Swarm (8 Particles) */}
        <motion.circle
          className="p-in-0"
          cx="12"
          cy="0"
          r="0.5"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-in-1"
          cx="8"
          cy="-1"
          r="0.4"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-in-2"
          cx="16"
          cy="-2"
          r="0.6"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-in-3"
          cx="10"
          cy="1"
          r="0.4"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-in-4"
          cx="14"
          cy="0"
          r="0.5"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-in-5"
          cx="7"
          cy="2"
          r="0.3"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-in-6"
          cx="17"
          cy="1"
          r="0.4"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-in-7"
          cx="12"
          cy="-3"
          r="0.5"
          fill={color}
          stroke="none"
          opacity={0}
        />

        {/* Output Stream (2 Filtered Particles) */}
        <motion.circle
          className="p-out-1"
          cx="12"
          cy="0"
          r="1.2"
          fill={color}
          stroke="none"
          opacity={0}
        />
        <motion.circle
          className="p-out-2"
          cx="12"
          cy="0"
          r="1"
          fill={color}
          stroke="none"
          opacity={0}
        />
      </motion.svg>
    );
  },
);

FilterIcon.displayName = "FilterIcon";
export default FilterIcon;
