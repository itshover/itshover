import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const AnthropicIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const aRef = useRef<SVGGElement | null>(null);
    const iRef = useRef<SVGGElement | null>(null);

    const getMergeX = () => {
      if (!aRef.current || !iRef.current) return 0;

      const aBox = aRef.current.getBBox();
      const iBox = iRef.current.getBBox();
      const gap = iBox.x - (aBox.x + aBox.width);
      return gap;
    };

    const start = useCallback(() => {
      const x = getMergeX();

      animate(".anthropic-i", { x: x }, { duration: 0.28, ease: "easeInOut" });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".anthropic-i", { x: 0 }, { duration: 0.25, ease: "easeInOut" });
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
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <title>Anthropic</title>

        {/* A */}
        <motion.g
          ref={aRef}
          className="anthropic-a"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <path d="M6.57 3.52h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.673 20H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
        </motion.g>

        {/* i */}
        <motion.g
          ref={iRef}
          className="anthropic-i"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48z" />
        </motion.g>
      </motion.svg>
    );
  },
);

AnthropicIcon.displayName = "AnthropicIcon";
export default AnthropicIcon;
