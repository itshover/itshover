"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ShieldLockIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        animate(
            ".shield-body",
            { scale: [1, 1.05, 1] },
            { duration: 0.4, ease: "easeOut" }
        );
        await animate(
            ".lock-part",
            { y: [0, -1, 1, 0] },
            { duration: 0.35, ease: "easeInOut" }
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
                className="shield-body"
                style={{ transformOrigin: "12px 12px" }}
                d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"
            />
            <motion.g className="lock-part">
                <path d="M10 10a2 2 0 1 1 4 0v2h-4z" />
                <path d="M9 12h6a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
            </motion.g>
        </motion.svg>
    );
};

export default ShieldLockIcon;
