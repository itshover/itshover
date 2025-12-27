"use client";
import Link from "next/link";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-t py-6 md:py-0"
    >
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link
              href=""
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Abhijit
            </Link>
            . The source code is available on{" "}
            <Link
              href=""
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
