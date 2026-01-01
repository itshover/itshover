"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CrownIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        await animate(
            ".crown-body",
            { y: [0, -4, 0], scale: [1, 1.08, 1] },
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
            <motion.g className="crown-body" style={{ transformOrigin: "12px 12px" }}>
                <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
            </motion.g>
        </motion.svg>
    );
};

export default CrownIcon;
