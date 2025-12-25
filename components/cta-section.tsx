"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import { motion } from "motion/react";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center py-20 text-center md:py-32"
    >
      <div className="max-w-3xl space-y-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to add motion to your app?
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
          Browse our collection of animated icons and start building beautiful,
          interactive interfaces today.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/icons">
            <PrimaryButton>
              Browse Icons
              <ArrowRight className="ml-2 h-4 w-4" />
            </PrimaryButton>
          </Link>
          <Link
            href="https://github.com/mannupaaji/animated-svgs"
            target="_blank"
          >
            <SecondaryButton>Star on GitHub</SecondaryButton>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
