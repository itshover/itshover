import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const TagIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(scope.current, { scale: 1.07 }, { duration: 0.2 });
      animate(
        ".tag-group",
        { rotate: [0, -25, 20, 0] },
        {
          duration: 1.25,
          ease: "easeInOut",
        },
      );
    };

    const stop = () => {
      animate(scope.current, { scale: 1 }, { duration: 0.2 });
      animate(".tag-group", { rotate: 0 }, { duration: 0.2 });
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
        <motion.g className="tag-group" style={{ transformOrigin: "7px 7px" }}>
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />

          <motion.circle
            className="tag-hole"
            cx="7"
            cy="7"
            r="0.5"
            fill={color}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

TagIcon.displayName = "TagIcon";
export default TagIcon;
