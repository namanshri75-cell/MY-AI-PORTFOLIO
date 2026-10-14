import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-2.5 py-0.5 text-xs font-semibold tracking-wider font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-amber-400/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20",
        secondary:
          "border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800",
        destructive:
          "border-red-500/30 bg-red-950/40 text-red-300 hover:bg-red-900/50",
        outline: "text-neutral-100 border-neutral-700",
        gold: "border-amber-400 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
