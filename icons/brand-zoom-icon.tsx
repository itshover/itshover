import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandZoomIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        scope.current,
        {
          scale: [1, 0.7],
          opacity: [1, 0.6],
        },
        {
          duration: 0.2,
          ease: "easeIn",
        },
      );
      await animate(
        scope.current,
        {
          scale: [0.7, 1.3, 1.15],
          opacity: [0.6, 1],
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
        },
        {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        },
      );

      animate(
        "motion\\:nth-of-type(1)",
        {
          x: [0, 3, 0],
          opacity: [1, 0.7, 1],
        },
        {
          duration: 0.3,
          repeat: 2,
          ease: "easeInOut",
        },
      );

      await animate(
        "motion\\:nth-of-type(2)",
        {
          scale: [1, 1.08, 1.05, 1],
          fill: ["none", "rgba(59, 130, 246, 0.1)", "none"],
        },
        {
          duration: 0.5,
          ease: "easeOut",
        },
      );

      animate(
        scope.current,
        {
          y: [0, -2, 0],
          scale: [1.15, 1.05, 1],
        },
        {
          duration: 0.4,
          ease: "easeOut",
        },
      );
    };

    const stop = () => {
      animate(
        scope.current,
        {
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          opacity: 1,
        },
        {
          duration: 0.3,
          ease: "easeOut",
        },
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
      <motion.svg
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
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
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path
          d="M17.011 9.385v5.128l3.989 3.487v-12l-3.989 3.385"
          initial={{ x: 0, opacity: 1 }}
        />
        <motion.path
          d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287l-.001 -.002"
          initial={{ scale: 1, fill: "none" }}
        />
      </motion.svg>
    );
  },
);

BrandZoomIcon.displayName = "BrandZoomIcon";

export default BrandZoomIcon;
