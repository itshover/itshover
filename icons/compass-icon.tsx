"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CompassIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        await animate(
            ".needle",
            { rotate: [0, 45, -30, 20, -10, 0] },
            { duration: 0.7, ease: "easeOut" }
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
            <circle cx="12" cy="12" r="9" />
            <motion.path
                className="needle"
                style={{ transformOrigin: "12px 12px" }}
                d="M8 16l2 -6l6 -2l-2 6l-6 2"
            />
            <path d="M12 3l0 2" />
            <path d="M12 19l0 2" />
            <path d="M3 12l2 0" />
            <path d="M19 12l2 0" />
        </motion.svg>
    );
};

export default CompassIcon;
