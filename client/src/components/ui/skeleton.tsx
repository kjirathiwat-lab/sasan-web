import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "default" = pulse, "shimmer" = dark brand shimmer effect */
  variant?: "default" | "shimmer"
}

function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md",
        variant === "default" && "animate-pulse bg-muted",
        variant === "shimmer" && "skeleton-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
