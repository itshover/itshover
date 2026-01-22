"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { ICON_LIST } from "@/icons/index";
import IconCard from "./ui/icon-card";
import Fuse from "fuse.js";
import SearchInput, { SearchInputRef } from "./ui/search-input";
import { motion, AnimatePresence } from "motion/react";
import { isMac } from "@/lib/utils";
import RequestIconModal from "./request-icon-modal";

const IconList = () => {
  const searchInputRef = useRef<SearchInputRef>(null);
  const iconCount = useMemo(() => ICON_LIST.length, []);
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(ICON_LIST, {
        keys: [
          { name: "name", weight: 3 },
          { name: "keywords", weight: 2 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        findAllMatches: true,
        isCaseSensitive: false,
        minMatchCharLength: 1,
      }),
    [],
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredIcons = useMemo(() => {
    if (searchQuery.trim() === "") {
      return ICON_LIST;
    }
    const result = fuse.search(searchQuery);
    return result.map((r) => r.item);
  }, [searchQuery, fuse]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="mb-4 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mx-4 mb-10 flex gap-2 px-4 sm:ml-20 sm:px-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SearchInput
          ref={searchInputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={`Search ${iconCount} Icons ... (${isMac() ? "⌘" : "Ctrl"} + F)`}
          className="w-full md:w-1/2"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={searchQuery || "all"}
          className="max-w-8xl flex flex-wrap items-center justify-center gap-4 px-4 sm:mr-2 sm:ml-20 sm:justify-start sm:px-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredIcons &&
            filteredIcons.map((icon) => (
              <motion.div key={icon.name} variants={itemVariants} layout>
                <IconCard name={icon.name} icon={icon.icon} />
              </motion.div>
            ))}

          {!filteredIcons?.length && (
            <motion.div
              className="flex h-40 w-full items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-muted-foreground text-sm">
                No icons found, Try other keyword or{" "}
                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="text-primary hover:underline"
                >
                  Request for new icons
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      <RequestIconModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </motion.div>
  );
};

export default IconList;
