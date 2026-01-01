"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CommandIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        await animate(
            ".command-symbol",
            { rotate: [0, 90], scale: [1, 1.1, 1] },
            { duration: 0.4, ease: "easeInOut" }
        );
    };

    const endAnimate = () => {
        animate(
            ".command-symbol",
            { rotate: 0, scale: 1 },
            { duration: 0.3, ease: "easeOut" }
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
            onHoverEnd={endAnimate}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
                className="command-symbol"
                style={{ transformOrigin: "12px 12px" }}
                d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10"
            />
        </motion.svg>
    );
};

export default CommandIcon;
