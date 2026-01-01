"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const WandIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        animate(
            ".wand-body",
            { rotate: [0, -8, 8, -4, 0] },
            { duration: 0.5, ease: "easeOut" }
        );
        animate(
            ".sparkle",
            { scale: [1, 1.3, 0.9, 1.2, 1], opacity: [1, 0.6, 1] },
            { duration: 0.4, ease: "easeInOut" }
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
            <motion.g className="wand-body" style={{ transformOrigin: "18px 18px" }}>
                <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
                <path d="M15 6l3 3" />
            </motion.g>
            <motion.path
                className="sparkle"
                style={{ transformOrigin: "9px 5px" }}
                d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"
            />
        </motion.svg>
    );
};

export default WandIcon;
