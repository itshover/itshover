"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import GithubBadge from "./github-badge";
import { motion } from "motion/react";
const Hero = () => {
  const textAnimation = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.3,
    },
  };
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center md:py-32">
      <div className="mb-6">
        <GithubBadge />
      </div>
      <div className="max-w-3xl space-y-4">
        <motion.h1
          variants={textAnimation}
          initial="initial"
          animate="animate"
          transition={textAnimation.transition}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Icons that move with <span className="text-primary">intent</span>
        </motion.h1>
        <motion.p
          variants={textAnimation}
          initial="initial"
          animate="animate"
          transition={textAnimation.transition}
          className="text-muted-foreground mx-auto max-w-xl text-lg sm:text-xl"
        >
          Editable React components with motion baked in. Works seamlessly with
          Next.js, shadcn, and modern design systems.
        </motion.p>
      </div>
      <motion.div
        variants={textAnimation}
        initial="initial"
        animate="animate"
        transition={textAnimation.transition}
        className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link href="/icons">
          <PrimaryButton className="cursor-pointer">
            Browse Icons
            <ArrowRight className="ml-2 h-4 w-4" />
          </PrimaryButton>
        </Link>
        <Link
          href="https://github.com/mannupaaji/animated-svgs"
          target="_blank"
        >
          <SecondaryButton className="cursor-pointer">Sponsor</SecondaryButton>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
