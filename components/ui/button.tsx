import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      "disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-primary text-dark hover:bg-primary/90": variant === "default",
        "border border-primary text-primary hover:bg-primary/10": variant === "outline",
        "hover:bg-dark-light": variant === "ghost",
        "h-8 px-3 text-sm": size === "sm",
        "h-10 px-4": size === "md",
        "h-12 px-6 text-lg": size === "lg",
      },
      className
    )

    if (asChild && React.isValidElement(props.children)) {
      return React.cloneElement(props.children as React.ReactElement, {
        className: cn(baseClasses, (props.children as React.ReactElement).props.className),
        ref,
      })
    }

    return (
      <button
        className={baseClasses}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

