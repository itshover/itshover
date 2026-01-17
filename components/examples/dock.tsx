"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import TwitterXIcon from "../ui/twitter-x-icon";
import GithubIcon from "../ui/github-icon";
import WhatsappIcon from "../ui/whatsapp-icon";
import FacebookIcon from "../ui/facebook-icon";
import LinkedinIcon from "../ui/linkedin-icon";
import InstagramIcon from "../ui/instagram-icon";
import { AnimatedIconProps, AnimatedIconHandle } from "../ui/types";

const dockItems = [
  { icon: TwitterXIcon, label: "Twitter/X", href: "#" },
  { icon: WhatsappIcon, label: "Whatsapp", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

interface DockItemProps {
  icon: React.ComponentType<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
  label: string;
  href: string;
  isAnimated?: boolean;
}

const DockItem = ({
  icon: Icon,
  label,
  href,
  isAnimated = true,
}: DockItemProps) => {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isAnimated) {
      iconRef.current?.startAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isAnimated) {
      iconRef.current?.stopAnimation();
    }
  };

  React.useEffect(() => {
    if (!isAnimated) {
      iconRef.current?.stopAnimation();
    }
  }, [isAnimated]);

  return (
    <motion.a
      layout
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.2, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="sr-only">{label}</span>
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
        <Icon
          ref={iconRef}
          size={28}
          className="text-neutral-700 dark:text-neutral-200"
          disableHover={!isAnimated}
        />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -50 : -40,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute rounded-lg bg-neutral-900/90 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-xl dark:bg-neutral-100/90 dark:text-neutral-900"
      >
        {label}
      </motion.div>
    </motion.a>
  );
};

const Dock = ({ isAnimated = true }: { isAnimated?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex h-[400px] w-full items-center justify-center p-8">
      <motion.div
        layout
        className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          paddingLeft: isHovered ? 50 : 12,
          paddingRight: isHovered ? 50 : 12,
          gap: isHovered ? 24 : 8,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
      >
        {dockItems.map((item) => (
          <DockItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isAnimated={isAnimated}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Dock;
