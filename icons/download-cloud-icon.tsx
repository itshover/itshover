import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const DownloadCloudIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".arrow",
        { y: [0, 4, 0] },
        { duration: 0.8, ease: "easeInOut", repeat: Infinity },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".arrow", { y: 0 }, { duration: 0.3 });
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
          <path d="M17.5 19c.7 0 1.3-.1 1.9-.4 1.6-.7 2.6-2.2 2.6-4 0-2.4-1.9-4.4-4.2-4.1C17.2 7.2 14.8 5 12 5c-2.4 0-4.5 1.5-5.3 3.7C4.4 9 2.5 11 2.5 13.5c0 3 2.5 5.5 5.5 5.5h9.5z" />
          <polyline points="8 12 12 16 16 12" className="arrow" />
          <line x1="12" y1="8" x2="12" y2="16" className="arrow" />
        </svg>
      </motion.div>
    );
  },
);

DownloadCloudIcon.displayName = "DownloadCloudIcon";
export default DownloadCloudIcon;
