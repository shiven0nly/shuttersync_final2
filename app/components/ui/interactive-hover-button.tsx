import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'filled' | 'outline';
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", variant = 'outline', className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full text-center font-semibold transition-all duration-300",
        variant === 'filled' 
          ? "bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground" 
          : "bg-background text-foreground border border-foreground/20 hover:border-foreground",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-block px-8 py-4 transition-all duration-500 ease-out group-hover:translate-x-2">
        {text}
      </span>
      <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 translate-x-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100">
        <ArrowRight className="size-5" />
      </div>
      <div className={cn(
        "absolute left-0 top-0 h-full w-0 transition-all duration-500 ease-out group-hover:w-full",
        variant === 'filled' 
          ? "bg-background" 
          : "bg-foreground"
      )}></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
