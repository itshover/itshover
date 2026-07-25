"use client";

import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import { motion } from "motion/react";
import ArrowNarrowRightIcon from "@/icons/arrow-narrow-right-icon";
import GithubIcon from "@/icons/github-icon";
import { LINKS } from "@/constants";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center py-20 text-center md:py-32"
    >
      <div className="max-w-4xl space-y-4">
        <h2 className="text-2xl font-bold tracking-tight font-serif italic sm:text-3xl md:text-4xl">
          Ready to Bring your icons to life?
        </h2>
        <p className="text-muted-foreground text-md mx-auto max-w-xl font-medium sm:text-lg">
          A growing open source library of animated icons built for real
          interfaces.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/icons">
            <PrimaryButton className="lowercase">
              Browse Icons
              <ArrowNarrowRightIcon />
            </PrimaryButton>
          </Link>
          <SecondaryButton
            className="lowercase"
            onClick={() => window.open(LINKS.GITHUB, "_blank")}
          >
            Star on GitHub
            <GithubIcon size={15} />

          </SecondaryButton>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
