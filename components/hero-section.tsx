"use client";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import GithubBadge from "./github-badge";
import { motion } from "motion/react";
import GithubIcon from "@/icons/github-icon";
import Stack3Icon from "@/icons/stack-3-icon";
import FloatingIcon from "./ui/floating-icon";
import TerminalIcon from "@/icons/terminal-icon";
import CurrencyRupeeIcon from "@/icons/currency-rupee-icon";
import LikeIcon from "@/icons/like-icon";
import SendIcon from "@/icons/send-icon";
import GhostIcon from "@/icons/ghost-icon";
import ArrowNarrowRightIcon from "@/icons/arrow-narrow-right-icon";
import { useTheme } from "next-themes";
import Image from "next/image";

const Hero = () => {
  const { theme } = useTheme();
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
      <div>
        <div className="pointer-events-none hidden md:block lg:pointer-events-auto">
          <FloatingIcon className="text-accent-foreground/40 top-16 left-10 rotate-[-20deg]">
            <GithubIcon className="h-28 w-28 md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-44 xl:w-44" />
          </FloatingIcon>

          <FloatingIcon className="text-accent-foreground/30 top-60 left-36 rotate-15">
            <LikeIcon className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-52 xl:w-52" />
          </FloatingIcon>
          <FloatingIcon className="text-accent-foreground/40 top-20 right-20 rotate-25">
            <Stack3Icon className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36" />
          </FloatingIcon>

          <FloatingIcon className="text-accent-foreground/30 right-36 bottom-60 rotate-[-15deg]">
            <SendIcon className="h-28 w-28 md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-44 xl:w-44" />
          </FloatingIcon>

          <FloatingIcon className="text-accent-foreground/25 bottom-28 left-24 rotate-10">
            <CurrencyRupeeIcon className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20" />
          </FloatingIcon>

          <FloatingIcon className="text-accent-foreground/25 right-24 bottom-24 rotate-[-10deg]">
            <TerminalIcon className="h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24" />
          </FloatingIcon>
          <FloatingIcon className="text-accent-foreground/25 right-120 bottom-40 rotate-[-10deg]">
            <GhostIcon className="h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-40 xl:w-24" />
          </FloatingIcon>
        </div>
      </div>
      <div className="mb-6 flex flex-col items-center gap-3">
        <GithubBadge />
        <a
          href="https://www.producthunt.com/products/its-hover?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-its-hover"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Image
            width={200}
            height={200}
            alt="Its Hover - Icons that move and react mirroring user intent | Product Hunt"
            className="h-auto w-[200px] sm:w-[220px]"
            src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1056670&theme=${theme === "dark" ? "dark" : "light"}`}
          />
        </a>
      </div>
      <div className="max-w-3xl space-y-4">
        <motion.h1
          variants={textAnimation}
          initial="initial"
          animate="animate"
          transition={textAnimation.transition}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          icons that move with <span className="text-primary">intent</span>
        </motion.h1>
        <motion.p
          variants={textAnimation}
          initial="initial"
          animate="animate"
          transition={textAnimation.transition}
          className="text-muted-foreground mx-auto max-w-xl text-lg lowercase sm:text-xl"
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
          <PrimaryButton className="cursor-pointer lowercase">
            Browse Icons
            <ArrowNarrowRightIcon className="ml-2 h-4 w-4" />
          </PrimaryButton>
        </Link>
        <Link href="/sponsor">
          <SecondaryButton className="cursor-pointer lowercase">
            Sponsor
          </SecondaryButton>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
