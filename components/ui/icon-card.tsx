"use client";

import React from "react";
import Link from "next/link";
import type { AnimatedIconProps, AnimatedIconHandle } from "@/icons/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PlayerIcon from "@/icons/player-icon";

const IconCard = ({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ForwardRefExoticComponent<
    AnimatedIconProps & React.RefAttributes<AnimatedIconHandle>
  >;
}) => {
  const iconRef = React.useRef<AnimatedIconHandle>(null);

  const playAnimation = () => {
    iconRef.current?.startAnimation();

    // optional auto-stop so it doesn't loop forever
    setTimeout(() => {
      iconRef.current?.stopAnimation();
    }, 1500);
  };

  return (
    <div className="bg-background relative flex min-w-[140px] flex-1 flex-col items-center justify-center gap-4 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md sm:w-48 sm:flex-none">
      <div className="absolute top-2 right-2 hidden sm:hidden [@media(hover:none)]:block">
        <button
          onClick={(e) => {
            e.preventDefault();
            playAnimation();
          }}
          className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-2 transition-colors"
        >
          <PlayerIcon size={16} />
        </button>
      </div>
      {/* Icon Preview */}
      <Link
        href={`/icons/${name}`}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 p-2"
      >
        <Tooltip>
          <TooltipTrigger>
            <Icon ref={iconRef} size={56} />
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </Link>

    </div>
  );
};

export default IconCard;
