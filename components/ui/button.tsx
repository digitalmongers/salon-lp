import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "coral"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon" | "circle";

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-[#E8BF96] text-[#272422] hover:bg-[#f1ceb0] font-bold uppercase tracking-[0.09em]",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border-[0.75px] border-white bg-transparent text-white hover:bg-white/10 font-bold uppercase tracking-[0.09em]",
  secondary:
    "bg-[#272422] text-[#F6D9BB] hover:bg-[#332f2c]",
  coral:
    "bg-[#F07A60] text-white hover:bg-[#f48b74]",
  ghost:
    "bg-transparent text-white hover:bg-white/10",
  link:
    "text-[#E8BF96] underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-[53.25px] min-w-[176.25px] px-7 text-[14.25px] leading-[12px] rounded-[75px]",
  sm: "h-9 px-5 text-xs rounded-full",
  lg: "h-14 px-9 text-[15px] rounded-[75px]",
  icon: "h-[41.25px] w-[41.25px] rounded-full p-0 min-w-0",
  circle: "h-[93px] w-[93px] rounded-full p-0 min-w-0 flex-col",
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8BF96]/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variantStyles[variant],
    sizeStyles[size],
    className
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const classes = buttonVariants({ variant, size, className });

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        ...(props as Record<string, unknown>),
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} data-slot="button" className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

