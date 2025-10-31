import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, error, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground text-text2 placeholder:text-muted-foreground selection:bg-orange selection:text-primary-foreground dark:bg-input/30 border-input flex h-14 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-normal disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md font-medium transform-all duration-200",
        error
          ? "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/50"
          : "border-white/30 focus-visible:border-bright-blue1 focus-visible:ring-primary/50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
