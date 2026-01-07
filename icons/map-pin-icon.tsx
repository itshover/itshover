import { forwardRef, useImperativeHandle } from "react";
import { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const MapPinIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".pin",
        { y: -4 },
        { duration: 0.3, ease: "easeInOut", repeat: 1, repeatType: "reverse" },
      );
      animate(
        ".pin-circle",
        { fill: color },
        { duration: 0.3, ease: "easeInOut" },
      );
    };

    const stop = () => {
      animate(".pin", { y: 0 }, { duration: 0.2 });
      animate(".pin-circle", { fill: "none" }, { duration: 0.2 });
    };

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
        className={`inline-flex cursor-pointer items-center justify-center ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.g className="pin">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <motion.circle className="pin-circle" cx="12" cy="10" r="3" />
        </motion.g>
      </motion.svg>
    );
  },
);

MapPinIcon.displayName = "MapPinIcon";
export default MapPinIcon;
