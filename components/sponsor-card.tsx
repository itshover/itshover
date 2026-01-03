"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

import GithubIcon from "@/icons/github-icon";
import TwitterXIcon from "@/icons/twitter-x-icon";
import WorldIcon from "@/icons/world-icon";
import { ISponsor } from "@/models/sponsor";

export const SponsorCard = ({ sponsor }: { sponsor: ISponsor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card hover:border-primary/50 rounded-xl border p-4 shadow-sm transition-colors"
    >
      {/* Sponsored via (BEGINNING) */}
      <p className="text-muted-foreground mb-2 text-sm">
        Sponsored via {sponsor.via}
      </p>

      {/* Name + Amount */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{sponsor.name}</h3>

        <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
          {sponsor.currencySymbol}
          {sponsor.amount}
        </div>
      </div>

      {/* Social icons in ONE LINE */}
      <div className="mt-3 flex items-center gap-4">
        {sponsor.github && (
          <Link
            href={sponsor.github}
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
        )}

        {sponsor.xUrl && (
          <Link
            href={sponsor.xUrl}
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <TwitterXIcon className="h-4 w-4" />
          </Link>
        )}

        {sponsor.website && (
          <Link
            href={sponsor.website}
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <WorldIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};
