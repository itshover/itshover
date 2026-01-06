import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";

const CodeMergeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        "#merge-path",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.3, ease: "easeOut" },
      );

      await Promise.all([
        animate(
          "#top-circle",
          { scale: [1, 1.15, 1] },
          { duration: 0.4, delay: 0.2 },
        ),
        animate(
          "#bottom-circle",
          { scale: [1, 1.15, 1] },
          { duration: 0.4, delay: 0.3 },
        ),
      ]);

      await animate(".icon-group", { scale: 1.1 }, { duration: 0.3 });
    };

    const stop = () => {
      animate("#merge-path", { pathLength: 1, opacity: 1 }, { duration: 0.4 });
      animate("#top-circle", { scale: 1 }, { duration: 0.25 });
      animate("#bottom-circle", { scale: 1 }, { duration: 0.25 });
      animate(".icon-group", { scale: 1 }, { duration: 0.25 });
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
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g className="icon-group" style={{ transformOrigin: "center" }}>
          <motion.circle id="top-circle" cx="6" cy="6" r="3" />
          <motion.circle id="bottom-circle" cx="18" cy="18" r="3" />

          <motion.path
            id="merge-path"
            d="M6 21V9a9 9 0 0 0 9 9"
            pathLength={1}
            opacity={1}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

CodeMergeIcon.displayName = "CodeMergeIcon";
export default CodeMergeIcon;
