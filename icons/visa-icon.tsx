import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const Visa = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const sequenceRef = useRef(0);

    const start = useCallback(async () => {
      sequenceRef.current++;
      const currentSeq = sequenceRef.current;

      animate(
        ".visa-container",
        { x: 80, opacity: 0, skewX: -30 },
        { duration: 0 },
      );

      animate(".card-frame", { opacity: 1, scale: 1 }, { duration: 0 });

      await new Promise((resolve) => setTimeout(resolve, 30));

      if (currentSeq !== sequenceRef.current) return;

      await animate(
        ".visa-container",
        { x: 0, opacity: 1, skewX: 0 },
        { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      );

      if (currentSeq !== sequenceRef.current) return;

      animate(".card-frame", { opacity: 0, scale: 1.05 }, { duration: 0.2 });
    }, [animate]);

    const stop = useCallback(() => {
      sequenceRef.current++;

      animate(
        ".visa-container",
        { x: 0, opacity: 1, skewX: 0 },
        { duration: 0.2 },
      );
      animate(".card-frame", { opacity: 0 }, { duration: 0.2 });
    }, [animate]);

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
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        <motion.g
          className="visa-container"
          style={{ transformOrigin: "center" }}
        >
          <motion.path
            className="card-frame"
            d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2H3a2 2 0 0 1 -2 -2V7a2 2 0 0 1 2 -2z"
            initial={{ opacity: 0 }}
          />

          <g className="visa-text">
            <path d="M3 9h1v6h.5l2.5 -6" />
            <path d="M9 15l1 -6" />
            <path d="M16 9.5a.5 .5 0 0 0 -.5 -.5h-.75c-.721 0 -1.337 .521 -1.455 1.233l-.09 .534a1.059 1.059 0 0 0 1.045 1.233a1.059 1.059 0 0 1 1.045 1.233l-.09 .534a1.476 1.476 0 0 1 -1.455 1.233h-.75a.5 .5 0 0 1 -.5 -.5" />
            <path d="M21 15l-1 -6l-2.5 6" />
            <path d="M18 14h2.7" />
          </g>
        </motion.g>
      </motion.svg>
    );
  },
);

Visa.displayName = "Visa";

export default Visa;
