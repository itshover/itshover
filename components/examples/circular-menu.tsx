"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import HomeIcon from "../ui/home-icon";
import MagnifierIcon from "../ui/magnifier-icon";
import FilledBellIcon from "../ui/filled-bell-icon";
import MailFilledIcon from "../ui/mail-filled-icon";
import UserCheckIcon from "../ui/user-check-icon";
import { AnimatedIconHandle } from "../ui/types";

const menuItems = [
  { icon: HomeIcon, label: "Home" },
  { icon: MagnifierIcon, label: "Search" },
  { icon: FilledBellIcon, label: "Notifications" },
  { icon: MailFilledIcon, label: "Messages" },
  { icon: UserCheckIcon, label: "Profile" },
];

interface CircularMenuProps {
  className?: string;
  isAnimated?: boolean;
}

const CircularMenu = ({ className, isAnimated = true }: CircularMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div
      className={cn(
        "flex min-h-[20rem] w-full items-center justify-center p-4",
        className,
      )}
    >
      <div className="relative flex h-64 w-64 items-center justify-center">
        <AnimatePresence>
          {isOpen && (
            <>
              {menuItems.map((item, index) => {
                const angle = (index / (menuItems.length - 1)) * Math.PI;
                const fullAngle = (index / menuItems.length) * 2 * Math.PI;
                const radius = 80;
                const x = Math.cos(fullAngle - Math.PI / 2) * radius;
                const y = Math.sin(fullAngle - Math.PI / 2) * radius;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      x,
                      y,
                      scale: 1,
                    }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                      delay: index * 0.05,
                    }}
                    className="absolute z-10"
                  >
                    <MenuItem {...item} isAnimated={isAnimated} />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="relative z-20 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xl dark:bg-white dark:text-neutral-900"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <PlusIcon className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const MenuItem = ({
  icon: Icon,
  label,
  isAnimated,
}: {
  icon: any;
  label: string;
  isAnimated: boolean;
}) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  const handleMouseEnter = () => {
    if (isAnimated) {
      iconRef.current?.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (isAnimated) {
      iconRef.current?.stopAnimation();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group box-shadow: 0 4px 12px 40 relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md dark:bg-neutral-800"
    >
      <Icon ref={iconRef} className="h-5 w-5" size={20} disableHover={true} />

      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-neutral-900 px-2 py-1 text-[10px] whitespace-nowrap text-white transition-transform group-hover:scale-100 dark:bg-white dark:text-neutral-900">
        {label}
      </span>
    </motion.button>
  );
};

export default CircularMenu;
