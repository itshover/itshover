"use client";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CloudIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      animate(".wind-trail-1", { opacity: 0, x: -6 }, { duration: 0 });
      animate(".wind-trail-2", { opacity: 0, x: -6 }, { duration: 0 });
      animate(".wind-trail-3", { opacity: 0, x: -6 }, { duration: 0 });
    }, [animate]);

    const start = async () => {
      // 1. Move cloud
      animate(
        ".cloud-body",
        { x: 5 },
        { duration: 0.4, ease: "easeOut" }
      );

      // 2. Show straight trails one by one
      await animate(
        ".wind-trail-1",
        { opacity: 1, x: 0 },
        { duration: 0.15, ease: "easeOut" }
      );

      await animate(
        ".wind-trail-2",
        { opacity: 1, x: 0 },
        { duration: 0.15, ease: "easeOut" }
      );

      await animate(
        ".wind-trail-3",
        { opacity: 1, x: 0 },
        { duration: 0.15, ease: "easeOut" }
      );
    };

    const stop = async () => {
      animate(".cloud-body", { x: 0 }, { duration: 0.3 });
      await animate(
        ".wind-trail-1, .wind-trail-2, .wind-trail-3",
        { opacity: 0, x: -6 },
        { duration: 0.2, ease: "easeInOut" }
      );
    };

    useImperativeHandle(ref, () => {
      return {
        startAnimation: start,
        stopAnimation: stop,
      };
    });

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.div
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ overflow: "visible" }}
        >
          {/* Wind Trails - Simple straight lines for speeding effect */}
          <motion.path
            className="wind-trail-1"
            d="M 1 10 h 4"
            initial={{ opacity: 0, x: -6 }}
          />
          <motion.path
            className="wind-trail-2"
            d="M 0 13 h 4"
            initial={{ opacity: 0, x: -6 }}
          />
          <motion.path
            className="wind-trail-3"
            d="M 1 16 h 4"
            initial={{ opacity: 0, x: -6 }}
          />

          {/* Cloud Body */}
          <motion.g className="cloud-body">
            <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878" />
          </motion.g>
        </svg>
      </motion.div>
    );
  },
);

CloudIcon.displayName = "CloudIcon";
export default CloudIcon;
