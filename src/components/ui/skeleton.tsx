import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-label="Loading content..."
      className={cn(
        "skeleton-shimmer rounded-md bg-slate-200/90 dark:bg-slate-800/90",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
