import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PenIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
        ".pen-group",
        {
          x: [0, 1, -1, 1, -1, 0],
          y: [0, -2, -4, -6, -8, -10],
          rotate: [0, -6, -4, -6, -4, 0],
        },
        { duration: 0.8, ease: "easeInOut" },
      );

      await animate(
        ".pen-slash",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.3, ease: "easeOut" },
      );

      await animate(
        ".pen-slash",
        { pathLength: 0, opacity: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );

      animate(
        ".pen-group",
        { x: 0, y: 0, rotate: 0 },
        { duration: 0.25, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".pen-group",
        { x: 0, y: 0, rotate: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(
        ".pen-slash",
        { pathLength: 0, opacity: 0 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeMiterlimit="10"
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
      >
        <motion.g
          className="pen-group"
          style={{
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        >
          {/* Slash animation (pathLength works now) */}
          <motion.path
            className="pen-slash"
            d="M20 6 L26 12"
            initial={{ pathLength: 0, opacity: 0 }}
          />

          {/* Pen body */}
          <motion.path
            className="pen-body"
            d="m10.5,27.5l-8,2 2-8L22.257,3.743c1.657-1.657,4.343-1.657,6,0s1.657,4.343,0,6L10.5,27.5Z"
          />
        </motion.g>
      </motion.svg>
    );
  },
);

PenIcon.displayName = "PenIcon";
export default PenIcon;
