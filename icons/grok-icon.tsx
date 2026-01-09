import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const GrokIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // Compress the whole icon into the core
      animate(
        scope.current,
        { scale: 0.45 },
        { type: "spring", stiffness: 300, damping: 25 },
      );

      // Fade out Grok shape
      animate(
        ".grok-shape",
        { opacity: 0 },
        { duration: 0.25, ease: "easeOut" },
      );

      // Fade in core
      animate(
        ".grok-core",
        { opacity: 1 },
        { duration: 0.25, ease: "easeOut" },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      // Spring back to full size
      animate(
        scope.current,
        { scale: 1 },
        { type: "spring", stiffness: 260, damping: 18 },
      );

      animate(".grok-shape", { opacity: 1 }, { duration: 0.2 });
      animate(".grok-core", { opacity: 0 }, { duration: 0.2 });
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
        fill={color}
        fillRule="evenodd"
        viewBox="0 0 24 24"
        height={size}
        width={size}
        style={{ flex: "none", lineHeight: 1 }}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <title>Grok</title>

        {/* Collapse core */}
        <motion.circle
          className="grok-core"
          cx="12"
          cy="12"
          r="8"
          opacity="0"
        />

        {/* Original Grok geometry */}
        <motion.path
          className="grok-shape"
          d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"
        />
      </motion.svg>
    );
  },
);

GrokIcon.displayName = "GrokIcon";
export default GrokIcon;
