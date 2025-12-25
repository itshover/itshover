"use client";

import Link from "next/link";
import { motion, useAnimate } from "motion/react";
import { Github } from "lucide-react";
import { useState } from "react";

const GithubBadge = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative mx-auto w-fit scale-75 p-2 md:scale-100">
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-accent flex cursor-default items-center rounded-full p-1 font-serif shadow-[inset_0px_1px_2px_rgba(0,0,0,0.2)]"
      >
        <span className="text-foreground absolute px-2 text-sm">
          We're Proudly
        </span>
        <div
          className={`bg-background relative z-10 flex items-center justify-center gap-2 rounded-full p-1 px-2 shadow-[0px_1px_2px_rgba(0,0,0,0.2)] ${isHovered ? "ml-[110px]" : "ml-0"} transition-all duration-300`}
        >
          <Github className="text-2xl" />
          <span className="text-foreground font-inter text-xs font-semibold uppercase">
            Closed Source
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default GithubBadge;
