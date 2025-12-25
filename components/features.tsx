"use client";

import { BentoItem } from "@/components/ui/bento-item";
import {
  Github,
  Users,
  Sparkles,
  GitBranch,
  GitCommit,
  MessageCircle,
  Heart,
  Zap,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";

const Features = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10 text-3xl font-medium"
      >
        Features
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="md:col-span-4"
        >
          <BentoItem
            icon={<Github className="h-5 w-5" />}
            title="Open source"
            description="Fully open, editable, and community owned."
            variant="small"
            backgroundIcon={[
              {
                icon: <Github className="h-32 w-32" />,
                className: "text-muted-foreground/20 absolute -right-8 -top-8",
              },
              {
                icon: <GitBranch className="h-24 w-24" />,
                className:
                  "text-muted-foreground/20 absolute -bottom-8 -left-4",
              },
              {
                icon: <GitCommit className="h-20 w-20" />,
                className: "text-muted-foreground/20 absolute bottom-4 right-4",
              },
            ]}
            glow={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:col-span-8"
        >
          <BentoItem
            icon={<Users className="h-5 w-5" />}
            title="Community driven"
            description="Built in public with real developer feedback."
            variant="small"
            backgroundIcon={[
              {
                icon: <Users className="h-40 w-40" />,
                className:
                  "text-muted-foreground/20 absolute -right-10 -top-10",
              },
              {
                icon: <MessageCircle className="h-24 w-24" />,
                className:
                  "text-muted-foreground/20 absolute -bottom-6 left-10",
              },
              {
                icon: <Heart className="h-20 w-20" />,
                className:
                  "text-muted-foreground/20 absolute bottom-8 right-20",
              },
            ]}
            glow={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="md:col-span-8"
        >
          <BentoItem
            icon={<Sparkles className="h-5 w-5" />}
            title="Feel the SVG"
            description="Motion-first icons with intent, not decoration."
            variant="large"
            backgroundIcon={[
              {
                icon: <Sparkles className="h-48 w-48" />,
                className:
                  "text-muted-foreground/20 absolute -right-12 -top-12",
              },
              {
                icon: <Zap className="h-32 w-32" />,
                className:
                  "text-muted-foreground/20 absolute -bottom-10 -left-10",
              },
              {
                icon: <Activity className="h-24 w-24" />,
                className:
                  "text-muted-foreground/20 absolute bottom-10 right-10",
              },
            ]}
            glow={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="md:col-span-4"
        >
          <BentoItem
            title="More to come"
            variant="medium"
            description="We are constantly adding new icons and features."
            backgroundIcon={[
              {
                icon: <Sparkles className="h-32 w-32" />,
                className:
                  "text-muted-foreground/20 absolute -right-8 -bottom-8",
              },
            ]}
            glow={true}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
