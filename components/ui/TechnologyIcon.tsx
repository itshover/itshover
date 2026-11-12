import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const TechnologyIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
      // Main chip pulse
      animate(
        ".tech-chip",
        {
          scale: [1, 1.06, 1],
        },
        {
          duration: 0.55,
          ease: "easeInOut",
        },
      );

      // Top signal
      animate(
        ".tech-top",
        {
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.15, 0.8],
        },
        {
          duration: 0.45,
          ease: "easeInOut",
        },
      );

      // Right signal
      animate(
        ".tech-right",
        {
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.15, 0.8],
        },
        {
          duration: 0.45,
          ease: "easeInOut",
          delay: 0.08,
        },
      );

      // Bottom signal
      animate(
        ".tech-bottom",
        {
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.15, 0.8],
        },
        {
          duration: 0.45,
          ease: "easeInOut",
          delay: 0.16,
        },
      );

      // Left signal
      animate(
        ".tech-left",
        {
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.15, 0.8],
        },
        {
          duration: 0.45,
          ease: "easeInOut",
          delay: 0.24,
        },
      );

      // Inner circuit pulse
      animate(
        ".tech-core",
        {
          opacity: [0.5, 1, 0.5],
        },
        {
          duration: 0.4,
          ease: "easeInOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".tech-chip",
        {
          scale: 1,
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );

      animate(
        ".tech-top",
        {
          opacity: 1,
          scale: 1,
        },
        {
          duration: 0.2,
        },
      );

      animate(
        ".tech-right",
        {
          opacity: 1,
          scale: 1,
        },
        {
          duration: 0.2,
        },
      );

      animate(
        ".tech-bottom",
        {
          opacity: 1,
          scale: 1,
        },
        {
          duration: 0.2,
        },
      );

      animate(
        ".tech-left",
        {
          opacity: 1,
          scale: 1,
        },
        {
          duration: 0.2,
        },
      );

      animate(
        ".tech-core",
        {
          opacity: 1,
        },
        {
          duration: 0.2,
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
        {/* Chip */}
        <motion.rect
          className="tech-chip"
          x="7"
          y="7"
          width="10"
          height="10"
          rx="2"
          style={{
            transformOrigin: "12px 12px",
          }}
        />

        {/* Inner circuit */}
        <motion.path className="tech-core" d="M10 10h4v4h-4z" />

        {/* Top connection */}
        <path d="M10 7V4" />
        <motion.circle
          className="tech-top"
          cx="10"
          cy="3"
          r="1"
          style={{
            transformOrigin: "10px 3px",
          }}
        />

        {/* Right connection */}
        <path d="M17 14h3" />
        <motion.circle
          className="tech-right"
          cx="21"
          cy="14"
          r="1"
          style={{
            transformOrigin: "21px 14px",
          }}
        />

        {/* Bottom connection */}
        <path d="M14 17v3" />
        <motion.circle
          className="tech-bottom"
          cx="14"
          cy="21"
          r="1"
          style={{
            transformOrigin: "14px 21px",
          }}
        />

        {/* Left connection */}
        <path d="M7 10H4" />
        <motion.circle
          className="tech-left"
          cx="3"
          cy="10"
          r="1"
          style={{
            transformOrigin: "3px 10px",
          }}
        />

        {/* Additional chip pins */}
        <path d="M14 7V4" />
        <path d="M17 10h3" />
        <path d="M10 17v3" />
        <path d="M7 14H4" />
      </motion.svg>
    );
  },
);

TechnologyIcon.displayName = "TechnologyIcon";

export default TechnologyIcon;
