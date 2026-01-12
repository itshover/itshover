import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CreditCard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", disableHover = false },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".card-body",
        {
          rotate: [0, -3, 3, 0],
          scale: [1, 1.02, 1],
        },
        {
          duration: 0.4,
          ease: "easeInOut",
        },
      );
      await animate(
        ".card-stripe",
        {
          opacity: [0, 1, 0],
          x: [-18, 18],
        },
        {
          duration: 0.5,
          ease: "easeInOut",
        },
      );
      animate(
        ".card-chip",
        {
          scale: [1, 1.6, 1],
          opacity: [0.6, 1, 0.6],
        },
        {
          duration: 0.25,
          ease: "easeOut",
        },
      );
    };

    const stop = () => {
      animate(".card-body", { rotate: 0, scale: 1 }, { duration: 0.2 });
      animate(".card-stripe", { opacity: 0, x: 0 }, { duration: 0.2 });
      animate(".card-chip", { scale: 1, opacity: 0.6 }, { duration: 0.2 });
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
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
        className={`inline-flex cursor-pointer ${className}`}
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
          
        >
          <motion.path
            className="card-body"
            style={{ transformOrigin: "50% 50%" }}
            d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"
          />

          <motion.path className="card-stripe" d="M3 10l18 0" opacity="0" />

          <motion.path
            className="card-chip"
            style={{ transformOrigin: "7px 15px" }}
            d="M7 15l.01 0"
          />

          <motion.path className="card-number" d="M11 15l2 0" />
        </svg>
      </motion.div>
    );
  },
);

CreditCard.displayName = "CreditCard";

export default CreditCard;
