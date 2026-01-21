import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandAiStudioIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", className = "" }, ref) => {
    const [scope, animate] = useAnimate();

    const frameRef = useRef<SVGGElement | null>(null);
    const sparkRef = useRef<SVGGElement | null>(null);

    const getSparkCenterOffset = () => {
      if (!frameRef.current || !sparkRef.current) return { x: 0, y: 0 };

      const frame = frameRef.current.getBBox();
      const spark = sparkRef.current.getBBox();

      const frameCenterX = frame.x + frame.width / 2;
      const frameCenterY = frame.y + frame.height / 2;

      const sparkCenterX = spark.x + spark.width / 2;
      const sparkCenterY = spark.y + spark.height / 2;

      return {
        x: frameCenterX - sparkCenterX,
        y: frameCenterY - sparkCenterY,
      };
    };

    const start = useCallback(() => {
      const { x, y } = getSparkCenterOffset();

      // Move Gemini into the IDE
      animate(
        ".google-spark",
        { x, y, scale: 0.9 },
        { duration: 0.35, ease: "easeInOut" },
      );

      // Pull the frame inward slightly so it "closes"
      animate(
        ".google-frame",
        { scale: 0.94 },
        { duration: 0.35, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".google-spark",
        { x: 0, y: 0, scale: 1 },
        { duration: 0.3, ease: "easeInOut" },
      );

      animate(
        ".google-frame",
        { scale: 1 },
        { duration: 0.3, ease: "easeInOut" },
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
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <title>Google AI Studio</title>

        {/* Frame */}
        <motion.g
          ref={frameRef}
          className="google-frame"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <path
            fillRule="evenodd"
            d="M9.921 4.196H6.328A2.705 2.705 0 003.623 6.9v11.362a2.705 2.705 0 002.705 2.705h11.363a2.705 2.705 0 002.705-2.705v-4.756l1.623-1.113v5.87a4.329 4.329 0 01-4.328 4.328H6.328A4.329 4.329 0 012 18.263V6.901a4.328 4.328 0 014.328-4.329h4.545l-.952 1.624z"
          />
        </motion.g>

        {/* Gemini sparkle */}
        <motion.g
          ref={sparkRef}
          className="google-spark"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <path
            fillRule="evenodd"
            d="M17.82 0c.145 0 .268.104.299.246a7 7 0 001.9 3.484 7 7 0 003.485 1.901c.142.031.246.154.246.3a.308.308 0 01-.246.298A7 7 0 0020.02 8.13a7 7 0 00-1.912 3.535.297.297 0 01-.288.238.297.297 0 01-.288-.238A7 7 0 0015.62 8.13a7 7 0 00-3.535-1.912.297.297 0 01-.238-.288c0-.14.1-.26.238-.288A7 7 0 0015.62 3.73 7.001 7.001 0 0017.521.246.308.308 0 0117.82 0z"
          />
        </motion.g>
      </motion.svg>
    );
  },
);

BrandAiStudioIcon.displayName = "BrandAiStudioIcon";
export default BrandAiStudioIcon;
