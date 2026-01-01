"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const SunIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        animate(
            ".sun-core",
            { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] },
            { duration: 0.4, ease: "easeOut" }
        );
        await animate(
            ".sun-rays",
            { rotate: 45, scale: [1, 1.1, 1] },
            { duration: 0.5, ease: "easeOut" }
        );
    };

    const endAnimate = () => {
        animate(".sun-rays", { rotate: 0 }, { duration: 0.3 });
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
            <motion.circle
                className="sun-core"
                cx="12"
                cy="12"
                r="4"
                style={{ transformOrigin: "12px 12px" }}
            />
            <motion.g className="sun-rays" style={{ transformOrigin: "12px 12px" }}>
                <path d="M12 3l0 2" />
                <path d="M12 19l0 2" />
                <path d="M3 12l2 0" />
                <path d="M19 12l2 0" />
                <path d="M5.6 5.6l1.4 1.4" />
                <path d="M17 17l1.4 1.4" />
                <path d="M17 7l1.4 -1.4" />
                <path d="M5.6 18.4l1.4 -1.4" />
            </motion.g>
        </motion.svg>
    );
};

export default SunIcon;
