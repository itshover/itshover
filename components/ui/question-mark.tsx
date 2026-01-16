import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const QuestionMark = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
      await animate(
        ".question-mark",
        { pathLength: [0, 1] },
        { duration: 0.4, ease: "easeInOut" },
      );

      await animate(
        ".question-mark-dot",
        {
          pathLength: [0, 1],
          y: [0, -3, 0],
        },
        { duration: 0.3, ease: "easeOut" },
      );

      animate(
        ".question-group",
        { scale: [1, 1.05, 1] },
        { duration: 0.2, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".question-mark, .question-mark-dot, .question-group",
        { pathLength: 1, y: 0, scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
      >
        <motion.svg
          className={`question-group cursor-pointer ${className}`}
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
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            className="question-mark"
            d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"
          />
          <path className="question-mark-dot" d="M12 19l0 .01" />
        </motion.svg>
      </motion.div>
    );
  },
);

QuestionMark.displayName = "QuestionMark";
export default QuestionMark;
