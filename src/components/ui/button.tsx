import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "primary" && "bg-[hsl(var(--primary))] text-white hover:bg-blue-700 focus:ring-blue-500",
          variant === "secondary" && "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-gray-200",
          variant === "ghost" && "hover:bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
          size === "sm" && "h-8 px-3 text-sm",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-12 px-6 text-base",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
