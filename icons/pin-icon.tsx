"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PinIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        await animate(
            ".pin-body",
            { y: [0, -3, 1, 0], rotate: [0, -5, 5, 0] },
            { duration: 0.5, ease: "easeOut" }
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
            <motion.g className="pin-body" style={{ transformOrigin: "12px 10px" }}>
                <path d="M9 4v6l-2 4v2h10v-2l-2 -4v-6" />
                <path d="M12 16l0 5" />
                <path d="M8 4l8 0" />
            </motion.g>
        </motion.svg>
    );
};

export default PinIcon;
