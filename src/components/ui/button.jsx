// src/components/ui/button.jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-blue-500 text-white shadow hover:bg-blue-600",
    outline: "border border-gray-300 bg-white hover:bg-gray-100",
  }
  
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  }
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`
  
  return (
    <Comp
      className={classes}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }