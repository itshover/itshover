"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import MagnifierIcon from "../ui/magnifier-icon";
import UserCheckIcon from "../ui/user-check-icon";
import MailFilledIcon from "../ui/mail-filled-icon";
import BookmarkIcon from "../ui/bookmark-icon";
import DotsHorizontalIcon from "../ui/dots-horizontal-icon";
import { AnimatedIconHandle } from "../ui/types";

const actions = [
  { icon: MagnifierIcon, label: "Search" },
  { icon: UserCheckIcon, label: "Profile" },
  { icon: MailFilledIcon, label: "Message" },
  { icon: BookmarkIcon, label: "Save" },
];

interface ExpandableActionsProps {
  className?: string;
  isAnimated?: boolean;
}

const ExpandableActions = ({
  className,
  isAnimated = true,
}: ExpandableActionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cn(
        "flex min-h-[10rem] w-full items-center justify-center p-4",
        className,
      )}
    >
      <div ref={containerRef} className="relative flex items-center">
        <motion.div
          animate={{
            width: isExpanded ? "auto" : 48,
          }}
          transition={{
            type: "spring",
            bounce: 0.1,
            duration: 0.5,
          }}
          className="flex h-12 overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="grid h-12 w-12 shrink-0 place-items-center text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <DotsHorizontalIcon className="h-6 w-6" />
            </motion.div>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-1 pr-2">
            <AnimatePresence mode="popLayout">
              {isExpanded && (
                <>
                  {actions.map((action, index) => (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ActionItem
                        {...action}
                        isAnimated={isAnimated}
                        onClick={() => {
                          console.log(`Clicked ${action.label}`);
                          setIsExpanded(false);
                        }}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ActionItem = ({
  icon: Icon,
  label,
  isAnimated,
  onClick,
}: {
  icon: any;
  label: string;
  isAnimated: boolean;
  onClick: () => void;
}) => {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => isAnimated && iconRef.current?.startAnimation()}
      onMouseLeave={() => isAnimated && iconRef.current?.stopAnimation()}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
      title={label}
    >
      <Icon
        ref={iconRef}
        className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
        disableHover={true}
      />
    </button>
  );
};

export default ExpandableActions;
