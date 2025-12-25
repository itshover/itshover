"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState } from "react";

type BentoVariant = "small" | "medium" | "large";

type BentoBackgroundIcon = {
  icon: ReactNode;
  className?: string;
};

interface BentoItemProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  variant?: BentoVariant;
  className?: string;
  backgroundIcon?: BentoBackgroundIcon[];
  glow?: boolean;
}

export const BentoItem = ({
  icon,
  title,
  description,
  variant = "medium",
  className,
  backgroundIcon,
  glow = true,
}: BentoItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={glow ? onMouseMove : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-card relative overflow-hidden rounded-2xl border p-6",
        "flex flex-col justify-end gap-2",
        variantStyles[variant],
        className,
      )}
    >
      {/* Glow layer */}
      {glow && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            background: `radial-gradient(
              180px at ${pos.x}px ${pos.y}px,
              color-mix(in srgb, var(--primary) 25%, transparent),
              transparent 70%
            )`,
          }}
        />
      )}

      {/* Background icons with glow reveal */}
      {glow && backgroundIcon && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage: `radial-gradient(
            300px at ${pos.x}px ${pos.y}px,
            black,
            transparent
          )`,
            WebkitMaskImage: `radial-gradient(
            300px at ${pos.x}px ${pos.y}px,
            black,
            transparent
          )`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease-out",
          }}
        >
          {backgroundIcon.map((item, index) => (
            <div
              key={index}
              className={cn(
                "text-muted-foreground/20 absolute",
                item.className,
              )}
            >
              {item.icon}
            </div>
          ))}
        </div>
      )}

      {/* Foreground content */}
      {icon && (
        <div className="text-muted-foreground relative z-10 mb-2">{icon}</div>
      )}

      <h3 className="relative z-10 text-lg font-medium">{title}</h3>

      {description && (
        <p className="text-muted-foreground relative z-10 text-sm">
          {description}
        </p>
      )}
    </motion.div>
  );
};

const variantStyles: Record<BentoVariant, string> = {
  small: "min-h-[120px]",
  medium: "min-h-[160px]",
  large: "min-h-[220px]",
};
