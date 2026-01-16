import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandOpenaiIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".internal",
        { pathOffset: [1, 0] },
        {
          duration: 0.8,
          ease: "easeInOut",
          delay: (i) => i * 0.05,
        },
      );
    };

    const stop = () => {
      animate(
        ".internal",
        { pathOffset: 0 },
        { duration: 0.3, ease: "easeInOut" },
      );
    };

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
        className={`cursor-pointer select-none ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        {[
          "M11.217 19.384a3.501 3.501 0 0 0 6.783 -1.217v-5.167l-6 -3.35",
          "M5.214 15.014a3.501 3.501 0 0 0 4.446 5.266l4.34 -2.534v-6.946",
          "M6 7.63c-1.391 -.236 -2.787 .395 -3.534 1.689a3.474 3.474 0 0 0 1.271 4.745l4.263 2.514l6 -3.348",
          "M12.783 4.616a3.501 3.501 0 0 0 -6.783 1.217v5.067l6 3.45",
          "M18.786 8.986a3.501 3.501 0 0 0 -4.446 -5.266l-4.34 2.534v6.946",
          "M18 16.302c1.391 .236 2.787 -.395 3.534 -1.689a3.474 3.474 0 0 0 -1.271 -4.745l-4.308 -2.514l-5.955 3.42",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            className="internal"
            initial={{
              pathLength: 1,
              opacity: 1,
            }}
          />
        ))}
      </motion.svg>
    );
  },
);

BrandOpenaiIcon.displayName = "BrandOpenaiIcon";
export default BrandOpenaiIcon;
