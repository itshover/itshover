"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const BoltIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        await animate(
            ".bolt",
            {
                opacity: [1, 0.5, 1, 0.7, 1],
                scale: [1, 1.15, 1]
            },
            { duration: 0.35, ease: "easeOut" }
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
            <motion.path
                className="bolt"
                style={{ transformOrigin: "12px 12px" }}
                d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
                fill={color}
            />
        </motion.svg>
    );
};

export default BoltIcon;
