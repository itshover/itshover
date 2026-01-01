"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const ShareIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        animate(
            ".share-top",
            { scale: [1, 1.3, 1] },
            { duration: 0.3, ease: "easeOut" }
        );
        animate(
            ".share-left",
            { scale: [1, 1.2, 1] },
            { duration: 0.3, ease: "easeOut", delay: 0.1 }
        );
        await animate(
            ".share-right",
            { scale: [1, 1.2, 1] },
            { duration: 0.3, ease: "easeOut", delay: 0.2 }
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
            <motion.circle
                className="share-top"
                cx="18"
                cy="5"
                r="3"
                style={{ transformOrigin: "18px 5px" }}
            />
            <motion.circle
                className="share-left"
                cx="6"
                cy="12"
                r="3"
                style={{ transformOrigin: "6px 12px" }}
            />
            <motion.circle
                className="share-right"
                cx="18"
                cy="19"
                r="3"
                style={{ transformOrigin: "18px 19px" }}
            />
            <path d="M8.7 10.7l6.6 -3.4" />
            <path d="M8.7 13.3l6.6 3.4" />
        </motion.svg>
    );
};

export default ShareIcon;
