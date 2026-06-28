import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { scaledStrokeWidth } from "./types";
import { motion, useAnimate } from "motion/react";

const PhoneVolume = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".phone-wave-inner",
        {
          scale: [1, 1.15, 1],
          opacity: [0.4, 1, 0.4],
        },
        {
          duration: 0.4,
          ease: "easeInOut",
        },
      );
      await animate(
        ".phone-wave-outer",
        {
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.8, 0.2],
        },
        {
          duration: 0.45,
          ease: "easeInOut",
          delay: 0.1,
        },
      );

      animate(
        ".phone-wave",
        {
          opacity: 1,
          scale: 1,
        },
        {
          duration: 0.3,
          ease: "easeInOut",
        },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".phone-wave-inner, .phone-wave-outer, .phone-wave",
        { opacity: 1, scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.div
        ref={scope}
        className={`inline-flex cursor-pointer ${className}`}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          stroke={color}
          strokeWidth={scaledStrokeWidth(strokeWidth, 32)}
          strokeLinecap="square"
          strokeMiterlimit="10"
        >
          <motion.path
            className="phone-body"
            d="m21.3832,18.2745l-3.1744,3.9688c-3.4906-2.0516-6.3996-4.9606-8.4513-8.4513l3.9702-3.1756L9.9013,1.9994l-6.4617,1.6761c-.9444.2466-1.555,1.1606-1.4212,2.1274,1.7626,12.5517,11.6278,22.4169,24.1795,24.1795.9665.1332,1.8799-.4773,2.1264-1.4212l1.6758-6.4603-8.6168-3.8264Z"
          />

          <motion.path
            className="phone-wave-inner phone-wave"
            style={{ transformOrigin: "21.5px 10.5px" }}
            d="m19,8c2.7614,0,5,2.2386,5,5"
            initial={{ opacity: 1 }}
          />

          <motion.path
            className="phone-wave-outer phone-wave"
            style={{ transformOrigin: "24px 8px" }}
            d="m19,3c5.5228,0,10,4.4772,10,10"
            initial={{ opacity: 1 }}
          />
        </svg>
      </motion.div>
    );
  },
);

PhoneVolume.displayName = "PhoneVolume";
export default PhoneVolume;
