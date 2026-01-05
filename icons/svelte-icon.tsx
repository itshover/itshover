import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SvelteIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      animate(
        ".svelte-path",
        { pathLength: [0, 1] },
        { duration: 0.8, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".svelte-path", { pathLength: 1 }, { duration: 0.3 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
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
          <path
            d="M15 6C15 6 16.0001 5.00003 17.5 5.00003C19.5 5.00003 21 6.50003 21 8.50003C21 10.5 19.5 12 17.5 12H6.5C4.5 12 3 13.5 3 15.5C3 17.5 4.5 19 6.5 19C8 19 9 18 9 18M15 6L9 18M15 6C14 6 13 7 13 8.5C13 10 14 11 15 11H17.5M9 18C10 18 11 17 11 15.5C11 14 10 13 9 13H6.5"
            className="svelte-path"
          />
        </svg>
      </motion.div>
    );
  },
);

SvelteIcon.displayName = "SvelteIcon";
export default SvelteIcon;
