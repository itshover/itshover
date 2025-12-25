import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const SecondaryButton = ({
  children,
  className,
  ...props
}: SecondaryButtonProps) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className={cn("rounded-full px-8", className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
