import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandGeminiIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      animate(
        scope.current,
        { scale: 0.9, rotate: [0, 180] },
        {
          duration: 0.8,
          ease: "easeInOut",
        },
      );
    }, [animate, scope]);

    const stop = useCallback(() => {
      animate(
        scope.current,
        { scale: 1, rotate: 0 },
        {
          duration: 0.8,
          ease: "easeInOut",
        },
      );
    }, [animate, scope]);

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
        fill={color}
        viewBox="0 0 24 24"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className={`gemini-icon cursor-pointer ${className}`}
        role="img"
        aria-label="Gemini"
        style={{
          flex: "none",
          lineHeight: 1,
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      >
        <title>Gemini</title>

        {/* Gemini star glyph */}
        <motion.path
          className="gemini-shape"
          d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
        />
      </motion.svg>
    );
  },
);

BrandGeminiIcon.displayName = "BrandGeminiIcon";
export default BrandGeminiIcon;
