import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-amber-400 text-black hover:bg-amber-300 font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)]",
        destructive:
          "bg-red-900 text-red-100 hover:bg-red-800",
        outline:
          "border border-amber-400/30 bg-black/80 hover:bg-amber-400/10 hover:border-amber-400 text-amber-200",
        secondary:
          "bg-neutral-900 text-neutral-100 hover:bg-neutral-800 border border-neutral-800",
        ghost: "hover:bg-amber-400/10 hover:text-amber-300 text-neutral-300",
        link: "text-amber-400 underline-offset-4 hover:underline",
        gold: "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold border border-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:brightness-110",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
