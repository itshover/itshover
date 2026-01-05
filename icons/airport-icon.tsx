import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const AirportIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".airplane",
        {
          x: 14,
          y: 2,
          opacity: 1,
          scale: 1.1,
        },
        {
          duration: 0.3,
          delay: 0.1,
          ease: "easeOut", 
        },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".airplane",
        {
          x: 7,
          y: 5,
          opacity: 0,
          scale: 1,
        },
        {
          duration: 0.25,
          ease: "easeInOut",
        },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
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
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <path d="M7.752 20.75h-1c-1.414 0-2.121 0-2.56-.44-.44-.439-.44-1.146-.44-2.56v-7h4zm0 0v-7h8c1.416 0 2.123 0 2.56.44.44.439.44 1.146.44 2.56v1c0 1.414 0 2.121-.44 2.56-.438.44-1.145.44-2.56.44zm-2-18v-2m4.269 8.118c-.367.912-.55 1.367-.93 1.625-.38.257-.872.257-1.854.257H4.264c-.982 0-1.474 0-1.854-.257-.38-.258-.564-.713-.93-1.625l-.15-.375C.83 7.25.58 6.629.88 6.189c.297-.439.969-.439 2.313-.439h5.113c1.344 0 2.016 0 2.314.44.3.439.05 1.06-.45 2.303zM7.748 5.75H3.756c-.814-1.268-1.154-1.902-.941-2.404.284-.462 1.087-.596 2.557-.596h.76c1.47 0 2.274.134 2.558.596.213.502-.127 1.136-.942 2.404"></path>
        <motion.path initial={{x:7, y:5, opacity:0}} className="airplane" d="M.75 4.75h1.5l4-4"></motion.path>
        <motion.path initial={{x:7, y:5, opacity:0}} className="airplane" d="M5.25 1.75h-3.5M5.25 1.75v3.5"></motion.path>
      </motion.svg>
    );
  },
);

AirportIcon.displayName = "AirportIcon";
export default AirportIcon;