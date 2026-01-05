import { forwardRef, useImperativeHandle, useCallback } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const MenuIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await Promise.all([
        animate(".line-top", { y: 6, rotate: 45 }, { duration: 0.3 }),
        animate(".line-middle", { opacity: 0, x: -10 }, { duration: 0.2 }),
        animate(".line-bottom", { y: -6, rotate: -45 }, { duration: 0.3 }),
      ]);
    }, [animate]);

    const stop = useCallback(() => {
      animate(".line-top", { y: 0, rotate: 0 }, { duration: 0.3 });
      animate(".line-middle", { opacity: 1, x: 0 }, { duration: 0.3 });
      animate(".line-bottom", { y: 0, rotate: 0 }, { duration: 0.3 });
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
          <line x1="4" y1="6" x2="20" y2="6" className="line-top" />
          <line x1="4" y1="12" x2="20" y2="12" className="line-middle" />
          <line x1="4" y1="18" x2="20" y2="18" className="line-bottom" />
        </svg>
      </motion.div>
    );
  },
);

MenuIcon.displayName = "MenuIcon";
export default MenuIcon;
