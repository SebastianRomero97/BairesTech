import React from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  minWidth?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  type = "button",
  minWidth,
}: ButtonProps) {
  const sizes: Record<Size, string> = {
    sm: "h-10 px-4 text-sm min-w-[11rem]",
    md: "h-12 px-6 text-base min-w-[12rem]",
    lg: "h-14 px-7 text-lg min-w-[14rem]",
  };

  
  const baseStyles =
    "rounded-lg font-medium shadow transition inline-flex items-center justify-center gap-2 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[--btn-border] " +
    "whitespace-nowrap cursor-pointer";

  const variants: Record<Variant, string> = {
    primary: `
      bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-[var(--btn-border)]
      transition-[box-shadow,background-color,color]
      hover:shadow-[var(--btn-hover-shadow)]
    `,
    secondary: `
      bg-[var(--card-bg)] text-[var(--card-fg)] border border-[var(--card-border)]
      transition-[box-shadow,background-color,color]
      hover:shadow-[var(--card-hover-shadow)]
    `,
    outline: `
      border border-[var(--btn-border)] bg-transparent
      text-[var(--btn-fg)] transition-[box-shadow,background-color,color]
      hover:bg-[color:var(--btn-bg)/0.04] hover:shadow-[var(--btn-hover-shadow)]
    `,
  };

  const customMinWidth = minWidth ? `min-w-[${minWidth}]` : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  const styles = [
    baseStyles,
    sizes[size],
    variants[variant],
    customMinWidth,
    disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="text-lg shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="text-lg shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (disabled) {
      return (
        <span className={styles} aria-disabled="true" role="button">
          {content}
        </span>
      );
    }
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles} disabled={disabled} type={type}>
      {content}
    </button>
  );
}
