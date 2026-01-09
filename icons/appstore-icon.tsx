import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate, stagger } from "motion/react";

const AppStoreIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await Promise.all([
        animate(
          "path:not(.bg-none)",
          { pathLength: 0, opacity: 0 },
          { duration: 0 },
        ),
        animate(scope.current, { rotate: 0 }, { duration: 0 }),
      ]);

      await animate(
        "path:not(.bg-none)",
        { pathLength: [0, 1], opacity: [0, 1] },
        {
          duration: 0.6,
          ease: "easeInOut",
          delay: stagger(0.1),
        },
      );

      await animate(
        scope.current,
        { rotate: 360 },
        { duration: 0.8, ease: "easeInOut" },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      animate(
        "path:not(.bg-none)",
        { pathLength: 1, opacity: 1 },
        { duration: 0.2 },
      );
      animate(scope.current, { rotate: 0 }, { duration: 0.2 });
    }, [animate, scope]);

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
        className={`cursor-pointer overflow-visible ${className}`}
      >
        <path d="M0 0h24v24H0z" stroke="none" className="bg-none" fill="none" />

        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />

        <path d="M8 16l1.106 -1.99m1.4 -2.522l2.494 -4.488" />

        <path d="M7 14h5m2.9 0h2.1" />

        <path d="M16 16l-2.51 -4.518m-1.487 -2.677l-1 -1.805" />
      </motion.svg>
    );
  },
);

AppStoreIcon.displayName = "AppStoreIcon";

export default AppStoreIcon;
