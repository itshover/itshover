import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
} from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CLAUDE_CODE_PATH =
  "M21 10.5h3v3h-3v3h-1.5v3H18v-3h-1.5v3H15v-3H9v3H7.5v-3H6v3H4.5v-3H3v-3H0v-3h3v-6h18Zm-15 0h1.5v-3H6Zm10.5 0H18v-3h-1.5z";

const CURSOR = { x: 10.5, y: 16.5, width: 4.5, height: 1.5 };

const ClaudeCodeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", className = "" }, ref) => {
    const [scope, animate] = useAnimate();
    const maskId = useId();

    const start = useCallback(async () => {
      animate(
        ".claude-prompt",
        { x: [0, 1.5, 0] },
        { duration: 0.35, ease: "easeInOut" },
      );
      animate(
        ".claude-cursor",
        { opacity: [1, 0, 1, 0, 1] },
        { duration: 0.8, ease: "linear" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".claude-prompt",
        { x: 0 },
        { duration: 0.2, ease: "easeOut" },
      );
      animate(
        ".claude-cursor",
        { opacity: 1 },
        { duration: 0.15, ease: "easeOut" },
      );
    }, [animate]);

    useImperativeHandle(
      ref,
      () => ({
        startAnimation: start,
        stopAnimation: stop,
      }),
      [start, stop],
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
        fill={color}
        fillRule="evenodd"
        className={`cursor-pointer ${className}`}
        style={{ flex: "none", lineHeight: 1 }}
      >
        <title>Claude Code</title>

        <defs>
          <mask id={maskId}>
            <rect width="24" height="24" fill="white" />
            <rect
              x={CURSOR.x}
              y={CURSOR.y}
              width={CURSOR.width}
              height={CURSOR.height}
              fill="black"
            />
          </mask>
        </defs>

        <motion.g className="claude-prompt">
          <path d={CLAUDE_CODE_PATH} mask={`url(#${maskId})`} />
          <motion.rect
            className="claude-cursor"
            x={CURSOR.x}
            y={CURSOR.y}
            width={CURSOR.width}
            height={CURSOR.height}
            fill={color}
          />
        </motion.g>
      </motion.svg>
    );
  },
);

ClaudeCodeIcon.displayName = "ClaudeCodeIcon";
export default ClaudeCodeIcon;
