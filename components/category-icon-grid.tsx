"use client";

import { ICON_LIST } from "@/icons/index";
import IconCard from "@/components/ui/icon-card";
import { motion } from "motion/react";

type CategoryIconGridProps = {
  slugs: string[];
};

export default function CategoryIconGrid({ slugs }: CategoryIconGridProps) {
  const slugSet = new Set(slugs);
  const icons = ICON_LIST.filter((icon) => slugSet.has(icon.name));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      className="max-w-8xl flex flex-wrap items-center justify-center gap-4 px-4 sm:mr-2 sm:ml-20 sm:justify-start sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {icons.map((icon) => (
        <motion.div key={icon.name} variants={itemVariants} layout>
          <IconCard name={icon.name} icon={icon.icon} />
        </motion.div>
      ))}
    </motion.div>
  );
}
