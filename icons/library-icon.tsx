import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const LibraryIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // The Book Pick Cycle
      // Book 2 (Selected): Lifts and tilts
      animate(
        ".book-2",
        { y: -3, rotate: -8 },
        { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }, // BackOut feel
      );

      // Book 3 (Neighbor): Leans Left
      animate(".book-3", { rotate: -12 }, { duration: 0.4, ease: "easeOut" });

      // Book 4 (Outer): Subtle Lean Left
      animate(".book-4", { rotate: -5 }, { duration: 0.4, ease: "easeOut" });

      // Book 1 (Tilted Book): Leans further Right
      animate(".book-1", { rotate: 12 }, { duration: 0.4, ease: "easeOut" });
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".book-1, .book-2, .book-3, .book-4",
        { rotate: 0, y: 0 },
        { duration: 0.3, ease: "easeInOut" },
      );
    }, [animate]);

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
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        {/* Book 1 (The tilted book) */}
        <motion.path
          className="book-1"
          d="m16 6 4 14"
          style={{ transformOrigin: "18px 20px" }}
        />
        {/* Book 2 (The picked book) */}
        <motion.path
          className="book-2"
          d="M12 6v14"
          style={{ transformOrigin: "12px 20px" }}
        />
        {/* Book 3 */}
        <motion.path
          className="book-3"
          d="M8 8v12"
          style={{ transformOrigin: "8px 20px" }}
        />
        {/* Book 4 */}
        <motion.path
          className="book-4"
          d="M4 4v16"
          style={{ transformOrigin: "4px 20px" }}
        />
      </motion.svg>
    );
  },
);

LibraryIcon.displayName = "LibraryIcon";
export default LibraryIcon;
