"use client";
import { CodeBlock } from "@/components/ui/code-block";
import IconList from "@/components/icons-list";
import Link from "next/link";
import { motion } from "motion/react";
import { LINKS } from "@/constants";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        className="from-primary/20 to-primary/5 pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-linear-to-br blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="from-primary/15 pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-linear-to-tl to-transparent blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative w-full py-20 md:py-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 sm:mx-20 sm:px-0">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex w-full flex-col items-start text-left">
              <motion.h1
                className="mb-6 text-3xl font-bold tracking-tight lowercase sm:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                Static Icons{" "}
                <span className="from-primary via-primary/80 to-primary/60 bg-linear-to-r bg-clip-text text-transparent">
                  feel dead now
                </span>
              </motion.h1>

              <motion.p
                className="text-muted-foreground mb-4 max-w-xl text-lg leading-relaxed lowercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                A collection of smooth, high-quality animated icons for your
                next project. Copy and paste directly into your app.
              </motion.p>

              <motion.span
                className="text-muted-foreground mb-6 text-sm lowercase"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
              >
                works seamlessly with{" "}
                <Link
                  href="https://ui.shadcn.com/"
                  target="_blank"
                  className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200"
                >
                  <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent">
                    shadcn
                  </span>
                </Link>
                via cli
              </motion.span>

              <motion.div
                className="flex items-center gap-3 lowercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <span className="text-muted-foreground text-sm">
                  Crafted with care and
                </span>

                <Link
                  href="https://motion.dev/"
                  target="_blank"
                  className="group bg-primary/10 hover:bg-primary/20 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200"
                >
                  <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent">
                    motion
                  </span>
                  <svg
                    className="text-primary h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="flex w-full justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-xl">
                <div className="from-primary/20 via-primary/10 absolute inset-0 -z-10 translate-y-4 scale-95 rounded-2xl bg-linear-to-br to-transparent opacity-50 blur-2xl" />
                <CodeBlock
                  command={`${LINKS.SITE_URL}/r/plug-connected-icon.json`}
                  className="shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default function IconsPageContent() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <HeroSection />
      <IconList />
    </div>
  );
}
