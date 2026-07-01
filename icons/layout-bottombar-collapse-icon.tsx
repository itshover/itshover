import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LayoutBottombarCollapseIcon = forwardRef<
  AnimatedIconHandle,
  AnimatedIconProps
>(({ size = 24, color = "currentColor", className = "" }, ref) => {
  const [scope, animate] = useAnimate();

  const start = useCallback(async () => {
    animate(
      ".chevron",
      {
        y: 2,
      },
      {
        duration: 0.3,
        ease: "easeOut",
      },
    );

    animate(
      ".bottombar",
      {
        opacity: 0.6,
      },
      {
        duration: 0.3,
        ease: "easeInOut",
      },
    );
  }, [animate]);

  const stop = useCallback(async () => {
    animate(
      ".chevron, .bottombar",
      {
        y: 0,
        opacity: 1,
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
      fill={color}
      className={`cursor-pointer ${className}`}
      onHoverStart={start}
      onHoverEnd={stop}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      {/* Panel frame: outer rounded rect + full-height inner cutout → renders the border ring only */}
      <path d="M18 3a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h12zm0 2h-12a1 1 0 0 0 -.993 .883l-.007 .117v11.117a1 1 0 0 0 .883 .883l.117 .007h12a1 1 0 0 0 .993 -.883l.007 -.117v-11a1 1 0 0 0 -.883 -.993l-.117 -.007z" />

      {/* Bottom bar: separate element so it can be dimmed independently on hover */}
      <motion.path
        className="bottombar"
        d="M5 15h14v3a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z"
      />

      <motion.g className="chevron">
        <path d="M10.613 8.21l.094 .083l1.293 1.292l1.293 -1.292a1 1 0 0 1 1.32 -.083l.094 .083a1 1 0 0 1 .083 1.32l-.083 .094l-2 2a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497z" />
      </motion.g>
    </motion.svg>
  );
});

LayoutBottombarCollapseIcon.displayName = "LayoutBottombarCollapseIcon";
export default LayoutBottombarCollapseIcon;
