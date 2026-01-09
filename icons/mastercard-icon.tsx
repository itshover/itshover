import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const MastercardIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const sequenceRef = useRef(0);

    const start = useCallback(async () => {
      sequenceRef.current++;
      const currentSeq = sequenceRef.current;

      animate(".mc-left", { x: -20, opacity: 0 }, { duration: 0 });
      animate(".mc-right", { x: 20, opacity: 0 }, { duration: 0 });
      animate(".mc-frame", { pathLength: 0, opacity: 0 }, { duration: 0 });

      await new Promise((resolve) => setTimeout(resolve, 30));

      if (currentSeq !== sequenceRef.current) return;

      await Promise.all([
        animate(
          ".mc-left",
          { x: 0, opacity: 1 },
          { duration: 0.5, ease: "backOut" },
        ),
        animate(
          ".mc-right",
          { x: 0, opacity: 1 },
          { duration: 0.5, ease: "backOut" },
        ),
      ]);

      if (currentSeq !== sequenceRef.current) return;

      await animate(
        ".mc-frame",
        { pathLength: 1, opacity: 1 },
        { duration: 0.4, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      sequenceRef.current++;
      animate(".mc-left", { x: 0, opacity: 1 }, { duration: 0.2 });
      animate(".mc-right", { x: 0, opacity: 1 }, { duration: 0.2 });
      animate(".mc-frame", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
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

        <motion.path
          className="mc-frame"
          d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"
        />

        <motion.path
          className="mc-right"
          d="M11 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
        />

        <motion.path className="mc-left" d="M12 9.765a3 3 0 1 0 0 4.47" />
      </motion.svg>
    );
  },
);

MastercardIcon.displayName = "MastercardIcon";

export default MastercardIcon;
