"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const Layers3dIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        animate(".layer-top", { y: -3 }, { duration: 0.2, ease: "easeOut" });
        animate(".layer-bottom", { y: 3 }, { duration: 0.2, ease: "easeOut" });

        await new Promise(resolve => setTimeout(resolve, 250));

        animate(".layer-top", { y: 0 }, { duration: 0.2, ease: "easeInOut" });
        animate(".layer-bottom", { y: 0 }, { duration: 0.2, ease: "easeInOut" });
    };

    return (
        <motion.svg
            ref={scope}
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
            onHoverStart={startAnimate}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
                className="layer-top"
                d="M12 4l-8 4l8 4l8 -4l-8 -4"
            />
            <path d="M4 12l8 4l8 -4" />
            <motion.path
                className="layer-bottom"
                d="M4 16l8 4l8 -4"
            />
        </motion.svg>
    );
};

export default Layers3dIcon;
