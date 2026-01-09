import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PaypalIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const sequenceRef = useRef(0);

    const start = useCallback(async () => {
      sequenceRef.current++;
      const currentSeq = sequenceRef.current;

      animate(".p-top", { y: -20, opacity: 0 }, { duration: 0 });
      animate(".p-bottom", { y: 20, opacity: 0 }, { duration: 0 });

      await new Promise((resolve) => setTimeout(resolve, 30));

      if (currentSeq !== sequenceRef.current) return;

      await Promise.all([
        animate(
          ".p-top",
          { y: 0, opacity: 1 },
          { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] },
        ),
        animate(
          ".p-bottom",
          { y: 0, opacity: 1 },
          { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] },
        ),
      ]);
    }, [animate]);

    const stop = useCallback(() => {
      sequenceRef.current++;
      animate(".p-top", { y: 0, opacity: 1 }, { duration: 0.2 });
      animate(".p-bottom", { y: 0, opacity: 1 }, { duration: 0.2 });
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

        <motion.g className="p-top">
          <path d="M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1m7.5 -5.8c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a.5 .5 0 0 1 -.5 -.6l.2 -1.4" />
        </motion.g>

        <motion.g className="p-bottom">
          <path d="M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1m7.5 -5.8c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a.5 .5 0 0 1 -.5 -.6l.2 -1.4" />
        </motion.g>
      </motion.svg>
    );
  },
);

PaypalIcon.displayName = "PaypalIcon";

export default PaypalIcon;
