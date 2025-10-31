import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ rows = 5, className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(
        "w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-base text-text2 outline-none placeholder:text-muted-foreground focus-visible:border-bright-blue1 focus-visible:ring-primary/50 focus-visible:ring-[1.5px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all h-auto resize-vertical",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
