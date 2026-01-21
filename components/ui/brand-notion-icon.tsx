import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BrandNotionIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", className = "", disableHover = false },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(() => {
      // Page flip: shell tilts like turning a page
      animate(
        ".notion-shell",
        { rotateY: [0, -15, 0], skewY: [0, 2, 0] },
        { duration: 0.5, ease: "easeInOut" },
      );
      // Letter slightly pops forward
      animate(
        ".notion-letter",
        { scale: [1, 1.03, 1], x: [0, 1, 0] },
        { duration: 0.5, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".notion-shell", { rotateY: 0, skewY: 0 }, { duration: 0.2 });
      animate(".notion-letter", { scale: 1, x: 0 }, { duration: 0.2 });
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
        onHoverStart={disableHover ? undefined : start}
        onHoverEnd={disableHover ? undefined : stop}
        fill={color}
        fillRule="evenodd"
        height={size}
        width={size}
        style={{ flex: "none", lineHeight: 1 }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`notion-icon cursor-pointer ${className}`}
      >
        <title>Notion</title>

        {/* Outer paper shell */}
        <motion.path
          className="notion-shell"
          d="M15.257.055l-13.31.98C.874 1.128.5 1.83.5 2.667v14.559c0 .654.233 1.213.794 1.96l3.129 4.06c.513.653.98.794 1.962.745l15.457-.932c1.307-.093 1.681-.7 1.681-1.727V4.954c0-.53-.21-.684-.829-1.135l-.106-.078L18.34.755c-1.027-.746-1.45-.84-3.083-.7zM6.736 4.685c-1.263.086-1.549.105-2.266-.477L2.647 2.76c-.186-.187-.092-.42.375-.466l12.796-.933c1.074-.094 1.634.28 2.054.606l2.195 1.587c.093.047.326.326.047.326l-13.216.794-.162.01zM5.263 21.193V7.287c0-.606.187-.886.748-.933l15.176-.886c.515-.047.748.28.748.886v13.81c0 .609-.093 1.122-.934 1.168l-14.523.84c-.842.047-1.215-.232-1.215-.98z"
        />

        {/* Inner "N" */}
        <motion.path
          className="notion-letter"
          d="M19.601 8.033c.093.422 0 .842-.422.89l-.699.139v10.264c-.608.327-1.168.513-1.635.513-.747 0-.934-.232-1.495-.932l-4.576-7.185v6.952l1.448.327s0 .84-1.169.84l-3.221.186c-.094-.187 0-.654.327-.747l.84-.232V9.853L7.832 9.76c-.093-.42.14-1.026.794-1.073l3.456-.232 4.763 7.279v-6.44l-1.214-.14c-.094-.513.28-.887.747-.933l3.223-.187z"
        />
      </motion.svg>
    );
  },
);

BrandNotionIcon.displayName = "BrandNotionIcon";
export default BrandNotionIcon;
