"use client";

import { motion } from "motion/react";
import Link from "next/link";
import SecondaryButton from "./ui/secondary-button";
import { useState, useEffect } from "react";
import Image from "next/image";
import PenIcon from "./ui/pen-icon";
import { LINKS } from "@/constants";

interface SponsorProps {
  name: string;
  badge?: string;
  badgeColor?: "default" | "success";
  description: string;
  logo?: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
  placeholderText?: string;
  editable?: boolean;
}

const SponsorCard = ({ sponsor }: { sponsor: SponsorProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(sponsor.name);
  const [description, setDescription] = useState(sponsor.description);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group border-border bg-card relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border sm:flex-row ${
        isEditing ? "ring-primary/50 ring-2" : ""
      }`}
    >
      {/* glow effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent" />
      </div>

      {sponsor.editable && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-background/50 border-border/50 text-muted-foreground hover:text-foreground hover:bg-background absolute top-4 right-4 z-20 flex items-center justify-center rounded-full border p-2 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
          title="Edit this card"
        >
          <PenIcon size={16} className="h-4 w-4" />
        </button>
      )}

      {/* Left side / Image area */}
      <div className="border-border/50 relative flex min-h-[200px] flex-1 items-center justify-center border-b bg-black/20 p-8 sm:border-r sm:border-b-0">
        {isEditing ? (
          <label className="border-primary/50 bg-primary/5 text-primary/80 hover:border-primary hover:bg-primary/10 relative z-10 flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed text-sm transition-colors sm:h-64">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {logoPreview ? (
              <>
                <Image
                  src={logoPreview}
                  alt="Logo preview"
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                  <span className="font-medium text-white">Change Image</span>
                </div>
              </>
            ) : (
              <span>Upload Logo</span>
            )}
          </label>
        ) : logoPreview ? (
          <div className="relative z-10 h-48 w-full sm:h-64">
            <Image
              src={logoPreview}
              alt={`${name} logo`}
              fill
              className="object-contain p-4"
            />
          </div>
        ) : sponsor.logo ? (
          <div className="text-foreground z-10">{sponsor.logo}</div>
        ) : (
          <div className="border-border/60 text-muted-foreground/60 group-hover:border-border group-hover:text-muted-foreground/80 z-10 flex h-48 w-full items-center justify-center rounded-lg border border-dashed text-sm transition-colors sm:h-64">
            {sponsor.placeholderText || "Your Image Here"}
          </div>
        )}
      </div>

      {/* Right side / Content area */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-center p-8 sm:p-10">
        <div className="mb-4 flex items-center gap-3">
          {isEditing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-primary/50 focus:border-primary placeholder:text-muted-foreground/50 max-w-full border-b bg-transparent py-1 text-2xl font-semibold tracking-tight outline-none"
              placeholder="Company Name"
              autoFocus
            />
          ) : (
            <h3 className="text-2xl font-semibold tracking-tight">
              {name || "Company Name"}
            </h3>
          )}

          {sponsor.badge && (
            <span
              className={`rounded-md border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
                sponsor.badgeColor === "success"
                  ? "border-green-500/20 bg-green-500/10 text-green-500"
                  : "bg-muted text-muted-foreground border-border/50"
              }`}
            >
              {sponsor.badge}
            </span>
          )}
        </div>

        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-muted-foreground border-primary/50 focus:border-primary placeholder:text-muted-foreground/50 mb-8 h-32 w-full resize-none rounded-md border bg-transparent p-3 text-[15px] leading-relaxed outline-none"
            placeholder="Write a short description about how your company supports developers or open source..."
          />
        ) : (
          <p className="text-muted-foreground mb-8 line-clamp-4 max-w-md text-[15px] leading-relaxed">
            {description ||
              "Add a description of your company and how you support the community."}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          {sponsor.action && (
            <div className={isEditing ? "pointer-events-none opacity-50" : ""}>
              <Link
                href={sponsor.action.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SecondaryButton className="text-sm">
                  {sponsor.action.label}
                </SecondaryButton>
              </Link>
            </div>
          )}

          {isEditing && (
            <SecondaryButton
              className="border-primary/50 text-primary hover:bg-primary/10 ml-auto text-sm"
              onClick={() => setIsEditing(false)}
            >
              Done Editing
            </SecondaryButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function BackedBy() {
  const sponsors: SponsorProps[] = [
    {
      name: "Vercel",
      badge: "Open Source Program",
      badgeColor: "default",
      description:
        "Providing the robust infrastructure that keeps Its Hover fast, reliable, and accessible to creators worldwide. Vercel enables seamless deployment with zero configuration.",
      logo: (
        <svg
          fill="currentColor"
          viewBox="0 0 512 512"
          width="64"
          height="64"
          className="text-white"
        >
          <path d="M256 48l240 416H16z" />
        </svg>
      ),
    },
    {
      name: "Your Company Here",
      description:
        "Join us in building the future of interactive icons. Sponsor Its Hover to get your brand featured here, reaching thousands of developers and designers.",
      placeholderText: "Your Logo Here",
      editable: true,
      action: {
        label: "Contact Us",
        href: LINKS.CREATOR,
      },
    },
  ];

  return (
    <section className="border-border/40 mx-auto max-w-6xl border-t px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center space-y-4 text-center"
      >
        <h2 className="font-serif text-3xl md:text-4xl">
          Backed By
        </h2>
        <p className="text-muted-foreground max-w-2xl px-4">
          Its Hover is supported by incredible tools and companies.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <SponsorCard sponsor={sponsors[0]} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SponsorCard sponsor={sponsors[1]} />
        </motion.div>
      </div>
    </section>
  );
}
