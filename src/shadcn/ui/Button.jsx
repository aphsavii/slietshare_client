import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primaryBlue text-white shadow hover:bg-primaryBlue/90",
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-white text-primaryBlue shadow hover:bg-white/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-1",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        responsive: "h-8 px-2  py-1 md:py-2 md:h-10 md:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Spinner component
const Spinner = ({variant,size}) => (
  <svg
    className={`animate-spin h-5 w-5  inline ${size!=="icon"?'mr-4':'mr-0'} ${variant === "primary" ? "text-white" : "text-primaryBlue"}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-50"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-25"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Button component with loading prop
const Button = React.forwardRef(({ className, loading = false, variant, size, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
      disabled={loading}
    >
      {loading && <Spinner variant={variant} size={size} />}
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
