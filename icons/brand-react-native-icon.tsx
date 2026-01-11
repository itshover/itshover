import { forwardRef, useImperativeHandle, useRef } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";

const BrandReactNativeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();
    const animationControls = useRef<Array<ReturnType<typeof animate>>>([]);

    const start = async () => {
      // Clear any existing animations
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      // Smooth pop entrance
      await animate(
        ".orbit-system",
        { scale: [0.95, 1.02, 1] },
        { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
      );

      // Center dot gentle pulse
      animationControls.current.push(
        animate(
          ".center-dot",
          {
            scale: [1, 1.3, 1],
            opacity: [1, 0.8, 1],
          },
          {
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          },
        ),
      );

      // Smooth continuous rotation
      animationControls.current.push(
        animate(
          ".orbit-system",
          { rotate: 360 },
          {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          },
        ),
      );

      // Subtle wave through rings
      const rings = [".ring-1", ".ring-2", ".ring-3"];
      rings.forEach((ring, i) => {
        animationControls.current.push(
          animate(
            ring,
            {
              opacity: [1, 0.7, 1],
            },
            {
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 1,
            },
          ),
        );
      });
    };

    const stop = () => {
      // Cancel all infinite animations
      animationControls.current.forEach((control) => control.stop());
      animationControls.current = [];

      animate(
        ".orbit-system",
        { rotate: 0, scale: 1 },
        { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
      );

      animate(".ring-1, .ring-2, .ring-3", { opacity: 1 }, { duration: 0.3 });

      animate(".center-dot", { scale: 1, opacity: 1 }, { duration: 0.3 });
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
        className={`cursor-pointer select-none ${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.g
          className="orbit-system"
          style={{ originX: "50%", originY: "50%" }}
        >
          <motion.path
            className="ring-1"
            d="M6.357 9c-2.637 .68 -4.357 1.845 -4.357 3.175c0 2.107 4.405 3.825 9.85 3.825c.74 0 1.26 -.039 1.95 -.097"
          />
          <motion.path
            className="ring-1"
            d="M9.837 15.9c-.413 -.596 -.806 -1.133 -1.18 -1.8c-2.751 -4.9 -3.488 -9.77 -1.63 -10.873c1.15 -.697 3.047 .253 4.974 2.254"
          />
          <motion.path
            className="ring-2"
            d="M6.429 15.387c-.702 2.688 -.56 4.716 .56 5.395c1.783 1.08 5.387 -1.958 8.043 -6.804c.36 -.67 .683 -1.329 .968 -1.978"
          />
          <motion.path
            className="ring-2"
            d="M12 18.52c1.928 2 3.817 2.95 4.978 2.253c1.85 -1.102 1.121 -5.972 -1.633 -10.873c-.384 -.677 -.777 -1.204 -1.18 -1.8"
          />
          <motion.path
            className="ring-3"
            d="M17.66 15c2.612 -.687 4.34 -1.85 4.34 -3.176c0 -2.11 -4.408 -3.824 -9.845 -3.824c-.747 0 -1.266 .029 -1.955 .087"
          />
          <motion.path
            className="ring-3"
            d="M8 12c.285 -.66 .607 -1.308 .968 -1.978c2.647 -4.844 6.253 -7.89 8.046 -6.801c1.11 .679 1.262 2.706 .56 5.393"
          />
        </motion.g>
        <motion.path
          className="center-dot"
          d="M12.26 12.015h-.01c-.01 .13 -.12 .24 -.26 .24a.263 .263 0 0 1 -.25 -.26c0 -.14 .11 -.25 .24 -.25h-.01c.13 -.01 .25 .11 .25 .24"
          style={{ originX: "50%", originY: "50%" }}
        />
      </motion.svg>
    );
  },
);

BrandReactNativeIcon.displayName = "BrandReactNativeIcon";

export default BrandReactNativeIcon;
