import { forwardRef, useImperativeHandle, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const MousePointer2Icon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animationControls.current.push(
        animate(
          ".pointer",
          {
            x: [0, 3, 0, -3, 0],
            y: [0, -3, 0, 3, 0],
          },
          {
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
          },
        ),
      );
    };

    const stop = () => {
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(".pointer", { x: 0, y: 0 }, { duration: 0.3 });
    };

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
        <motion.path
          className="pointer"
          style={{ transformOrigin: "center" }}
          d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
        />
      </motion.svg>
    );
  },
);

MousePointer2Icon.displayName = "MousePointer2Icon";
export default MousePointer2Icon;
