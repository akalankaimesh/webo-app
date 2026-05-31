import type { ReactNode } from "react";

type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}

type GlassPanelProps = {
  className?: string;
  children: ReactNode;
};

export function GlassPanel({ className, children }: GlassPanelProps) {
  return <div className={cn("glass-panel", className)}>{children}</div>;
}

type GlassButtonProps = {
  className?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "tint";
  type?: "button" | "submit" | "reset";
};

export function GlassButton({
  className,
  children,
  variant = "ghost",
  type = "button",
}: GlassButtonProps) {
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-[0_0_24px_rgba(77,142,255,0.35)] hover:brightness-110",
    ghost:
      "bg-white/5 text-on-surface border border-white/15 hover:bg-white/10",
    tint: "bg-primary/15 text-primary border border-primary/40 hover:bg-primary/25",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

type PillProps = {
  children: ReactNode;
  className?: string;
};

export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/20 bg-primary/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-5 space-y-2">
      {eyebrow ? <Pill>{eyebrow}</Pill> : null}
      <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface md:text-4xl">{title}</h2>
      <p className="max-w-2xl text-sm text-on-surface-variant md:text-base">{description}</p>
    </header>
  );
}
