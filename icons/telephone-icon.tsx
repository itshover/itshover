import { AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const StadiumIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    className = "",
}: AnimatedIconProps) => {
    const [scope, animate] = useAnimate();

    const hoverAnimation = async () => {
        // Roof lifts
        animate(
            ".stadium-roof",
            { y: -3 },
            { duration: 0.25, ease: "easeOut" }
        );

        // Pillars extend
        animate(
            ".stadium-pillar-left",
            { y: -2 },
            { duration: 0.25, ease: "easeOut" }
        );

        animate(
            ".stadium-pillar-right",
            { y: -2 },
            { duration: 0.25, ease: "easeOut" }
        );

        // Center circle pulse
        animate(
            ".stadium-center",
            { scale: [1, 1.15, 1] },
            { duration: 0.3, ease: "easeInOut" }
        );

        // Bowl settles
        animate(
            ".stadium-bowl",
            { scaleY: [1, 0.97, 1] },
            { duration: 0.3, ease: "easeInOut" }
        );
    };

    const resetAnimation = async () => {
        await animate(
            [
                ".stadium-roof",
                ".stadium-pillar-left",
                ".stadium-pillar-right",
                ".stadium-center",
                ".stadium-bowl",
            ],
            {
                x: 0,
                y: 0,
                scale: 1,
                scaleY: 1,
            },
            {
                duration: 0.25,
                ease: "easeInOut",
            }
        );
    };

    return (
        <motion.div
            ref={scope}
            onHoverStart={hoverAnimation}
            onHoverEnd={resetAnimation}
            className={`inline-flex cursor-pointer ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 48 48"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"
                strokeLinecap="square"
            >
                {/* Stadium bowl */}
                <motion.path
                    className="stadium-bowl"
                    style={{ transformOrigin: "24px 35px" }}
                    d="M38 43H10C7.23858 43 5 40.7614 5 38V34.8496C5 33.6561 5.42696 32.5019 6.20372 31.5957L17 19H31L41.7963 31.5957C42.573 32.5019 43 33.6561 43 34.8496V38C43 40.7614 40.7614 43 38 43Z"
                />

                {/* Center circle */}
                <motion.path
                    className="stadium-center"
                    style={{ transformOrigin: "24px 32px" }}
                    d="M24 37C26.7614 37 29 34.7614 29 32C29 29.2386 26.7614 27 24 27C21.2386 27 19 29.2386 19 32C19 34.7614 21.2386 37 24 37Z"
                />

                {/* Stadium roof */}
                <motion.path
                    className="stadium-roof"
                    d="M11 18H7.5C6.11929 18 5 16.8807 5 15.5V12.263C5 10.4575 6.13996 8.83551 7.84843 8.19566C19.2334 3.93478 28.7666 3.93478 40.1516 8.19566C41.86 8.83551 43 10.4575 43 12.263V15.5C43 16.8807 41.8807 18 40.5 18H37"
                />

                {/* Left pillar */}
                <motion.path
                    className="stadium-pillar stadium-pillar-left"
                    d="M17 19V14"
                />

                {/* Right pillar */}
                <motion.path
                    className="stadium-pillar stadium-pillar-right"
                    d="M31 19V14"
                />
            </svg>
        </motion.div>
    );
};

export default StadiumIcon;
