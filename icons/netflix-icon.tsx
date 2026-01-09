import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const NetflixIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const sequenceRef = useRef(0);

    const start = useCallback(async () => {
      if (!scope.current) return;

      sequenceRef.current++;
      const currentSeq = sequenceRef.current;

      animate(
        ".main-n",
        { opacity: 0, scale: 1.5, filter: "blur(10px)" },
        { duration: 0 },
      );
      animate(".ghost-left", { x: -15, opacity: 0 }, { duration: 0 });
      animate(".ghost-right", { x: 15, opacity: 0 }, { duration: 0 });
      animate("path:not(.bg-none)", { pathLength: 0 }, { duration: 0 });

      await new Promise((resolve) => setTimeout(resolve, 30));

      if (currentSeq !== sequenceRef.current) return;

      const ghostsAnim = animate(
        ".ghost-left, .ghost-right",
        { x: 0, opacity: [0, 0.6, 0] },
        { duration: 0.4, ease: "circOut" },
      );

      const mainAnim = animate(
        ".main-n",
        { opacity: 1, scale: 1, filter: "blur(0px)" },
        { duration: 0.4, ease: "circOut" },
      );

      const pathAnim = animate(
        "path:not(.bg-none)",
        { pathLength: 1 },
        { duration: 0.4, ease: "circOut" },
      );

      await Promise.all([ghostsAnim, mainAnim, pathAnim]);
    }, [animate, scope]);

    const stop = useCallback(() => {
      if (!scope.current) return;

      sequenceRef.current++;
      animate(
        ".main-n",
        { opacity: 1, scale: 1, filter: "blur(0px)" },
        { duration: 0.2 },
      );
      animate("path:not(.bg-none)", { pathLength: 1 }, { duration: 0.2 });
      animate(".ghost-left", { opacity: 0 }, { duration: 0.2 });
      animate(".ghost-right", { opacity: 0 }, { duration: 0.2 });
    }, [animate, scope]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    const nPaths = (
      <>
        <path d="M5 3v18h4v-10.5" />
        <path d="M19 21v-18h-4v10.5" />
        <path d="M9 3l10 18h-4l-10 -18l4 0" />
      </>
    );

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
          className="ghost-left"
          stroke="rgba(229, 9, 20, 0.6)"
          strokeWidth={strokeWidth}
        >
          {nPaths}
        </motion.g>

        <motion.g
          className="ghost-right"
          stroke="rgba(0, 255, 255, 0.6)"
          strokeWidth={strokeWidth}
        >
          {nPaths}
        </motion.g>

        <motion.g className="main-n" style={{ transformOrigin: "center" }}>
          {nPaths}
        </motion.g>
      </motion.svg>
    );
  },
);

NetflixIcon.displayName = "NetflixIcon";

export default NetflixIcon;
