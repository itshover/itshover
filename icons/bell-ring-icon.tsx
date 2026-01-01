"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BellRingIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        await animate(
            ".bell-body",
            { rotate: [0, 12, -10, 8, -5, 3, 0] },
            { duration: 0.6, ease: "easeOut" }
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
            <motion.g className="bell-body" style={{ transformOrigin: "12px 3px" }}>
                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
                <path d="M3 6.727a11.05 11.05 0 0 1 2.794 -3.727" />
            </motion.g>
        </motion.svg>
    );
};

export default BellRingIcon;
