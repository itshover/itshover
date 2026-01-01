"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CloudDownloadIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        await animate(
            ".arrow",
            { y: [0, 3, 0] },
            { duration: 0.5, ease: "easeInOut" }
        );
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
            <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />
            <motion.g className="arrow">
                <path d="M12 13l0 9" />
                <path d="M9 19l3 3l3 -3" />
            </motion.g>
        </motion.svg>
    );
};

export default CloudDownloadIcon;
