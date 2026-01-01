"use client";

import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const CalendarIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const startAnimate = async () => {
        animate(
            ".calendar-ring-left",
            { y: [0, -2, 0] },
            { duration: 0.3, ease: "easeOut" }
        );
        await animate(
            ".calendar-ring-right",
            { y: [0, -2, 0] },
            { duration: 0.3, ease: "easeOut", delay: 0.1 }
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
            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
            <motion.path className="calendar-ring-left" d="M16 3l0 4" />
            <motion.path className="calendar-ring-right" d="M8 3l0 4" />
            <path d="M4 11l16 0" />
            <path d="M11 15l1 0" />
            <path d="M12 15l0 3" />
        </motion.svg>
    );
};

export default CalendarIcon;
